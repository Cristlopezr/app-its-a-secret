'use client';

import { socket } from '@/lib/socket';
import { useEffect, useState } from 'react';

export const PlayerRoomView = () => {
    const [players, setPlayers] = useState();
    const [roomStatus, setRoomStatus] = useState();

    useEffect(() => {
        socket.on('joined-room', payload => {
            console.log('AQUI');
            setPlayers(payload.players);
            setRoomStatus(payload.roomStatus);
        });
        return () => {
            socket.off('joined-room');
        };
    }, []);


    return (
        <div>
            players: {JSON.stringify(players, null, 2)}
            room Status : {roomStatus}
        </div>
    );
};
