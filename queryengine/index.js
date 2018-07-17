var level  = require('level')
var sub    = require('level-sublevel')
var search = require('level-search')

var db = sub(level('./mydb', {valueEncoding: 'json'}))
var index = search(db, 'search')

db.put('key1', {"name": "daine", "lover": "kim"}, (err)=>{ if(err) console.log(err)})
db.put('key2', {"name": "daine", "lover": "kimy"}, (err)=>{ if(err) console.log(err)})
db.put('key3', {"name": "daine", "lover": "kimyy"}, (err)=>{ if(err) console.log(err)})

db.put(JSON.stringify({"name": "daine", "lover": "kim"}), 'key1', (err)=>{ if(err) console.log(err)} )
// db.get('key', (err, value)=>{ 
//     if(err) console.log(err)
//     console.log(value)
// })
db.get(JSON.stringify({"name": "daine", "lover": "kim"}), (err, val)=>{ console.log(val)})
// index.createSearchStream(['name', 'daine', 'lover', 'kim'])
//   .on('data', console.log)