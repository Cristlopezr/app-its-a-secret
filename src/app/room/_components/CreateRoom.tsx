'use client';

import { useGameStore } from '@/app/store/store';
import { Button } from '@/components/ui';
import { socket } from '@/lib/socket';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const CreateRoom = () => {
    const router = useRouter();
    const setSinglePlayer = useGameStore(state => state.setSinglePlayer);
    const setRoom = useGameStore(state => state.setRoom);

    useEffect(() => {
        socket.on('room-created', payload => {
            setSinglePlayer(payload.player);
            setRoom(payload.room);
            router.push(`/room/${payload.room.id}`);
        });

        return () => {
            socket.off('room-created');
        };
    }, []);

    const onCreateRoom = () => {
        socket.emit('create-room');
    };

    return (
        <div>
            <p className='mb-2'>Create a Room</p>
            <Button className='w-full' onClick={onCreateRoom}>
                Create room
            </Button>
        </div>
    );
};
