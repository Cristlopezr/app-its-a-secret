import { useGameStore } from '@/app/store/store';
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { SecretForm } from './SecretForm';
import { socket } from '@/lib/socket';
import { GameView } from './GameView';
import { PlayersList } from './PlayersList';
import { WaitingPlayers } from './player/WaitingPlayers';
import { WaitingSecrets } from './player/WaitingSecrets';

export const PlayerView = () => {
    const room = useGameStore(state => state.room);
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const setRoom = useGameStore(state => state.setRoom);

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

    console.log(room.status);
    if (room.status === 'waitingPlayers') {
        return <WaitingPlayers />;
    }

    if (room.status === 'waitingSecrets') {
        return <WaitingSecrets />;
    }

    if (room.status === 'started') {
        return <GameView />;
    }
    return <div className='text-6xl flex items-center justify-center min-h-screen'>Game finished.</div>;
};
