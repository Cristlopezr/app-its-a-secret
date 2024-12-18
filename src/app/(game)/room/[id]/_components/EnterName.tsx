import { SocketResponse } from '@/app/interfaces';
import { EnterNameViewSchema } from '@/app/schemas';
import { Scope, useGameStore, useUiStore } from '@/app/store/store';
import { Button } from '@/app/_components/ui';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const EnterName = () => {
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const setSinglePlayer = useGameStore(state => state.setSinglePlayer);
    const admin = useGameStore(state => state.room.players).filter(player => player.role === 'Admin')[0];
    const room = useGameStore(state => state.room);
    const setNotification = useUiStore(state => state.setNotification);
    const clearNotifications = useUiStore(state => state.clearNotifications);
    const notifications = useUiStore(state => state.notifications);
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof EnterNameViewSchema>>({
        resolver: zodResolver(EnterNameViewSchema),
        defaultValues: {
            username: '',
        },
    });

    useEffect(() => {
        clearNotifications();
        return () => {};
    }, []);

    const onSubmit = (values: { username: string }) => {
        const { username } = values;
        setIsLoading(true);
        socket.timeout(5000).emit('join-room', { code: room.code, username }, (err: { message: string }, response: SocketResponse) => {
            if (err) {
                setNotification(Scope.EnterName, 'An error has occurred, please try again later.');
            } else {
                if (!response.ok) {
                    setNotification(Scope.EnterName, response.message);
                }
            }
            setIsLoading(false);
        });
        setSinglePlayer({
            ...singlePlayer!,
            username,
        });
    };

    return (
        <div className='flex justify-center pt-40 text-center'>
            <div className='min-w-96 space-y-8'>
                <h1>Enter your username</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='Username' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {isLoading ? (
                            <Button disabled>
                                <span className='mr-4'>Loading...</span>
                                <LoaderCircle className='animate-spin' />
                            </Button>
                        ) : (
                            <>
                                <Button type='submit'>{singlePlayer && singlePlayer.id === admin.id ? 'Create room' : 'Join room'}</Button>
                                <p className='text-destructive font-semibold'>{notifications?.enterName}</p>
                            </>
                        )}
                    </form>
                </Form>
            </div>
        </div>
    );
};
