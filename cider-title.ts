import {WebSocket,ErrorEvent,MessageEvent} from 'ws'

const socket = new WebSocket('ws://localhost:26369')
const maxLength = 40

socket.on('open', function onopen() {
  socket.send('{"action": "get-currentmediaitem"}')
})

socket.onerror = (event: ErrorEvent)=>{
  console.log("")
}

function printToPolybar(currentMediaData : any){
  let name = currentMediaData.name
  let albumName = currentMediaData.albumName
  let artist = currentMediaData.artistName
  let toBarShort = name
  let toBarNormal = `${name}-${artist}`
  let toBarLong = `${name}-${artist}|${albumName}`
  if (toBarLong.length <= maxLength) {
    console.log(toBarLong)
  } else if (toBarNormal.length <= maxLength) {
    console.log(toBarNormal)
  } else if (toBarShort.length <= maxLength) {
    console.log(toBarShort)
  }else{
    console.log(toBarShort.substring(0,maxLength)+"...")
  }
}

socket.onmessage = (event : MessageEvent) => {
  let data = event.data
  let resJSON = JSON.parse(data.toString())
  if (resJSON.type == 'playbackStateUpdate') {
    //console.clear();
    let currentmediaitem = resJSON.data;
    if (currentmediaitem == undefined || currentmediaitem == '') {
      console.log("");
      socket.close();
      return;
    }
    // move the following code to a function to build the message to polybar
   printToPolybar(currentmediaitem) 
    //console.log(toBar);
  }
  // terminate is not working
  socket.close()
}
