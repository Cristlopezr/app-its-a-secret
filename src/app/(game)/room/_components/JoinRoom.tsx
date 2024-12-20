'use client';

import { socket } from '@/lib/socket';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { EnterCodeForm } from './EnterCodeForm';
import { useGameStore, useUiStore } from '@/app/store/store';

export const JoinRoom = () => {
    const router = useRouter();
    const setSinglePlayer = useGameStore(state => state.setSinglePlayer);
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const setRoom = useGameStore(state => state.setRoom);
    const notifications = useUiStore(state => state.notifications);

    useEffect(() => {
        socket.on('correct-code', payload => {
            setSinglePlayer({
                ...singlePlayer,
                ...payload.player,
            });
            setRoom(payload.room);
            router.push(`/room/${payload.room.id}`);
        });

        return () => {
            socket.off('correct-code');
        };
    }, []);
    return (
        <div>
            <p className='mb-2'>Join a Room</p>
            <EnterCodeForm />
            <p className='text-destructive font-semibold pt-2'>{notifications?.joinRoom}</p>
        </div>
    );
};
