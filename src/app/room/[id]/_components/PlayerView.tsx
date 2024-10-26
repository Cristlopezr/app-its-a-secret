import { useGameStore } from '@/app/store/store';
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { SecretForm } from '../../_components/SecretForm';
import { socket } from '@/lib/socket';
import { GameView } from './GameView';
import { PlayersList } from './PlayersList';

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
                <PlayersList />
                <div className='flex items-center gap-2 mt-5'>
                    {room.players.length < room.maxPlayers ? (
                        <div className='animate-pulse text-lg flex items-center gap-2'>
                            <div>Waiting for {playersLeft} more players to join...</div>
                        </div>
                    ) : (
                        <>
                            <div>Ready to play.</div>
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

                <PlayersList />
            </div>
        );
    }

    if (room.status === 'started') {
        return <GameView />;
    }
    return <div>Game finished.</div>;
};
