import React, { useEffect, useRef, useState } from 'react'

const Receiver = () => {
    const [socket,setSocket] = useState<WebSocket |null>(null);
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
            pc.ontrack = (event)=>{
                const video = document.createElement('video');
        document.body.appendChild(video);
        video.srcObject = new MediaStream([event.track]);
            video.play();
            }
        }
    }, []);

   
    return (
        <div>
         
          
          RECEIVER
        </div>
      )

    }
 


export default Receiver
