/**
 * GAS UTILITY FUNCTIONS & RPC RESPONSE FORMATTERS
 */

function jsonResponse(data, status = "ok", message = "") {
  return {
    status: status,
    message: message,
    timestamp: new Date().toISOString(),
    data: data
  };
}

function errorResponse(error) {
  const msg = typeof error === 'string' ? error : (error.message || 'Unknown Server Error');
  return {
    status: "error",
    message: msg,
    timestamp: new Date().toISOString()
  };
}

function getMasterSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const SHEET_NAME = "Master_Data";
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    const sheets = ss.getSheets();
    if (sheets.length > 0) {
      sheet = sheets[0];
    } else {
      throw new Error("No data sheet found in spreadsheet");
    }
  }
  return sheet;
}

function getSheetDataAsObjects() {
  const sheet = getMasterSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  const headers = data[0].map(h => String(h).trim());
  const rows = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0] && row[0] !== 0) continue; // skip empty rows

    const obj = { rowIndex: i + 1 };
    headers.forEach((header, colIdx) => {
      obj[header] = row[colIdx];
    });

    // Compute derived properties dynamically if missing
    const itb = parseFloat(obj.ITB) || 0;
    const itk = parseFloat(obj.ITK) || 0;
    
    if (obj.Gap_ITB_ITK === undefined || obj.Gap_ITB_ITK === null || obj.Gap_ITB_ITK === "") {
      obj.Gap_ITB_ITK = Number((itb - itk).toFixed(2));
    } else {
      obj.Gap_ITB_ITK = Number(parseFloat(obj.Gap_ITB_ITK).toFixed(2));
    }

    if (!obj.Quadrant) {
      if (itb >= 100 && itk >= 100) obj.Quadrant = "Broad Optimism";
      else if (itb >= 100 && itk < 100) obj.Quadrant = "Business-led";
      else if (itb < 100 && itk >= 100) obj.Quadrant = "Consumer-led";
      else obj.Quadrant = "Broad Pessimism";
    }

    obj.Tahun = parseInt(obj.Tahun, 10) || 0;
    obj.Kuartal_Num = parseInt(obj.Kuartal_Num, 10) || 0;
    obj.ITB = Number(itb.toFixed(2));
    obj.ITK = Number(itk.toFixed(2));

    rows.push(obj);
  }

  return rows;
}
