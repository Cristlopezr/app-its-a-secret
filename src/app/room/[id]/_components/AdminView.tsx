import { useGameStore } from '@/app/store/store';
import { socket } from '@/lib/socket';
import { useEffect, useState } from 'react';
import { GameView } from './GameView';
import { WaitingPlayers } from './admin/WaitingPlayers';
import { WaitingSecrets } from './admin/WaitingSecrets';

export const AdminView = () => {
    const room = useGameStore(state => state.room);
    const setRoom = useGameStore(state => state.setRoom);
    const [hasSubmittedSecret, setHasSubmittedSecret] = useState(false);

    useEffect(() => {
        socket.on('waiting-secrets', payload => {
            setRoom(payload.room);
        });

        socket.on('secret-submitted', payload => {
            setRoom(payload.room);
            setHasSubmittedSecret(true);
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
        return <WaitingSecrets hasSubmittedSecret={hasSubmittedSecret} />;
    }

    if (room.status === 'started') {
        return <GameView />;
    }
    /* Mostrar los ganadores */
    return <div className='text-6xl flex items-center justify-center min-h-screen'>Game finished.</div>;
};
