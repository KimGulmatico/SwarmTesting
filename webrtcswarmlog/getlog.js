var swarmlog = require('swarmlog')
var memdb = require('memdb')
var level = require('level')
var keys = require('./keys.json')
var wrtc = require('wrtc')
var chlorideBrowser = require('chloride/browser')
var clear = require('clear')


var levelDB = level('./db', {valueEncoding: 'json'})

var log = swarmlog({
    keys: keys,
    sodium: chlorideBrowser,
    db: memdb(),
    valueEncoding: 'json',
    hubs: ['http://signalhub-router.herokuapp.com/'],
    wrtc: wrtc
})

log.createReadStream({ live: true })
  .on('data', function (data) {
    let hotel = []
    hotel.push(data.value)
    levelDB.get('hotel', (err, value) =>{
        if(err) { //no key was found 
            levelDB.batch()
            .put('hotel', hotel)
            .write(() => { 
                levelDB.get('hotel', (err, value)=>{
                    if(err) return console.log('key not found')
                    console.log('hotel = ',value)
                }) 
            })
        }
        else{
            
        let hotelAppend = value
        hotelAppend.push(data.value)

        levelDB.batch()
        .put('hotel', hotelAppend)
        .write(() => { 
            levelDB.get('hotel', (err, value)=>{
                if(err) return console.log('key not found')
                clear()
                console.log('hotel = ',value)
            }) 
        })
        }

    })
})

