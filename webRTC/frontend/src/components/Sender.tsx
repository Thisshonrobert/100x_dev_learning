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
    }, []);

    async function startSending(){
        const pc = new RTCPeerConnection();
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket?.send(JSON.stringify({
            type:"createoffer",
            sdp:offer
        }))
    }

  return (
    <div>
         sender
            <button onClick={startSending}>Send Video</button>

    </div>
  )
}

export default Sender
