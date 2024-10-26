import { useGameStore } from '@/app/store/store';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { socket } from '@/lib/socket';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SecretForm } from '../../_components/SecretForm';
import { PlayersList } from './PlayersList';
import { GameView } from './GameView';

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

        socket.on('game-started', payload => {
            setRoom(payload.room);
        });

        return () => {
            socket.off('waiting-secrets');
            socket.off('secret-submitted');
            socket.off('game-started');
        };
    }, []);

    const onClickReveal = () => {
        socket.emit('reveal-secrets', { code: room.code });
    };

    const onStartGame = () => {
        //empezar countdown
        socket.emit('game-starts', { code: room.code });
        //mostrar el mensaje de que si vota por su mismo secreto no cuenta ni descuenta
    };

    if (room.status === 'waitingPlayers') {
        return (
            <div className='flex flex-col items-center gap-10 min-h-screen pt-20'>
                <h1 className='text-4xl font-bold mb-8'>It's a Secret!</h1>
                <Card className='w-full max-w-2xl'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Room Code: {room.code}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-base mb-2'>Invite at least 3 friends to join the fun! Share this room code with them.</p>
                        <p className='text-base'>Once you're all set and ready to reveal your secrets, click the button below to get started!</p>
                    </CardContent>
                </Card>
                {/* Se borra cuando hay jugadores suficientes para empezar */}

                <div className='flex items-center gap-2 mt-5'>
                    {room.players.length < room.maxPlayers ? (
                        <div className='animate-pulse text-lg flex items-center gap-2'>
                            <div>Waiting for {playersLeft} more players to join...</div>
                        </div>
                    ) : (
                        <>
                            <div>You are ready to play</div>
                            <Check />
                        </>
                    )}
                </div>
                <Button onClick={onClickReveal} disabled={room.players.length < 1} className='font-semibold py-2 px-6 rounded text-lg my-6 transition-all duration-200'>
                    Reveal Your Secrets
                </Button>

                <PlayersList />
            </div>
        );
    }

    //waitingSecrets status
    if (room.status === 'waitingSecrets') {
        return (
            <div className='flex flex-col items-center gap-10 justify-center min-h-screen p-8'>
                {hasSubmittedSecret ? (
                    <section className='text-center'>
                        {secretsLeft > 0 ? (
                            <>
                                <div className='text-xl font-semibold my-2 animate-pulse'>Waiting for players to reveal their secrets...</div>
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
                        <div className='text-xl font-semibold my-2 animate-pulse'>Waiting for players to reveal their secrets...</div>
                        <div>{secretsLeft} more player needs to reveal their secret.</div>
                        <SecretForm />
                    </section>
                )}

                {/* Hacer que el icono sea random */}
                <PlayersList />

                {/* Esto deberia verse cuando el roomStatus sea waitingSecrets y deberia estar deshabilitado si los secretos no esta completos */}
                <Button
                    onClick={onStartGame}
                    disabled={room.secrets.length !== room.players.length}
                    className='font-semibold py-3 px-8 rounded text-xl transition-all duration-200'
                >
                    Start Game
                </Button>
            </div>
        );
    }

    if (room.status === 'started') {
        return <GameView />;
    }
    return <div>Game finished.</div>;
};
