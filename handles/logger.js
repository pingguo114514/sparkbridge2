class sparklogger {
  constructor(name) {
      this.name = name;
  }
  info(msg) {
      ll_logger.setTitle(this.name);
      ll_logger.info(msg);
  }
  log(msg) {
      ll_logger.setTitle(this.name);
      ll_logger.log(msg);
  }
  debug(msg) {
      ll_logger.setTitle(this.name);
      ll_logger.debug(msg);
  }
  warn(msg) {
      ll_logger.setTitle(this.name);
      ll_logger.warn(msg);
  }
  error(msg) {
      ll_logger.setTitle(this.name);
      ll_logger.error(msg);
  }
  fatal(msg) {
      ll_logger.setTitle(this.name);
      ll_logger.fatal(msg);
  }
}
function SparkLogger(plugin_name) {
  return new sparklogger(plugin_name);
}
module.exports = { getLogger: SparkLogger };