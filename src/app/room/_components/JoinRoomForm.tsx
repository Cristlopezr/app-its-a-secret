'use client';

import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EnterCodeForm } from './EnterCodeForm';
import { useGameStore } from '@/app/store/store';
import { joinFormSchema } from '@/app/schemas/schemas';

export const JoinRoomForm = () => {
    const router = useRouter();
    const setSinglePlayer = useGameStore(state => state.setSinglePlayer);

    const form = useForm<z.infer<typeof joinFormSchema>>({
        resolver: zodResolver(joinFormSchema),
        defaultValues: {
            code: '',
        },
    });

    useEffect(() => {
        socket.on('correct-code', payload => {
            setSinglePlayer({
                id: socket.id!,
                role: 'Player',
                username: '',
            });
            sessionStorage.setItem('id', socket.id!);
            sessionStorage.setItem('code', payload.code);
            router.push(`/room/${payload.roomId}`);
        });

        return () => {
            socket.off('correct-code');
        };
    }, []);

    const onSubmit = (values: { code: string }) => {
        const { code } = values;
        socket.emit('enter-code', { code });
    };

    return <EnterCodeForm form={form} onSubmit={onSubmit} />;
};
