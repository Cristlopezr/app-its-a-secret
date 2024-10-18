'use client';

import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EnterCodeForm } from './EnterCodeForm';

const JoinFormSchema = z.object({
    code: z.string().trim().min(8, 'Invalid code').max(8, 'Invalid code'),
});

export const JoinRoomForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof JoinFormSchema>>({
        resolver: zodResolver(JoinFormSchema),
        defaultValues: {
            code: '',
        },
    });

    useEffect(() => {
        socket.on('correct-code', payload => {
            sessionStorage.setItem('code', payload.code);
            router.push(`/room/${payload.roomId}`);
        });

        return () => {
            socket.off('correct-code');
        };
    }, []);

    const onSubmit = (values: { code: string }) => {
        const { code } = values;
        sessionStorage.setItem('id', socket.id!);
        sessionStorage.setItem('referrer', 'true');
        socket.emit('enter-code', { code });
    };

    return <EnterCodeForm form={form} onSubmit={onSubmit} />;
};
