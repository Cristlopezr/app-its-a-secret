'use client';

import { socket } from '@/lib/socket';
import { useEffect, useState } from 'react';

export const Room = () => {
    const [players, setPlayers] = useState();
    const [roomStatus, setRoomStatus] = useState();
    const [socketId, setSocketId] = useState(sessionStorage.getItem('id'));
    const [cameFromValidPage, setCameFromValidPage] = useState(sessionStorage.getItem('referrer'));

    useEffect(() => {
        if (socketId) {
            socket.emit('in-room', { socketId: socketId });
            socket.on('in-room-response', payload => {
                console.log('AQUI');
                setPlayers(payload.players);
                setRoomStatus(payload.roomStatus);
            });
        }
        return () => {
            socket.off('in-room-response');
        };
    }, [socketId]);

    if (!socketId || !cameFromValidPage) {
        return <div>Enter code</div>;
    }

    return (
        <div>
            players: {JSON.stringify(players, null, 2)}
            room Status : {roomStatus}
        </div>
    );
};
