import { Socket } from 'socket.io'

export const SocketSever = (socket: Socket) => {
    // console.log(socket.id + " connected")

    socket.on('online', function (data) {    
        if(data.iduser !== undefined){
            socket.join(data.iduser);
            console.log({online: (socket as any).adapter.rooms})
        }
      });

      socket.on('offline', (data) =>{
        socket.leave(data.iduser)
        console.log({offline: (socket as any).adapter.rooms})
    })

    socket.on("disconnect", () => {
        console.log(socket.id + " disconnect")
    })
}