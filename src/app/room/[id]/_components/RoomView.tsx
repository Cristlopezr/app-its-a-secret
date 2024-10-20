import { useGameStore } from '@/app/store/store';
import { socket } from '@/lib/socket';
import { useEffect } from 'react';
import { AdminView } from './AdminView';
import { PlayerView } from './PlayerView';

export const RoomView = () => {
    const setPlayers = useGameStore(state => state.setPlayers);
    const setRoom = useGameStore(state => state.setRoom);
    const singlePlayer = useGameStore(state => state.singlePlayer);

    useEffect(() => {
        socket.on('joined-room', payload => {
            console.log('IM HERE', payload.players);
            setPlayers(payload.players);
            setRoom(payload.room);
        });
        return () => {
            socket.off('joined-room');
        };
    }, []);

    if (singlePlayer && singlePlayer.role === 'Admin') {
        return <AdminView />;
    }

    return <PlayerView />;
};
