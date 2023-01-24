import { WebSocket, ErrorEvent, MessageEvent } from 'ws'
import { exit } from 'process'

// if there is no additional arguments, only defaults
if (process.argv.length < 3) {
  exit(1)
}

const socket = new WebSocket('ws://localhost:26369')
var icon = process.argv[2]

function printPreviousOrNext(): boolean {
  switch (icon) {
    case 'previous-icon':
      console.log('ﭢ')
      return true
    case 'next-icon':
      console.log('ﭠ')
      return true
    default:
      return false
  }
}

socket.on('open', function onopen() {
  socket.send(`{"action": \"get-currentmediaitem\"}`)
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
      if (icon == 'playpause-icon') {
        console.log('')
      } else {
        console.log('')
      }
      socket.close()
      return
    }
    if (!printPreviousOrNext()) {
      let status = payload.status
      playpauseIcon(status)
    }
    socket.close()
  }
}

function playpauseIcon(status: boolean) {
  var icon = ''
  if (status) {
    icon = ''
  }
  console.log(icon)
}
