'use client';

import { Button } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createRoomSchema = z.object({
    username: z.string().min(1, 'Invalid username'),
});

export const CreateRoomForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof createRoomSchema>>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            username: '',
        },
    });

    const onSubmit = (values: { username: string }) => {
        sessionStorage.setItem('id', socket.id!);
        sessionStorage.setItem('referrer', 'true');
        const { username } = values;
        socket.emit('create-room', { username });
    };

    useEffect(() => {
        socket.on('room-created', payload => {
            router.push(`/room/${payload.roomId}`);
        });

        return () => {
            socket.off('room-created');
        };
    }, []);

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
