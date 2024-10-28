import { useGameStore } from '@/app/store/store';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { PlayersList } from '../PlayersList';
import { socket } from '@/lib/socket';

export const WaitingPlayers = () => {
    const room = useGameStore(state => state.room);
    const playersLeft = room.maxPlayers - room.players.length;

    const onClickReveal = () => {
        socket.emit('reveal-secrets', { code: room.code });
    };
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
            <div className='flex items-center gap-2 mt-5'>
                {room.players.length < room.maxPlayers ? (
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
            <Button onClick={onClickReveal} disabled={room.players.length < room.maxPlayers} className='font-semibold py-2 px-6 rounded text-lg my-6 transition-all duration-200'>
                Reveal Your Secrets
            </Button>

            <PlayersList />
        </div>
    );
};
