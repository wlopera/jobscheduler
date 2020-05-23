var ENDPOINT_BASE = "192.168.251.30";
var PORT = 9080;
var OAUTH2_ENDPOINT = "/uaa/oauth/token?grant_type=client_credentials&scope=APISecured";
var AUTHORIZATION = "Basic aW5ub3ZhY2lvbjozODk0ZTk0YTdiYmI0M2MyYWFkYmQ2Y2VjNWI0NTI4Yg==";
var ENDPOINT_LOAD_FILE_RECEIVED = "/ach-iso-api/api/v1/core/load-file-received/";
var ENDPOINT_LOAD_ISO_FILES = "/ach-iso-api/api/v1/core/load-iso-files/";
var PROTOCOL_HTTP = "http";

/**
 * getOauthToken Consulta el token de acceso a los servicios Open Legacy
 *
 * @return Token de acceso
 *
 * @author con_wlopera
 */
function getOauthToken() {
  // set headers
  com.sos.jitl.restclient.JobSchedulerRestClient.headers.put("Content-Type", "application/json");
  com.sos.jitl.restclient.JobSchedulerRestClient.headers.put("Authorization", AUTHORIZATION);

  var response = invokeService(ENDPOINT_BASE, PORT, OAUTH2_ENDPOINT, PROTOCOL_HTTP, "");

  if (response) {
    eval("var jsonObject = " + response + ";");
    return jsonObject.token_type + " " + jsonObject.access_token;
  } else {
    return "No hay espuesta del servicio ";
  }
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
  var token = getOauthToken();
  print("Response (" + filename + ")", " LOAD-FILED-RECEIVED => " + loadFileReceived(token, filename));
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
  var token = getOauthToken();
  print("Response (" + filename + ")", " LOAD-ISO-FILES => " + loadIsoFile(token, filename));
  return true;
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

  print("Request  (" + filename + ")", body);

  var response =
    '{"success": true, "message": "Información recuperada exitosamente.","data": {"responseCode": 200,"message": "OK"},"error": null,"traceid": "c03d71e3-d351-492b-9835-1e3fde5d8ddb"}​';

  //return invokeService(ENDPOINT_BASE, PORT, ENDPOINT_LOAD_FILE_RECEIVED, PROTOCOL_HTTP, body);
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

  // fecha actual
  var today = new Date();
  var month = today.getMonth() + 1;
  if (month < 10) month = "0" + month;
  var processdate = today.getFullYear() + "-" + month + "-" + today.getDate();

  // Body
  var body = getBodyLoadIsoFiles(1, 1, 1, filename, null, "JSON", "N5", "192.168.0.2", processdate, 54);

  print("Request  (" + filename + ")", body);

  var response =
    '{"success": true, "message": "Información recuperada exitosamente.","data": {"responseCode": 200,"message": "OK"},"error": null,"traceid": "c03d71e3-d351-492b-9835-1e3fde5d8ddb"}​';

  //return invokeService(ENDPOINT_BASE, PORT, ENDPOINT_LOAD_ISO_FILES, PROTOCOL_HTTP, body);
}

/**
 * invokeService Llamada al srvicio de OL.
 *
 * @param host Identificador o equipo que contiene el recurso
 * @param port Puerto
 * @param path Enpoint del servicio
 * @param protocol  Protocolo de comunicacion
 * @param body Peticion
 *
 * @returns Respuesta del servicio
 *
 * @author con_wlopera
 */
function invokeService(host, port, path, protocol, body) {
  var response = com.sos.jitl.restclient.JobSchedulerRestClient.postRestService(host, port, path, protocol, body);

  return response;
}
