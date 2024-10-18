'use client';

import { Button } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const JoinFormSchema = z.object({
    code: z.string().trim().min(8, 'Invalid code').max(8, 'Invalid code'),
    username: z.string().min(1, 'Invalid username'),
});

export const JoinRoomForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof JoinFormSchema>>({
        resolver: zodResolver(JoinFormSchema),
        defaultValues: {
            code: '',
            username: '',
        },
    });

    useEffect(() => {
        socket.on('correct-code', payload => {
            router.push(`/room/${payload.roomId}`);
        });

        return () => {
            socket.off('correct-code');
        };
    }, []);

    const onSubmit = (values: { code: string; username: string }) => {
        const { username, code } = values;
        //guardar socketId en el sessionStorage
        socket.emit('enter-code', { code, username });
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
};
