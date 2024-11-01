import { useGameStore } from '@/app/store/store';
import { PlayersList } from '../PlayersList';
import { Check } from 'lucide-react';

export const WaitingPlayers = () => {
    const room = useGameStore(state => state.room);
    const currentPlayers = room.players.filter(({ username }) => username !== undefined);
    const playersLeft = room.maxPlayers - currentPlayers.length;

    return (
        <div className='flex flex-col items-center gap-10 justify-center min-h-screen p-8'>
            <PlayersList />
            <div className='flex items-center gap-2 mt-5'>
                {currentPlayers.length < room.maxPlayers ? (
                    <div className='animate-pulse text-lg flex items-center gap-2'>
                        <div>Waiting for {playersLeft} more players to join...</div>
                    </div>
                ) : (
                    <>
                        <div>You can wait for more players to join or start playing now.</div>
                        <Check />
                    </>
                )}
            </div>
        </div>
    );
};
