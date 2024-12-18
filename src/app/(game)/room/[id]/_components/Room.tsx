import { useGameStore } from '@/app/store/store';
import { socket } from '@/lib/socket';
import { useEffect } from 'react';
import { WaitingPlayers } from '../_components/WaitingPlayers';
import { WaitingSecrets } from '../_components/WaitingSecrets';
import { Game } from './Game';
import { GameFinished } from '../_components/GameFinished';

export const Room = () => {
    const room = useGameStore(state => state.room);
    const setRoom = useGameStore(state => state.setRoom);
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const hasSubmittedSecret = room.secrets.find(({ playerId }) => playerId === singlePlayer?.id);

    useEffect(() => {
        socket.on('waiting-secrets', payload => {
            setRoom(payload.room);
        });

        socket.on('secret-submitted', payload => {
            setRoom(payload.room);
        });

        socket.on('game-started', payload => {
            setRoom(payload.room);
        });

        return () => {
            socket.off('waiting-secrets');
            socket.off('secret-submitted');
            socket.off('game-started');
        };
    }, []);

    if (room.status === 'waitingPlayers') {
        return <WaitingPlayers />;
    }

    //waitingSecrets status
    if (room.status === 'waitingSecrets') {
        return <WaitingSecrets hasSubmittedSecret={!!hasSubmittedSecret} />;
    }

    if (room.status === 'started') {
        return <Game />;
    }
    /* Mostrar los ganadores */
    return <GameFinished />;
};
