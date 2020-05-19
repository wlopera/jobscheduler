function getBodyBicCode(company, country, format, source, ipwebservice, channel) {
  return (
    '{ "company":' +
    company +
    ', "country":' +
    country +
    ', "format": "' +
    format +
    '", "source": "' +
    source +
    '", "ipwebservice": "' +
    ipwebservice +
    '", "channel": ' +
    channel +
    "}"
  );
}

function getBodyLoadFileReceived(company, country, filename, source, format, user) {
  return (
    '{ "company":' +
    company +
    ', "country":' +
    country +
    '", "filename": "' +
    filename +
    '", "source": "' +
    source +
    '", "format": ' +
    format +
    ', "user": ' +
    user +
    "}"
  );
}

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
    '","filename": "' +
    filename +
    '","fileprefix": "' +
    fileprefix +
    '","source": "' +
    source +
    '","format": "' +
    format +
    '","ipwebservice": "' +
    ipwebservice +
    '","processdate": "' +
    processdate +
    ', "user": ' +
    user +
    "}"
  );
}
