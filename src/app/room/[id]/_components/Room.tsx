'use client';

import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PlayerRoomView } from './PlayerRoomView';
import { EnterNameView } from './EnterNameView';
import { EnterCodeForm } from '../../_components/EnterCodeForm';
import { useGameStore } from '@/app/store/store';
import { joinFormSchema } from '@/app/schemas/schemas';

export const Room = () => {
    const [socketId, setSocketId] = useState(sessionStorage.getItem('id') ?? undefined);
    const [code, setCode] = useState(sessionStorage.getItem('code') ?? undefined);
    const [showRoomView, setShowRoomView] = useState(false);
    const setSinglePlayer = useGameStore(state => state.setSinglePlayer);

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

        socket.on('user-checked', payload => {
            if (payload.isUserInRoom) {
                setSinglePlayer(payload.player);
            }
            setShowRoomView(payload.isUserInRoom);
        });

        socket.on('correct-code', payload => {
            console.log('Correct code');
            sessionStorage.setItem('code', payload.code);
            setCode(payload.code);
        });
        return () => {
            socket.off('user-checked');
            socket.off('correct-code');
        };
    }, [code]);

    useEffect(() => {
        if (!socketId) {
            setCode('');
            sessionStorage.setItem('code', '');
        }
    }, [socketId]);

    const onSubmit = (values: { code: string }) => {
        const { code } = values;
        socket.emit('enter-code', { code });
    };

    if (!code) {
        return <EnterCodeForm form={form} onSubmit={onSubmit} />;
    }

    if (!showRoomView) {
        return <EnterNameView setSocketId={setSocketId} socketId={socketId} code={code} setShowRoomView={setShowRoomView} />;
    }

    return <PlayerRoomView />;
};
