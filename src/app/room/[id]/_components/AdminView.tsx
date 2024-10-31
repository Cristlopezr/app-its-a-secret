import { useGameStore } from '@/app/store/store';
import { socket } from '@/lib/socket';
import { useEffect } from 'react';
import { GameView } from './GameView';
import { WaitingPlayers } from './admin/WaitingPlayers';
import { WaitingSecrets } from './WaitingSecrets';
import { GameFinished } from './GameFinished';

export const AdminView = () => {
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
        return <GameView />;
    }
    /* Mostrar los ganadores */
    return <GameFinished />;
};
