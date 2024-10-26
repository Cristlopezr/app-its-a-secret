import { EnterNameViewSchema } from '@/app/schemas/schemas';
import { useGameStore } from '@/app/store/store';
import { Button } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const EnterNameView = () => {
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const setSinglePlayer = useGameStore(state => state.setSinglePlayer);
    const room = useGameStore(state => state.room);
    const form = useForm<z.infer<typeof EnterNameViewSchema>>({
        resolver: zodResolver(EnterNameViewSchema),
        defaultValues: {
            username: '',
        },
    });

    const onSubmit = (values: { username: string }) => {
        const { username } = values;
        socket.emit('join-room', { code: room.code, username });
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
                                        <Input placeholder='username' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit'>{singlePlayer?.role === 'Admin' ? 'Create room' : 'Join room'}</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
