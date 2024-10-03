import React, { useEffect, useState } from 'react'

const Receiver = () => {
    const [socket,setSocket] = useState<WebSocket |null>(null);
    const [pc,setPc] = useState<WebSocket | null>(null)

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setSocket(socket);
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'receiver'
            }));
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const pc = new RTCPeerConnection();
            if (message.type === 'createOffer') {
                pc.setRemoteDescription(message.sdp).then(() => {
                    pc.createAnswer().then((answer) => {
                        pc.setLocalDescription(answer);
                        socket.send(JSON.stringify({
                            type: 'createAnswer',
                            sdp: answer
                        }));
                    });
                });
            } else if (message.type === 'iceCandidate') {
                pc.addIceCandidate(message.candidate);
            }
        }
    }, []);

   
    return (
        <div>
         
          <button >Receive Video</button>
        </div>
      )

    }
 


export default Receiver
