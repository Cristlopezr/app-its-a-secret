'use client';

import { socket } from '@/lib/socket';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { EnterCodeForm } from './EnterCodeForm';
import { useGameStore, useUiStore } from '@/app/store/store';

export const JoinRoomForm = () => {
    const router = useRouter();
    const setSinglePlayer = useGameStore(state => state.setSinglePlayer);
    const setRoom = useGameStore(state => state.setRoom);
    const notification = useUiStore(state => state.notification);
    const setNotification = useUiStore(state => state.setNotification);

    useEffect(() => {
        socket.on('correct-code', payload => {
            setSinglePlayer(payload.player);
            setRoom(payload.room);
            router.push(`/room/${payload.room.id}`);
        });

        socket.on('send-notification', payload => {
            setNotification(payload.message);
        });

        return () => {
            socket.off('correct-code');
        };
    }, []);
    return (
        <div>
            {notification}
            <EnterCodeForm />
        </div>
    );
};
