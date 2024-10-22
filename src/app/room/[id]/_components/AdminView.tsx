import { useGameStore } from '@/app/store/store';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { socket } from '@/lib/socket';
import { Cat, Check, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SecretForm } from '../../_components/SecretForm';

const MAX_PLAYERS = 1;

export const AdminView = () => {
    const room = useGameStore(state => state.room);
    const setRoom = useGameStore(state => state.setRoom);
    const [hasSubmittedSecret, setHasSubmittedSecret] = useState(false);

    const playersLeft = room.maxPlayers - room.players.length;
    const secretsLeft = room.players.length - room.secrets.length;

    useEffect(() => {
        socket.on('waiting-secrets', payload => {
            setRoom(payload.room);
        });

        socket.on('secret-submitted', payload => {
            setRoom(payload.room);
            setHasSubmittedSecret(true);
        });

        return () => {
            socket.off('waiting-secrets');
            socket.off('secret-submitted');
        };
    }, []);

    const onClickReveal = () => {
        socket.emit('reveal-secrets', { code: room.code });
    };

    if (room.status === 'waitingPlayers') {
        return (
            <div className='flex flex-col items-center gap-10 justify-center min-h-screen bg-gray-100 text-gray-800 p-8'>
                <h1 className='text-4xl font-bold mb-8 text-indigo-700'>It's a Secret!</h1>
                <Card className='bg-white shadow-md w-full max-w-2xl'>
                    <CardHeader>
                        <CardTitle className='text-2xl text-indigo-600'>Room Code: {room.code}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-base mb-2'>Invite at least 3 friends to join the fun! Share this room code with them.</p>
                        <p className='text-base'>Once you're all set and ready to reveal your secrets, click the button below to get started!</p>
                    </CardContent>
                </Card>
                {/* Se borra cuando hay jugadores suficientes para empezar */}

                <div className='flex items-center gap-2 mt-5'>
                    {room.players.length < room.maxPlayers ? (
                        <>
                            <div>Waiting for {playersLeft} more players to play</div>
                            <LoaderCircle className='animate-spin' />
                        </>
                    ) : (
                        <>
                            <div>You are ready to play</div>
                            <Check />
                        </>
                    )}
                </div>
                <Button
                    onClick={onClickReveal}
                    disabled={room.players.length < MAX_PLAYERS}
                    className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded text-lg my-6 transition-all duration-200'
                >
                    Reveal Your Secrets
                </Button>

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

    //waitingSecrets status
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
            <ul className='w-full max-w-2xl bg-white shadow-md rounded-lg p-4 mb-6'>
                {room.players.map(player => (
                    <li key={player.id} className='text-base mb-2 flex items-center gap-2 text-gray-700'>
                        <Cat className='text-indigo-600' />
                        {player.username}
                    </li>
                ))}
            </ul>

            {/* Esto deberia verse cuando el roomStatus sea waitingSecrets y deberia estar deshabilitado si los secretos no esta completos */}
            <Button disabled={room.secrets.length !== room.players.length} className='bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded text-xl transition-all duration-200'>
                Start Game
            </Button>
        </div>
    );
};
