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
