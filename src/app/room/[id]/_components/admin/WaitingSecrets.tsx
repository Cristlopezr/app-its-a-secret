import { useGameStore } from '@/app/store/store';
import { SecretForm } from '../SecretForm';
import { PlayersList } from '../PlayersList';
import { Button } from '@/components/ui';
import { socket } from '@/lib/socket';

interface Props {
    hasSubmittedSecret: boolean;
}

export const WaitingSecrets = ({ hasSubmittedSecret }: Props) => {
    const room = useGameStore(state => state.room);
    const secretsLeft = room.players.length - room.secrets.length;

    const onStartGame = () => {
        socket.emit('game-starts', { code: room.code });
        //mostrar el mensaje de que si vota por su mismo secreto no cuenta ni descuenta
    };

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
                    <div className='text-xl font-semibold mb-5'>Don't forget to hide your screen.</div>
                    <div className='text-xl font-semibold my-2 animate-pulse'>Waiting for players to reveal their secrets...</div>
                    <div>{secretsLeft} more player needs to reveal their secret.</div>
                    <SecretForm />
                </section>
            )}

            {/* Hacer que el icono sea random */}
            <PlayersList />

            {/* Esto deberia verse cuando el roomStatus sea waitingSecrets y deberia estar deshabilitado si los secretos no esta completos */}
            <Button onClick={onStartGame} disabled={room.secrets.length !== room.players.length} className='font-semibold py-3 px-8 rounded text-xl transition-all duration-200'>
                Start Game
            </Button>
        </div>
    );
};
