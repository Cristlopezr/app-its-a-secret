import { useGameStore } from '@/app/store/store';
import { ColorName, colorVariants, IconName, icons } from '@/lib/constants';
import React from 'react';

export const PlayersList = () => {
    const room = useGameStore(state => state.room);
    return (
        <ul className='flex flex-col gap-5'>
            {room.players.map(({ id, username, icon, color }) => (
                <li key={id} className='flex items-center gap-3'>
                    {icons[icon as IconName]({ color: colorVariants[color as ColorName].color })}
                    <p style={{ color: colorVariants[color as ColorName].color }}>{username}</p>
                </li>
            ))}
        </ul>
    );
};
