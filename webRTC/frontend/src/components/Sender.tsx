import { useEffect, useState } from 'react'

const Sender = () => {

    const [socket,setSocket] = useState<WebSocket |null>(null)
    const [pc,setPc] = useState<WebSocket | null>(null)

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setSocket(socket);
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'sender'
            }));
        }
        setSocket(socket);
    }, []);

    async function startSending(){
        if(!socket) return;
        const pc = new RTCPeerConnection();
        pc.onnegotiationneeded = async()=>{
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket?.send(JSON.stringify({
                type:"createoffer",
                sdp:offer
            }))
        }
        
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket?.send(JSON.stringify({
                    type: 'iceCandidate',
                    candidate: event.candidate
                }));
            }
        }
        socket.onmessage = (e)=>{
            const message = JSON.parse(e.data);
            if(message.type === "createanswer"){
                pc.setRemoteDescription(message.sdp)
            }
            else if (message.type === 'iceCandidate') {
                pc.addIceCandidate(message.candidate);
            }
        }
        const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:false});
        pc.addTrack(stream.getVideoTracks()[0])
    }

  return (
    <div>
         sender
            <button onClick={startSending}>Send Video</button>

    </div>
  )
}

export default Sender
