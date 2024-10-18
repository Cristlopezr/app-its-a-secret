'use client';

import { Button } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const JoinFormSchema = z.object({
    code: z.string().trim().min(8, 'Invalid code').max(8, 'Invalid code'),
});

export const Room = () => {
    const [socketId, setSocketId] = useState(sessionStorage.getItem('id') ?? undefined);
    const [code, setCode] = useState(sessionStorage.getItem('code') ?? undefined);
    const [showRoomView, setShowRoomView] = useState(false);

    const form = useForm<z.infer<typeof JoinFormSchema>>({
        resolver: zodResolver(JoinFormSchema),
        defaultValues: {
            code: '',
        },
    });

    useEffect(() => {
        if (code) {
            socket.emit('check-user-in-room', { socketId, code });
        }

        socket.on('user-checked', payload => {
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

    //First time entering
    if (!code) {
        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='code'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>8 digit code</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit'>Join room</Button>
                </form>
            </Form>
        );
    }

    //Entered from validPage or pressed f5
    if (!showRoomView) {
        return <EnterNameView setSocketId={setSocketId} socketId={socketId} code={code} setShowRoomView={setShowRoomView} />;
    }

    return <RoomView />;
};

const enterNameViewSchema = z.object({
    username: z.string().min(1, 'Invalid username'),
});

interface EnterNameViewProps {
    socketId?: string;
    code: string;
    setShowRoomView: (state: boolean) => void;
    setSocketId: (socketId: string) => void;
}

const EnterNameView = ({ socketId, code, setShowRoomView, setSocketId }: EnterNameViewProps) => {
    const form = useForm<z.infer<typeof enterNameViewSchema>>({
        resolver: zodResolver(enterNameViewSchema),
        defaultValues: {
            username: '',
        },
    });

    const onSubmit = (values: { username: string }) => {
        const { username } = values;
        setShowRoomView(true);
        setSocketId(socketId ? socketId : socket.id!);
        sessionStorage.setItem('id', socketId ? socketId : socket.id!);
        socket.emit('join-room', { socketId: socketId ?? socket.id, code, username });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Create room</Button>
            </form>
        </Form>
    );
};

const RoomView = () => {
    const [players, setPlayers] = useState();
    const [roomStatus, setRoomStatus] = useState();

    useEffect(() => {
        socket.on('joined-room', payload => {
            console.log('AQUI');
            setPlayers(payload.players);
            setRoomStatus(payload.roomStatus);
        });
        return () => {
            socket.off('joined-room');
        };
    }, []);

    return (
        <div>
            players: {JSON.stringify(players, null, 2)}
            room Status : {roomStatus}
        </div>
    );
};
