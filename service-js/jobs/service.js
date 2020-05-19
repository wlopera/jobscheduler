var ENDPOINT_BASE = "192.168.251.30";
var PORT = 9080;
var OAUTH2_ENDPOINT = "/uaa/oauth/token?grant_type=client_credentials&scope=APISecured";
var AUTHORIZATION = "Basic aW5ub3ZhY2lvbjozODk0ZTk0YTdiYmI0M2MyYWFkYmQ2Y2VjNWI0NTI4Yg==";
var ENDPOINT_BIC_CODE = "/ach-iso-api/api/v1/core/query-bic-iso";
var ENDPOINT_LOAD_FILE_RECEIVED = "/ach-iso-api/api/v1/core/load-file-received/";
var ENDPOINT_LOAD_ISO_FILES = "/ach-iso-api/api/v1/core/load-iso-files/";

function getOauthToken(serviceUrl) {
  // set headers
  com.sos.jitl.restclient.JobSchedulerRestClient.headers.put("Content-Type", "application/json");
  com.sos.jitl.restclient.JobSchedulerRestClient.headers.put("Authorization", AUTHORIZATION);

  var response = com.sos.jitl.restclient.JobSchedulerRestClient.postRestService(
    ENDPOINT_BASE,
    PORT,
    serviceUrl,
    "http",
    ""
  );

  if (response) {
    eval("var jsonObject = " + response + ";");
    return jsonObject.token_type + " " + jsonObject.access_token;
  } else {
    return "No hay espuesta del servicio ";
  }
}

/**
 * processBicCode: Consulta codigos bic de las instituciones financieras.
 *
 * @author con_wlopera
 */
function processBicCode() {
  var token = getOauthToken(OAUTH2_ENDPOINT);
  spooler_log.info("TOKEN: " + token);
  spooler_log.info("BIT CODE: " + getBitCode(ENDPOINT_BIC_CODE, token));
  return true;
}

/**
 * processLoadFileReceived: Carga archivo ISO recibido como parametro.
 *   - 008: Creditos
 *   - 003 Debitos
 *
 * @param filename Nombre del archivo a cargar
 *
 * @author con_wlopera
 */
function processLoadFileReceived(filename) {
  var token = getOauthToken(OAUTH2_ENDPOINT);
  spooler_log.info("TOKEN: " + token);
  spooler_log.info("BIT LOAD-FILED-RECEIVED: " + loadFileReceived(token, filename));
  return true;
}

/**
 * processLoadIsoFiles: Carga archivo ISO recibido como parametro.
 *   - 008: Creditos
 *   - 003 Debitos
 *
 * @param filename Nombre del archivo a cargar
 *
 * @author con_wlopera
 */
function processLoadIsoFiles(filename) {
  var token = getOauthToken(OAUTH2_ENDPOINT);
  spooler_log.info("TOKEN: " + token);
  spooler_log.info("BIT LOAD-ISO-FILES: " + loadIsoFile(token, filename));
  return true;
}

/**
 * getBitCode: Consulta codigos bic de las instituciones financieras.
 *
 * @param accessToken Token de servicios
 * @param serviceUrl Endpoint de consulta
 *
 * @return Lista de codigos bic
 *
 * @author con_wlopera
 */
function getBitCode(serviceUrl, accessToken) {
  // agregar headers
  com.sos.jitl.restclient.JobSchedulerRestClient.headers.put("Authorization", accessToken);

  // agregar body
  var body = getBodyBicCode(1, 1, "JSON", "CCBP", "192.168.0.2", 4);

  spooler_log.info("##=> body: " + body);

  var response = com.sos.jitl.restclient.JobSchedulerRestClient.postRestService(
    ENDPOINT_BASE,
    PORT,
    serviceUrl,
    "http",
    body
  );

  if (response) {
    spooler_log.info("##=> response 1: " + response);
    // eval("var jsonObject = " + response + ";");
    // spooler_log.info("##=> response-success: " + jsonObject.success);
    // spooler_log.info("##=> response-mensaje: " + jsonObject.message);
    // spooler_log.info("##=> response-data 1: " + jsonObject.data);

    // for (var property in jsonObject.data) {
    //   if (property === "pttBiccodeAch") {
    //     var data = jsonObject.data[property];
    //     spooler_log.info("--------------------------------------------------------------");
    //     for (i = 0; i < data.length; i++) {
    //       var dato = data[i];
    //       for (var prop in dato) {
    //         spooler_log.info("##=> " + prop + ": " + dato[prop]);
    //       }
    //       spooler_log.info("--------------------------------------------------------------");
    //     }
    //   }
    // }
    // spooler_log.info("##=> response-traceid: " + jsonObject.traceid);

    return response;
  } else {
    return "No hay respuesta del servicio";
  }
}

/**
 * loadFileReceived: Carga archivo ISO recibido como parametro.
 *   - PACS.008: Creditos
 *   - PACS.003 Debitos
 *
 * @param accessToken Token de servicios
 * @param filename Nombre del archivo a cargar
 *
 * @return Resultado de la carga
 *
 * @author con_wlopera
 */
function loadFileReceived(accessToken, filename) {
  // agregar headers
  com.sos.jitl.restclient.JobSchedulerRestClient.headers.put("Authorization", accessToken);

  // agregar body
  var body = getBodyLoadFileReceived(1, 1, filename, "JSON", 1, 54);

  spooler_log.info("##=> body: " + body);
  spooler_log.info("##=> filename: " + filename);
  spooler_log.info("##=> accessToken: " + accessToken);

  var response = "OK";
  //  var response = com.sos.jitl.restclient.JobSchedulerRestClient.postRestService(
  //    ENDPOINT_BASE,
  //    PORT,
  //    ENDPOINT_LOAD_FILE_RECEIVED,
  //    "http",
  //    body
  //  );

  return response;
}

/**
 * loadIsoFile: Cargar todos los archivos ISO que se reciban de Telered, por ejemplo ISO de confirmacion PACS.002, tiene como parametros el nombre del archivo
 *              y un prefijo que indica que tipo de archivo ISO es el que se quiere cargar. Por ejemplo PACS.002, PACS.004, CAMT.029, ACMT.022, CAMT.056,
 *              PACS.007, ACMT.023 esto nos servira para buscar el directorio del archivo correspondiente en la tabla de parametros y toda la logica inmersa
 *              en cada tipo de archivo ISO, viene a tener la forma de un paquete orquestador que hara todo el proceso de carga y proceso
 *
 * @param accessToken Token de servicios
 * @param filename Nombre del archivo a cargar
 *
 * @return Resultado de la carga
 *
 * @author con_wlopera
 */

function loadIsoFile(accessToken, filename) {
  // agregar headers
  com.sos.jitl.restclient.JobSchedulerRestClient.headers.put("Authorization", accessToken);

  // agregar body

  // fecha actual
  var today = new Date();
  var month = today.getMonth() + 1;
  if (month < 10) month = "0" + month;
  var processdate = today.getFullYear() + "-" + month + "-" + today.getDate();

  // Body
  var body = getBodyLoadIsoFiles(1, 1, 1, filename, null, "JSON", "N5", "192.168.0.2", processdate, 54);

  spooler_log.info("##=> body: " + body);
  spooler_log.info("##=> filename: " + filename);
  spooler_log.info("##=> accessToken: " + accessToken);

  var response = "OK";
  //  var response = com.sos.jitl.restclient.JobSchedulerRestClient.postRestService(
  //    ENDPOINT_BASE,
  //    PORT,
  //    ENDPOINT_LOAD_ISO_FILES,
  //    "http",
  //    body
  //  );

  return response;
}
