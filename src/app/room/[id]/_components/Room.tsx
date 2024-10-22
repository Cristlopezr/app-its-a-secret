'use client';

import { socket } from '@/lib/socket';
import { useEffect, useState } from 'react';
import { RoomView } from './RoomView';
import { EnterNameView } from './EnterNameView';
import { useGameStore, useUiStore } from '@/app/store/store';

export const Room = () => {
    const [showRoomView, setShowRoomView] = useState(false);
    const setNotification = useUiStore(state => state.setNotification);
    const setRoom = useGameStore(state => state.setRoom);

    useEffect(() => {
        socket.on('send-notification', payload => {
            setNotification(payload.message);
        });

        socket.on('joined-room', payload => {
            setRoom(payload.room);
            setShowRoomView(true);
        });
        return () => {
            socket.off('send-notification');
            socket.off('joined-room');
        };
    }, []);

    if (!showRoomView) {
        return <EnterNameView />;
    }

    return <RoomView />;
};
