import { useGameStore } from '@/app/store/store';
import { socket } from '@/lib/socket';
import { useEffect, useState } from 'react';

export const GameView = () => {
    const room = useGameStore(state => state.room);
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const setRoom = useGameStore(state => state.setRoom);

    const [timeToGuess, setTimeToGuess] = useState(15);
    const [timeToStartGame, setTimeToStartGame] = useState(5);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [infoText, setInfoText] = useState('Round starts in');

    useEffect(() => {
        socket.on('game-started', payload => {
            setRoom(payload.room);
            setIsTimeUp(false);
        });

        socket.on('delay-timer-update', payload => {
            setTimeToStartGame(payload.time);
        });

        socket.on('timer-update', payload => {
            setTimeToGuess(payload.time);
        });

        socket.on('time-is-up', payload => {
            console.log('time is up');
            setRoom(payload.room);
            setIsTimeUp(true);
        });

        socket.on('timer-ended', () => {
            setIsTimeUp(false);
            setTimeToGuess(15);
            setInfoText('New round starts in');
            setTimeToStartGame(5);
            if (singlePlayer?.role === 'Admin') {
                socket.emit('new-round', { code: room.code });
            }
        });

        return () => {
            socket.off('game-started');
            socket.off('delay-timer-update');
            socket.off('timer-update');
            socket.off('timer-ended');
            socket.off('time-is-up');
        };
    }, []);

    if (room.currentSecretIdx === room.secrets.length) {
        return <div>Game ended</div>;
    }

    if (isTimeUp) {
        return <div>Time is Up</div>;
    }

    if (timeToStartGame !== 0) {
        return (
            <div>
                <div>
                    {infoText}: {timeToStartGame}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div>{room.secrets[room.currentSecretIdx].secret}</div>
            <div>{room.secrets[room.currentSecretIdx].playerId}</div>
            <div>{room.secrets[room.currentSecretIdx].id}</div>
            <div>{timeToGuess}</div>
        </div>
    );
};
