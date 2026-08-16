/**
 * INDONESIAN ECONOMIC SENTIMENT DYNAMICS (ITB & ITK)
 * Google Apps Script Setup & Database Sheet Initializer
 */

function setupDatabaseSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const SHEET_NAME = "Master_Data";
  let sheet = ss.getSheetByName(SHEET_NAME);

  const EXPECTED_HEADERS = [
    "Tahun",
    "Kuartal_Num",
    "Kuartal",
    "Periode",
    "ITB",
    "ITK",
    "Gap_ITB_ITK",
    "Quadrant"
  ];

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    sheet.getRange(1, 1, 1, EXPECTED_HEADERS.length).setValues([EXPECTED_HEADERS]);
    sheet.getRange(1, 1, 1, EXPECTED_HEADERS.length).setFontWeight("bold").setBackground("#f1f5f9");
    sheet.setFrozenRows(1);
  }

  return {
    status: "ok",
    message: "Database sheet setup complete",
    sheetName: SHEET_NAME
  };
}
