'use client';

import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RoomView } from './RoomView';
import { EnterNameView } from './EnterNameView';
import { EnterCodeForm } from '../../_components/EnterCodeForm';
import { useGameStore, useUiStore } from '@/app/store/store';
import { joinFormSchema } from '@/app/schemas/schemas';
import { useRouter } from 'next/navigation';

export const Room = () => {
    const [socketId, setSocketId] = useState(sessionStorage.getItem('id') ?? undefined);
    const [code, setCode] = useState(sessionStorage.getItem('code') ?? undefined);
    const [showRoomView, setShowRoomView] = useState(false);
    const setSinglePlayer = useGameStore(state => state.setSinglePlayer);
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const notification = useUiStore(state => state.notification);
    const setNotification = useUiStore(state => state.setNotification);
    const router = useRouter();
    console.log(socketId);
    const form = useForm<z.infer<typeof joinFormSchema>>({
        resolver: zodResolver(joinFormSchema),
        defaultValues: {
            code: '',
        },
    });

    useEffect(() => {
        if (code) {
            socket.emit('check-user-in-room', { socketId, code });
        }

        socket.on('send-notification', payload => {
            setNotification(payload.message);
        });

        socket.on('user-checked', payload => {
            if (payload.isUserInRoom) {
                setSinglePlayer(payload.player);
            }
            setShowRoomView(payload.isUserInRoom);
        });

        socket.on('correct-code', payload => {
            console.log('Correct code');
            sessionStorage.setItem('code', payload.code);
            setNotification('');
            setCode(payload.code);
            router.push(`/room/${payload.roomId}`);
        });
        return () => {
            socket.off('user-checked');
            socket.off('correct-code');
            socket.off('send-notification');
        };
    }, [code]);

    useEffect(() => {
        if (!socketId) {
            setCode('');
            sessionStorage.setItem('code', '');
        }
    }, [socketId]);

    const onSubmitCode = (values: { code: string }) => {
        socket.emit('enter-code', { code: values.code });
    };

    const onSubmitName = (values: { username: string }) => {
        const { username } = values;
        setShowRoomView(true);
        setSinglePlayer({
            ...singlePlayer!,
            username,
        });
        setSocketId(socketId ? socketId : socket.id!);
        sessionStorage.setItem('id', socketId ? socketId : socket.id!);
        socket.emit('join-room', { socketId: socketId ?? socket.id, code, username });
    };

    if (!code || notification) {
        return (
            <div>
                {notification ? <div>{notification}</div> : null}
                <EnterCodeForm form={form} onSubmit={onSubmitCode} />
            </div>
        );
    }

    if (!showRoomView) {
        return <EnterNameView onSubmit={onSubmitName} />;
    }

    return <RoomView />;
};
