/**
 * WEB APP ENTRYPOINT (doGet)
 * Serves the compiled single-page application (webapp.html)
 */
function doGet(e) {
  try {
    return HtmlService.createHtmlOutputFromFile('webapp')
      .setTitle('Indonesian Economic Sentiment Dynamics (ITB & ITK) Dashboard')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  } catch (err) {
    return HtmlService.createHtmlOutput(
      '<div style="font-family:sans-serif;padding:24px;"><h2>Application Starting</h2><p>Please run initial build process using build:gas before accessing web application.</p></div>'
    );
  }
}
