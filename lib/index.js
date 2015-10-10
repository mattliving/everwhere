import bodyParser from 'body-parser'
import config from 'config'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import createLogger from './logger'

export default function server (root) {
  var server, app, knex

  var pkg = require(path.join(root, '/package.json'))

  app = express()

  app.log = createLogger(config.log)

  app.use(bodyParser.json())
  app.use(morgan('short', {
    stream: {
      write: function (message) {
        app.log.info(message.replace(/\n/g, ''))
      }
    }
  }))

  app.get('/', function (req, res) {
    res.send('Hello, this is ' + pkg.name + '. Env: ' + app.get('env') + '.')
  })

  app.get('/status', function (req, res) {
    res.send('ok')
  })

  app.start = function () {
    return new Promise(function (resolve) {
      server = app.listen(config.port, function () {
        app.log.info(pkg.name + ' started http://localhost:' + config.port)
        resolve()
      })
    })
  }

  app.stop = function () {
    return new Promise.all([
      new Promise(function (resolve) {
        server.close(function () {
          app.log.info(pkg.name + ' stopped')
          resolve()
        })
      })
    ])
  }

  app.url = function () {
    return 'http://localhost:' + config.port + '/'
  }

  return app
}
