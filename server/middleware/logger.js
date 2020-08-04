function log(req, res, next) {
  console.log(`Logging params ${1}, body ${2}`, req.params, req.body);
  next();
}

module.exports = log;
