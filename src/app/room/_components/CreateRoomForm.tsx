'use client';

import { useGameStore } from '@/app/store/store';
import { Button } from '@/components/ui';
import { socket } from '@/lib/socket';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const CreateRoomForm = () => {
    const router = useRouter();
    const setSinglePlayer = useGameStore(state => state.setSinglePlayer);

    useEffect(() => {
        socket.on('room-created', payload => {
            setSinglePlayer({
                id: socket.id!,
                role: 'Admin',
                username: '',
            });
            sessionStorage.setItem('id', socket.id!);
            sessionStorage.setItem('code', payload.code);
            router.push(`/room/${payload.roomId}`);
        });

        return () => {
            socket.off('room-created');
        };
    }, []);

    const onCreateRoom = () => {
        socket.emit('create-room');
    };

    return <Button onClick={onCreateRoom}>Create room</Button>;
};
