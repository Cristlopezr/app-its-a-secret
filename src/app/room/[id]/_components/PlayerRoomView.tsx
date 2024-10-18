'use client';

import { useGameStore } from '@/app/store/store';
import { socket } from '@/lib/socket';
import { useEffect } from 'react';

export const PlayerRoomView = () => {
    const setPlayers = useGameStore(state => state.setPlayers);
    const setRoomStatus = useGameStore(state => state.setRoomStatus);
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const roomStatus = useGameStore(state => state.roomStatus);
    const players = useGameStore(state => state.players);

    useEffect(() => {
        socket.on('joined-room', payload => {
            setPlayers(payload.players);
            setRoomStatus(payload.roomStatus);
        });
        return () => {
            socket.off('joined-room');
        };
    }, []);

    if (singlePlayer && singlePlayer.role === 'Admin') {
        return <div>Soy admin {JSON.stringify(singlePlayer, null, 2)}</div>;
    }

    return (
        <div>
            players: {JSON.stringify(players, null, 2)}
            room Status : {roomStatus}
        </div>
    );
};
