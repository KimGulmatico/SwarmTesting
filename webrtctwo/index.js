var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')

var hub = signalhub('swarm-example', ['http://signalhub-router.herokuapp.com/'])

var sw = swarm(hub, {
  wrtc: require('wrtc') // don't need this if used in the browser
})

sw.on('peer', function (peer, id) {
  console.log('connected to a new peer:', id)
  console.log('total peers:', sw.peers.length)
  peer.send("hello")
  peer.on('data', (data) => {
      console.log(data.toString())
  })
})

sw.on('disconnect', function (peer, id) {
  console.log('disconnected from a peer:', id)
  console.log('total peers:', sw.peers.length)
})