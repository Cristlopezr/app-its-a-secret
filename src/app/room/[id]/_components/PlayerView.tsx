import { useGameStore } from '@/app/store/store';
import { Cat, Check, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SecretForm } from '../../_components/SecretForm';
import { Button } from '@/components/ui';
import { socket } from '@/lib/socket';
import { GameView } from './GameView';

export const PlayerView = () => {
    const room = useGameStore(state => state.room);
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const setRoom = useGameStore(state => state.setRoom);

    const playersLeft = room.maxPlayers - room.players.length;
    const secretsLeft = room.players.length - room.secrets.length;
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
        return (
            <div className='flex flex-col items-center gap-10 justify-center min-h-screen bg-gray-100 text-gray-800 p-8'>
                <ul>
                    {room.players.map(player => (
                        <li key={player.id} className='text-base mb-2 flex items-center gap-2 text-gray-700'>
                            <Cat className='text-indigo-600' />
                            {player.username}
                        </li>
                    ))}
                </ul>
                <div className='flex items-center gap-2 mt-5'>
                    {room.players.length < room.maxPlayers ? (
                        <>
                            <div>Waiting for {playersLeft} more players to play</div>
                            <LoaderCircle className='animate-spin' />
                        </>
                    ) : (
                        <>
                            <div>You are ready to play.</div>
                            <Check />
                        </>
                    )}
                </div>
            </div>
        );
    }

    if (room.status === 'waitingSecrets') {
        return (
            <div className='flex flex-col items-center gap-10 justify-center min-h-screen bg-gray-100 text-gray-800 p-8'>
                {hasSubmittedSecret ? (
                    <section className='text-center'>
                        {secretsLeft > 0 ? (
                            <>
                                <div className='text-xl font-semibold my-2 text-indigo-600 animate-pulse'>Waiting for players to reveal their secrets...</div>
                                <div>{secretsLeft} more player needs to reveal their secret.</div>
                                <div>You submitted your secret.</div>
                            </>
                        ) : (
                            <>
                                <div>Ready to play.</div>
                            </>
                        )}
                    </section>
                ) : (
                    <section className='text-center'>
                        <div className='text-xl font-semibold my-2 text-indigo-600 animate-pulse'>Waiting for players to reveal their secrets...</div>
                        <div>{secretsLeft} more player needs to reveal their secret.</div>
                        <SecretForm />
                    </section>
                )}

                {/* Hacer que el icono sea random */}
                <ul>
                    {room.players.map(player => (
                        <li key={player.id} className='text-base mb-2 flex items-center gap-2 text-gray-700'>
                            <Cat className='text-indigo-600' />
                            {player.username}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (room.status === 'started') {
        return <GameView />;
    }
    return <div>Game finished.</div>;
};
