import _ from 'lodash'
import winston from 'winston'

export default function createLogger (config) {
  let transports = [new (winston.transports.Console)(_.extend({
    level: 'info',
    colorize: true,
    timestamp: true
  }, config.console))]

  let logger = new winston.Logger({
    transports: transports
  })

  return logger
}
