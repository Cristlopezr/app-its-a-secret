import { useGameStore } from '@/app/store/store';
import { IconName, icons } from '@/lib/constants';
import { Cat } from 'lucide-react';
import React from 'react';

export const PlayersList = () => {
    const room = useGameStore(state => state.room);
    return (
        <ul>
            {room.players.map(({ id, username, icon, color }) => (
                <li key={id} className='flex items-center gap-3'>
                    {icons[icon as IconName]}
                    <p>{username}</p>
                </li>
            ))}
        </ul>
    );
};
