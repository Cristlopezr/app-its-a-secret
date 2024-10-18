'use client';

import { Button } from '@/components/ui';
import { socket } from '@/lib/socket';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const CreateRoomForm = () => {
    const router = useRouter();

    useEffect(() => {
        socket.on('room-created', payload => {
            sessionStorage.setItem('code', payload.code);
            router.push(`/room/${payload.roomId}`);
        });

        return () => {
            socket.off('room-created');
        };
    }, []);

    const onCreateRoom = () => {
        sessionStorage.setItem('id', socket.id!);
        sessionStorage.setItem('referrer', 'true');
        socket.emit('create-room');
    };

    return <Button onClick={onCreateRoom}>Create room</Button>;
};
