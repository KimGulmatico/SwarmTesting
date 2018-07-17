var swarmlog = require('swarmlog')
var wrtc = require('wrtc')
var readline = require('readline');

var level = require('level')

var database = level('./mydb_client', {valueEncoding: 'json'})

var log = swarmlog({
  keys: require('./keys.json'),
  sodium: require('chloride/browser'),
  db: level('./level_client'),
  valueEncoding: 'json',
  hubs: [ 'http://signalhub-router.herokuapp.com/' ],
  wrtc: wrtc
})

const booking = {
    name: 'Richmonde Hotel',
    room: 'Room1',
    date: new Date().toLocaleDateString()    
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log('Hotel Booking')
process.stdout.write('Name: ')
var inc = 0
rl.on('line', (input) => {
    if(inc == 0){
        process.stdout.write('Room: ')
        booking.name = input
    }
    if(inc == 1){
        process.stdout.write('Date: ')
        booking.room = input
    }
    if(inc == 2){
        booking.date = input
        book()
    }
    inc++
});

async function book(){
    let f = await find(booking) 
    console.log(!f)
    if(!f){
        await log.append(booking)
    }else
    {
        console.log('Room not available')
    }
}

function index(json, key) {
    database.put(JSON.stringify(json), key, (err) =>{
        if(err) return console.log(err)
    })
    database.get(JSON.stringify(json), (err, val) =>{
        if(err) return console.log(err)
        console.log('index',val)
    })
}

async function find(query) {
    try {
        const res = await database.get(JSON.stringify(query))
        return true 
    } catch (err) {}
    return false
}

log.on('add', (node) => {
    console.log('booking successfull!')
})

log.createReadStream({ live: true })
  .on('data', function (data) {
    console.log('RECEIVED', data)
    database.put(data.key, data.value, (err) => {if(err) console.log(err)})
    //database.get(data.key, (err, val) => { console.log(val)})
    index(data.value, data.key)    
})
