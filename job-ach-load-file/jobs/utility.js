var PATH_FILE = "D:\\JobScheduler\\data\\received\\"; // Ruta donde se encuentran los archivos a procesar
var LIST_RESULT_FILENAMES = "ftp_result_filenames"; // LIsta de archivos a procesar
var LOAD_FILE_RECEIVED = "LOAD_FILE_RECEIVED"; // Tipo de servicio de carga - 008 / 003
var LOAD_ISO_FILES = "LOAD_ISO_FILES"; // Tipo de servicio de carga - resto de archivos

/*
 * getTypeFile: Extrae el tipo de archivo a procesar, segun el valor del tag Document del xml.
 *
 * @ return Tipo del archivo
 *
 * @author con_wlopera
 */
function getTypeFile(filename) {
  var xmlDOM = new Packages.sos.xml.SOSXMLXPath(PATH_FILE + filename);
  var xmlNode = xmlDOM.selectNodeList("//Document");

  var parameterXmlns = xmlNode.item(0).getAttribute("xmlns");

  print("Document  (" + filename + ")", parameterXmlns);

  if (parameterXmlns.indexOf("008") !== -1 || parameterXmlns.indexOf("003") !== -1) {
    return LOAD_FILE_RECEIVED;
  } else {
    return LOAD_ISO_FILES;
  }
}

/*
 * getParameter: Consulta de lista de parametros del job.
 *
 * @ return Lista de parametros
 *
 * @author con_wlopera
 */
function getParameter() {
  var params = spooler_task.params;
  var taskParams = spooler_task.order.params;
  if (taskParams != null) {
    params.merge(taskParams);
  }

  var order = spooler_task.order;

  if (order != null) {
    params.merge(order.params);
  }
  return params;
}

function printInit() {
  spooler_log.info("*******************************************************************************");
  spooler_log.info("*                     ACH-ISO - COPIA Y CARGA DE ARCHIVOS                     *");
  spooler_log.info("*                        ---- @comercebank  2020 ----                         *");
  spooler_log.info("*                                 ver: 1.0                                    *");
  spooler_log.info("*******************************************************************************");
  print("Fecha", new Date());
}

function print(key, value) {
  spooler_log.info("[ACH-ISO] " + key + " = " + value);
}
