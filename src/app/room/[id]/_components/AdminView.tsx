import { useGameStore } from '@/app/store/store';
import { Button } from '@/components/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Cat, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const MAX_PLAYERS = 4;

export const AdminView = () => {
    const room = useGameStore(state => state.room);
    const [playersLeft, setPlayersLeft] = useState(4);

    useEffect(() => {
        if (room.players) {
            setPlayersLeft(MAX_PLAYERS - room.players.length);
        }
        return () => {};
    }, [room.players]);

    const onClickReveal = () => {
        console.log('Clicked');
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-8'>
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
            {room.players.length < 4 && (
                <div className='flex items-center gap-2 mt-5'>
                    <div>{playersLeft} Players left</div>
                    <LoaderCircle className='animate-spin' />
                </div>
            )}
            {room.players.length < 4 && (
                <Button
                    onClick={onClickReveal}
                    disabled={room.players.length < 4}
                    className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded text-lg my-6 transition-all duration-200'
                >
                    Reveal Your Secrets
                </Button>
            )}
            {playersLeft >= 4 && <div className='text-xl font-semibold my-6 text-indigo-600 animate-pulse'>Waiting for players to reveal their secrets...</div>}

            {/* Hacer que el icono sea random */}
            <ul className='w-full max-w-2xl bg-white shadow-md rounded-lg p-4 mb-6'>
                {room.players.map(player => (
                    <li key={player.id} className='text-base mb-2 flex items-center gap-2 text-gray-700'>
                        <Cat className='text-indigo-600' />
                        {player.username}
                    </li>
                ))}
            </ul>

            {/* Esto deberia verse cuando esten todos los secretos listos */}
            <Button disabled={room.players.length >= 4} className='bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded text-xl transition-all duration-200'>
                Start Game
            </Button>
        </div>
    );
};
