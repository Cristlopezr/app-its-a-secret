import { useGameStore } from '@/app/store/store';
import { Cat } from 'lucide-react';
import React from 'react';

export const PlayersList = () => {
    const room = useGameStore(state => state.room);
    return (
        <ul>
            {room.players.map(player => (
                <li key={player.id} className='flex items-center gap-3'>
                    <Cat className='text-indigo-600' />
                    <p>{player.username}</p>
                </li>
            ))}
        </ul>
    );
};
