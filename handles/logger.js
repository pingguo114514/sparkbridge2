class sparklogger {
  constructor(name) {
      this.name = name;
  }
  info(msg) {
      logger.setTitle(this.name);
      logger.info(msg);
  }
  log(msg) {
      logger.setTitle(this.name);
      logger.log(msg);
  }
  debug(msg) {
      logger.setTitle(this.name);
      logger.debug(msg);
  }
  warn(msg) {
      logger.setTitle(this.name);
      logger.warn(msg);
  }
  error(msg) {
      logger.setTitle(this.name);
      logger.error(msg);
  }
  fatal(msg) {
      logger.setTitle(this.name);
      logger.fatal(msg);
  }
}
function SparkLogger(plugin_name) {
  return new sparklogger(plugin_name);
}
module.exports = { getLogger: SparkLogger };