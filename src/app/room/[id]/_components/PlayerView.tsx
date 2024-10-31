import { useGameStore } from '@/app/store/store';
import { useEffect } from 'react';
import { socket } from '@/lib/socket';
import { GameView } from './GameView';
import { WaitingPlayers } from './player/WaitingPlayers';
import { WaitingSecrets } from './WaitingSecrets';
import { GameFinished } from './GameFinished';

export const PlayerView = () => {
    const room = useGameStore(state => state.room);
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const setRoom = useGameStore(state => state.setRoom);
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

    console.log(room.status);
    if (room.status === 'waitingPlayers') {
        return <WaitingPlayers />;
    }

    if (room.status === 'waitingSecrets') {
        return <WaitingSecrets hasSubmittedSecret={!!hasSubmittedSecret} />;
    }

    if (room.status === 'started') {
        return <GameView />;
    }
    return <GameFinished />;
};
