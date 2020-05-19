var PATH_FILE = "D:\\JobScheduler\\data\\";
var PARAM_FILENAME = "FILENAME";
var LOAD_FILE_RECEIVED = "LOAD_FILE_RECEIVED";
var LOAD_ISO_FILES = "LOAD_ISO_FILES";

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

  spooler_log.info("##=> Archivo a procesar: " + filename);
  spooler_log.info("##=> Documento: " + parameterXmlns);

  if (parameterXmlns.indexOf("008") !== -1 || parameterXmlns.indexOf("003") !== -1) {
    return LOAD_FILE_RECEIVED;
  } else {
    return LOAD_ISO_FILES;
  }
}

/*
 * getFilename: Extrae el nombre del archivo a procesar de la lista de parametros actual.
 *
 * @ return Nombre del archivo
 *
 * @author con_wlopera
 */
function getFilename() {
  var variable_set = getParameter();
  var names = variable_set.names.split(";");

  for (var i in names) {
    if (PARAM_FILENAME === names[i]) {
      return variable_set.value(names[i]);
    }
  }

  return null;
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
