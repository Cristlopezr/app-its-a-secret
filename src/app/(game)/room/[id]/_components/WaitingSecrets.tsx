import { useGameStore } from '@/app/store/store';
import { Button } from '@/app/_components/ui';
import { socket } from '@/lib/socket';
import { SecretForm } from './SecretForm';
import { PlayersList } from './PlayersList';

interface Props {
    hasSubmittedSecret: boolean;
}

export const WaitingSecrets = ({ hasSubmittedSecret }: Props) => {
    const room = useGameStore(state => state.room);
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const admin = useGameStore(state => state.room.players).filter(player => player.role === 'Admin')[0];
    const secretsLeft = room.players.length - room.secrets.length;

    const onStartGame = () => {
        socket.emit('game-starts', { code: room.code });
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
                    <div className='text-xl font-semibold my-2 animate-pulse'>Waiting for players to reveal their secrets...</div>
                    {secretsLeft !== 1 ? (
                        <div className='my-2'>{secretsLeft} more players need to reveal their secrets.</div>
                    ) : (
                        <div className='my-2'>{secretsLeft} more player needs to reveal their secret.</div>
                    )}
                    <div className='text-xl font-semibold my-5'>Don&apos;t forget to hide your screen.</div>
                    <SecretForm />
                </section>
            )}
            <PlayersList />

            {singlePlayer && singlePlayer.id === admin.id && (
                <Button onClick={onStartGame} disabled={room.secrets.length !== room.players.length} className='font-semibold py-3 px-8 rounded text-xl transition-all duration-200'>
                    Start Game
                </Button>
            )}
        </div>
    );
};
