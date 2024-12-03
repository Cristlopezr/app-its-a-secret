'use client';

import { Scope, useGameStore, useUiStore } from '@/app/store/store';
import { Button } from '@/components/ui';
import { socket } from '@/lib/socket';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const CreateRoom = () => {
    const router = useRouter();
    const setSinglePlayer = useGameStore(state => state.setSinglePlayer);
    const setRoom = useGameStore(state => state.setRoom);
    const [isLoading, setIsLoading] = useState(false);
    const setNotification = useUiStore(state => state.setNotification);
    const notifications = useUiStore(state => state.notifications);
    const clearNotifications = useUiStore(state => state.clearNotifications);

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
        setIsLoading(true);
        clearNotifications();
        //If response is a success whe go to another page, no need to handle success
        socket.timeout(5000).emit('create-room', (err: { message: string }) => {
            if (err) {
                setNotification(Scope.CreateRoom, 'An error has occurred, please try again later.');
            }
            setIsLoading(false);
        });
    };

    return (
        <div>
            <p className='mb-2'>Create a Room</p>
            <Button className='w-full' disabled={isLoading} onClick={onCreateRoom}>
                {isLoading ? (
                    <>
                        <span className='mr-4'>Loading...</span>
                        <LoaderCircle className='animate-spin' />
                    </>
                ) : (
                    'Create room'
                )}
            </Button>
            <p className='text-destructive font-semibold pt-2'>{notifications?.createRoom}</p>
        </div>
    );
};
