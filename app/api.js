import config from 'config'
import jsdom from 'jsdom'
import rp from 'request-promise'
import path from 'path'
import url from 'url'
import p from '../lib/p'
import {convertPlace} from '../lib/helpers'

let scrapbookEndpoint = config.services.scrapbook.endpoint

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

  app.get('/test', p(function (req, res, next) {
    // let uri = 'https://www.airbnb.co.uk/s/Kyoto--Japan?checkin=13-11-2015&checkout=23-11-2015&room_types%5B%5D=Entire+home%2Fapt&room_types%5B%5D=Private+room&price_min=13&price_max=87&ib=true&zoom=12&search_by_map=true&sw_lat=34.90532812884305&sw_lng=135.67134002954526&ne_lat=35.08266908600762&ne_lng=135.855361025639&ss_id=gcop68ot'
    // return new Promise((resolve) => {
    //   jsdom.env(
    //     uri,
    //     ['http://code.jquery.com/jquery.js'],
    //     function (err, window) {
    //       var $ = window.jQuery
    //       console.log($.fn.jquery)

    //       console.log($('a').length + ' links on the page!')
    //       resolve($('body').length)
    //     }
    //   )
    // })
    let uri = `${url.resolve(scrapbookEndpoint, path.join(config.env, 'greetings', 'hello'))}`
    return rp.get({
      uri: `${url.resolve(scrapbookEndpoint, path.join(config.env, 'greetings', 'hello'))}`,
      json: true
    }).then((val) => Promise.resolve(val))
      .catch(e => Promise.reject(e))
  }))

  return app
}
