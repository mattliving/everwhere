import p from '../lib/p'
import {convertPlace} from '../lib/helpers'

export default function api (app) {
  app.get('/s/:place', p(function (req, res, next) {
    let {params, query} = req
    if (params.place && query.startdate && query.enddate) {
      return Promise.resolve({
        place: convertPlace([params.place]),
        startDate: query.startdate,
        endDate: query.enddate
      })
    } else {
      return Promise.resolve(null)
    }
  }))

  return app
}
