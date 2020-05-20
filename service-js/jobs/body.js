/**
 * getBodyLoadFileReceived: Generar los datos a enviar al servicio Load File received.
 *
 * @param company    Compañía - Instituci​ón financiera de la cual se desea extraer los datos:
 *                          1 - Credicorp
 *                       1007 - Unicorp
 *                       8994 - Plan Inteligente
 * @param country    ​País, 1 Panamá
 * @param filename   Nombre del archivo recibido
 * @param format     Formato, utilizar "json" para este caso.​
 * @param source    ​​ Identificador del aplicativo que está llamando el servicio Web
 * @param user       Usuario del CORE que va a procesar los archivos
 *
 * @author con_wlopera
 */
function getBodyLoadFileReceived(company, country, filename, format, source, user) {
  return (
    '{ "company":' +
    company +
    ', "country":' +
    country +
    ', "filename": "' +
    filename +
    '", "format": "' +
    format +
    '", "source": "' +
    source +
    '", "user": ' +
    user +
    "}"
  );
}

/**
 * getBodyLoadIsoFiles:
 *
 * @param channel      Canal
 * @param company      Compañía - Instituci​ón financiera de la cual se desea extraer los datos:
 *                            1 - Credicorp
 *                         1007 - Unicorp
 *                         8994 - Plan Inteligente
 * @param country    ​  País, 1 Panamá
 * @param filename     Nombre del archivo recibido
 * @param fileprefix   Prefijo del archivo recibido. Ejemplo PACS.002 (No Obligatorio)
 * @param source       Identificador del aplicativo que está llamando el servicio Web
 * @param format       Formato, utilizar "json" para este caso.​
 * @param ipwebservice Ip desde la cual se llama al servicio.
 * @param processdate  Fecha de proceso Fecha (formato ISO-8601)​ - yyyy-MM-dd
 * @param user         Usuario del CORE que va a procesar los archivos
 *
 * @author con_wlopera
 */
function getBodyLoadIsoFiles(
  channel,
  company,
  country,
  filename,
  fileprefix,
  source,
  format,
  ipwebservice,
  processdate,
  user
) {
  return (
    '{ "channel":' +
    channel +
    ', "company":' +
    company +
    ', "country":' +
    country +
    ', "filename": "' +
    filename +
    '", "fileprefix": "' +
    fileprefix +
    '", "source": "' +
    source +
    '", "format": "' +
    format +
    '", "ipwebservice": "' +
    ipwebservice +
    '", "processdate": "' +
    processdate +
    '", "user": ' +
    user +
    "}"
  );
}
