import { WebSocket, ErrorEvent, MessageEvent } from 'ws'
import { exit } from 'process'

// if there is no additional arguments, only defaults
if (process.argv.length < 3) {
  exit(1)
}

const socket = new WebSocket('ws://localhost:26369')
var action = process.argv[2]

socket.on('open', function onopen() {
  socket.send(`{"action": \"${action}\"}`)
})

socket.onerror = (event: ErrorEvent) => {
  console.log('')
}

socket.onmessage = (event: MessageEvent) => {
  let data = event.data
  //if (action == 'playpause') {
  let resJSON = JSON.parse(data.toString())
  if (resJSON.type == 'playbackStateUpdate') {
    //console.clear();
    let payload = resJSON.data
    if (payload == undefined || payload == '') {
      if (action == 'playpause') {
        socket.send(`{"action": \"play\"}`)
      } else {
        console.log('')
        socket.close()
      }
      return
    }
    socket.close()
  }
}
