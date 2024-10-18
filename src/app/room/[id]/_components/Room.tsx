'use client';

import { Button } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Room = () => {
    const [socketId, setSocketId] = useState(sessionStorage.getItem('id'));
    const [code, setCode] = useState(sessionStorage.getItem('code'));
    const [cameFromValidPage, setCameFromValidPage] = useState(sessionStorage.getItem('referrer'));
    const [showRoomView, setShowRoomView] = useState(false);

    if (!socketId || !cameFromValidPage || !code) {
        //Cuando se cree el code deberiamos guardar el socketId, camefrom y code en sessionStorage
        return <div>Enter code</div>;
    }

    //Si es que el socketId existe, deberiamos buscar al usuario de alguna manera y no preguntar por el nombre

    if (!showRoomView) {
        return <EnterNameView socketId={socketId} code={code} setShowRoomView={setShowRoomView} />;
    }

    return <RoomView />;
};

const enterNameViewSchema = z.object({
    username: z.string().min(1, 'Invalid username'),
});

interface EnterNameViewProps {
    socketId: string;
    code: string;
    setShowRoomView: (state: boolean) => void;
}

const EnterNameView = ({ socketId, code, setShowRoomView }: EnterNameViewProps) => {
    const form = useForm<z.infer<typeof enterNameViewSchema>>({
        resolver: zodResolver(enterNameViewSchema),
        defaultValues: {
            username: '',
        },
    });

    const onSubmit = (values: { username: string }) => {
        const { username } = values;
        setShowRoomView(true);
        socket.emit('join-room', { socketId: socketId, code, username });
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
