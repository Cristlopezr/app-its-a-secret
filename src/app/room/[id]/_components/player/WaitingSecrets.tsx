import { useGameStore } from '@/app/store/store';
import { SecretForm } from '../SecretForm';
import { PlayersList } from '../PlayersList';

export const WaitingSecrets = () => {
    const room = useGameStore(state => state.room);
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const secretsLeft = room.players.length - room.secrets.length;

    const hasSubmittedSecret = room.secrets.find(({ playerId }) => playerId === singlePlayer?.id);

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
                    <div className='text-xl font-semibold'>Don't forget to hide your screen.</div>
                    <div className='text-xl font-semibold my-2 animate-pulse'>Waiting for players to reveal their secrets...</div>
                    <div>{secretsLeft} more player needs to reveal their secret.</div>
                    <SecretForm />
                </section>
            )}

            <PlayersList />
        </div>
    );
};
