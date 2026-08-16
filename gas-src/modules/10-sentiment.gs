/**
 * GAS RPC CONTROLLER: Sentiment Analytics & Data Operations
 * Reads dynamically from Google Sheets database without hardcoded values.
 */

function getSentimentData(params) {
  try {
    const records = getSheetDataAsObjects();
    return jsonResponse(records);
  } catch (err) {
    return errorResponse(err);
  }
}

function getSentimentAnalytics() {
  try {
    const records = getSheetDataAsObjects();
    const n = records.length;
    if (n === 0) {
      return jsonResponse({ metrics: null });
    }

    let sumItb = 0, sumItk = 0, sumGap = 0;
    let itkHigher = 0, itbHigher = 0;
    let counts = { "Broad Optimism": 0, "Business-led": 0, "Consumer-led": 0, "Broad Pessimism": 0 };

    const itbVals = [];
    const itkVals = [];

    let minGapRecord = records[0];
    let maxGapRecord = records[0];

    records.forEach(r => {
      sumItb += r.ITB;
      sumItk += r.ITK;
      sumGap += r.Gap_ITB_ITK;

      itbVals.push(r.ITB);
      itkVals.push(r.ITK);

      if (r.ITK > r.ITB) itkHigher++;
      if (r.ITB > r.ITK) itbHigher++;

      if (counts[r.Quadrant] !== undefined) {
        counts[r.Quadrant]++;
      }

      if (r.Gap_ITB_ITK < minGapRecord.Gap_ITB_ITK) minGapRecord = r;
      if (r.Gap_ITB_ITK > maxGapRecord.Gap_ITB_ITK) maxGapRecord = r;
    });

    const meanItb = sumItb / n;
    const meanItk = sumItk / n;
    const meanGap = sumGap / n;

    // Standard deviation
    const varianceItb = itbVals.reduce((acc, val) => acc + Math.pow(val - meanItb, 2), 0) / (n - 1 || 1);
    const varianceItk = itkVals.reduce((acc, val) => acc + Math.pow(val - meanItk, 2), 0) / (n - 1 || 1);
    const stdItb = Math.sqrt(varianceItb);
    const stdItk = Math.sqrt(varianceItk);

    // Pearson Correlation Coefficient (r)
    let cov = 0;
    for (let i = 0; i < n; i++) {
      cov += (itbVals[i] - meanItb) * (itkVals[i] - meanItk);
    }
    const corr = (stdItb > 0 && stdItk > 0) ? (cov / ((n - 1) * stdItb * stdItk)) : 0;

    // Median
    const sortedItb = [...itbVals].sort((a, b) => a - b);
    const sortedItk = [...itkVals].sort((a, b) => a - b);
    const mid = Math.floor(n / 2);
    const medianItb = n % 2 !== 0 ? sortedItb[mid] : (sortedItb[mid - 1] + sortedItb[mid]) / 2;
    const medianItk = n % 2 !== 0 ? sortedItk[mid] : (sortedItk[mid - 1] + sortedItk[mid]) / 2;

    const metrics = {
      totalRecords: n,
      meanITB: Number(meanItb.toFixed(2)),
      meanITK: Number(meanItk.toFixed(2)),
      medianITB: Number(medianItb.toFixed(2)),
      medianITK: Number(medianItk.toFixed(2)),
      stdITB: Number(stdItb.toFixed(2)),
      stdITK: Number(stdItk.toFixed(2)),
      correlation: Number(corr.toFixed(3)),
      meanGap: Number(meanGap.toFixed(2)),
      itkHigherCount: itkHigher,
      itbHigherCount: itbHigher,
      quadrantCounts: counts,
      minGapRecord: minGapRecord,
      maxGapRecord: maxGapRecord
    };

    return {
      status: "ok",
      metrics: metrics,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    return errorResponse(err);
  }
}

function updateSentimentRecord(recordId, updatedFields) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = getMasterSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return errorResponse("Sheet is empty");

    const headers = data[0].map(h => String(h).trim());
    const periodeColIdx = headers.indexOf("Periode");
    const tahunColIdx = headers.indexOf("Tahun");
    const kuartalNumColIdx = headers.indexOf("Kuartal_Num");

    let targetRowIndex = -1;

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const p = String(row[periodeColIdx]);
      const key = `${row[tahunColIdx]}_Q${row[kuartalNumColIdx]}`;
      if (p === recordId || key === recordId || String(i + 1) === String(recordId)) {
        targetRowIndex = i + 1; // 1-based index
        break;
      }
    }

    if (targetRowIndex === -1) {
      return errorResponse("Record not found: " + recordId);
    }

    headers.forEach((header, colIdx) => {
      if (updatedFields[header] !== undefined) {
        sheet.getRange(targetRowIndex, colIdx + 1).setValue(updatedFields[header]);
      }
    });

    // Re-calculate derived fields (Gap & Quadrant)
    const rowVals = sheet.getRange(targetRowIndex, 1, 1, headers.length).getValues()[0];
    const itbColIdx = headers.indexOf("ITB");
    const itkColIdx = headers.indexOf("ITK");
    const gapColIdx = headers.indexOf("Gap_ITB_ITK");
    const quadColIdx = headers.indexOf("Quadrant");

    if (itbColIdx !== -1 && itkColIdx !== -1) {
      const itb = parseFloat(rowVals[itbColIdx]) || 0;
      const itk = parseFloat(rowVals[itkColIdx]) || 0;
      const gap = Number((itb - itk).toFixed(2));
      
      let quad = "Broad Pessimism";
      if (itb >= 100 && itk >= 100) quad = "Broad Optimism";
      else if (itb >= 100 && itk < 100) quad = "Business-led";
      else if (itb < 100 && itk >= 100) quad = "Consumer-led";

      if (gapColIdx !== -1) sheet.getRange(targetRowIndex, gapColIdx + 1).setValue(gap);
      if (quadColIdx !== -1) sheet.getRange(targetRowIndex, quadColIdx + 1).setValue(quad);
    }

    SpreadsheetApp.flush();
    return jsonResponse(true, "ok", "Record updated successfully");
  } catch (err) {
    return errorResponse(err);
  } finally {
    lock.releaseLock();
  }
}
