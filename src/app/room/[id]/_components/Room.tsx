'use client';

import { socket } from '@/lib/socket';
import { useEffect, useState } from 'react';
import { RoomView } from '../views/RoomView';
import { EnterNameView } from '../views/EnterNameView';
import { useGameStore } from '@/app/store/store';
import { useRouter } from 'next/navigation';

export const Room = () => {
    const [showRoomView, setShowRoomView] = useState(false);
    const setRoom = useGameStore(state => state.setRoom);
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const router = useRouter();

    useEffect(() => {
        socket.on('joined-room', () => {
            setShowRoomView(true);
        });

        socket.on('update-users-in-room', payload => {
            setRoom(payload.room);
        });
        return () => {
            socket.off('joined-room');
            socket.off('update-users-in-room');
        };
    }, []);

    useEffect(() => {
        // Redirect if there's no player
        if (!singlePlayer) {
            router.push('/');
        }
    }, [singlePlayer, router]);

    if (!singlePlayer) {
        return null; // Prevent rendering if redirecting
    }

    if (!showRoomView) {
        return <EnterNameView />;
    }

    return <RoomView />;
};
