import { useGameStore } from '@/app/store/store';
import { ColorName, colorVariants, IconName, icons } from '@/lib/constants';
import React from 'react';

interface Props {
    sortedByScores?: boolean;
}

export const PlayersList = ({ sortedByScores }: Props) => {
    const room = useGameStore(state => state.room);
    return (
        <ul className='flex flex-col gap-5'>
            {sortedByScores
                ? room.players
                      .sort((a, b) => b.score - a.score)
                      .map(({ id, username, icon, color }) => (
                          <li key={id} className='flex items-center gap-3'>
                              {icons[icon as IconName]({ color: colorVariants[color as ColorName].color })}
                              <p className='font-semibold text-xl' style={{ color: colorVariants[color as ColorName].color }}>
                                  {username}
                              </p>
                          </li>
                      ))
                : room.players.map(({ id, username, icon, color }) => (
                      <li key={id} className='flex items-center gap-3'>
                          {icons[icon as IconName]({ color: colorVariants[color as ColorName].color })}
                          <p className='font-semibold text-xl' style={{ color: colorVariants[color as ColorName].color }}>
                              {username}
                          </p>
                      </li>
                  ))}
        </ul>
    );
};
