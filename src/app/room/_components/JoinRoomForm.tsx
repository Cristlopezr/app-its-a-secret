'use client';

import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EnterCodeForm } from './EnterCodeForm';
import { useGameStore, useUiStore } from '@/app/store/store';
import { joinFormSchema } from '@/app/schemas/schemas';

export const JoinRoomForm = () => {
    const router = useRouter();
    const setSinglePlayer = useGameStore(state => state.setSinglePlayer);
    const setRoom = useGameStore(state => state.setRoom);
    const notification = useUiStore(state => state.notification);
    const setNotification = useUiStore(state => state.setNotification);

    const form = useForm<z.infer<typeof joinFormSchema>>({
        resolver: zodResolver(joinFormSchema),
        defaultValues: {
            code: '',
        },
    });

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
            <EnterCodeForm />;
        </div>
    );
};
