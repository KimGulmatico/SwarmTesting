var swarmlog = require('swarmlog')
var memdb = require('memdb')
var keys = require('./keys.json')
var wrtc = require('wrtc')
var chlorideBrowser = require('chloride/browser')
var randomWords = require('random-words')


var log = swarmlog({
    keys: keys,
    sodium: chlorideBrowser,
    db: memdb(),
    valueEncoding: 'json',
    hubs: ['http://signalhub-router.herokuapp.com/'],
    wrtc: wrtc
})

let hotel = {name: 'richmonde', location: 'iloilo'}

setInterval(()=>{log.append(hotel)}, 1000)


// log.db.put('key', hotel, function (err) {
//     if (err) throw err
  
//     log.db.get('key', function (err, value) {
//       if (err) throw err
//       console.log(value)
//     })
//   })


  
