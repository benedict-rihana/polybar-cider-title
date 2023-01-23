import WebSocket from "ws";

const socket = new WebSocket("ws://localhost:26369");

socket.once("open", function onopen() {
  socket.send('{"action": "get-currentmediaitem"}');
});

socket.on("message", function message(data) {
  let resJSON = JSON.parse(data.toString());
  if (resJSON.type == "playbackStateUpdate") {
    //console.clear();
    let currentmediaitem = resJSON.data;
    if (currentmediaitem == undefined || currentmediaitem == "") {
      socket.close();
      return;
    }
    let name = currentmediaitem.name;
    // let albumName = currentmediaitem.albumName;
    let artist = currentmediaitem.artistName;
    let toBar = `${name} - ${artist}`;
    process.stdout.write(toBar);
  }
  // terminate is not working
  socket.close();
});
