import { useGameStore } from '@/app/store/store';
import { socket } from '@/lib/socket';
import { useEffect, useState } from 'react';

export const GameView = () => {
    const room = useGameStore(state => state.room);
    const setRoom = useGameStore(state => state.setRoom);

    const [timeToGuess, setTimeGuess] = useState(15);
    const [timeToStartGame, setTimeToStartGame] = useState(5);
    const [currentSecret, setCurrentSecret] = useState(room.secrets[0]);
    const [currentSecretIdx, setCurrentSecretIdx] = useState(0);

    useEffect(() => {
        socket.on('game-started', payload => {
            setRoom(payload.room);
        });

        socket.on('delay-timer-update', payload => {
            setTimeToStartGame(payload.time);
        });

        socket.on('timer-update', payload => {
            setTimeGuess(payload.time);
        });

        //Reiniciar todo en timer-ended
        socket.on('timer-ended', payload => {
            setTimeGuess(15);
            setCurrentSecret(room.secrets[currentSecretIdx + 1]);
            setCurrentSecretIdx(currentSecretIdx + 1);
        });
    }, []);

    if (timeToStartGame !== 0) {
        return (
            <div>
                <div>New round starting in: {timeToStartGame}</div>
            </div>
        );
    }

    if (timeToGuess === 0 && currentSecretIdx !== room.secrets.length - 1) {
        socket.emit('new-round', { code: room.code });
    }

    return (
        <div>
            <div>{currentSecret.secret}</div>
            <div>{timeToGuess}</div>
        </div>
    );
};
