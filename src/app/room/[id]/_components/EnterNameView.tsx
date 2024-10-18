import { enterNameViewSchema } from '@/app/schemas/schemas';
import { useGameStore } from '@/app/store/store';
import { Button } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    socketId?: string;
    code: string;
    setShowRoomView: (state: boolean) => void;
    setSocketId: (socketId: string) => void;
}

export const EnterNameView = ({ socketId, code, setShowRoomView, setSocketId }: Props) => {
    const setSinglePlayer = useGameStore(state => state.setSinglePlayer);
    const singlePlayer = useGameStore(state => state.singlePlayer);

    const form = useForm<z.infer<typeof enterNameViewSchema>>({
        resolver: zodResolver(enterNameViewSchema),
        defaultValues: {
            username: '',
        },
    });

    const onSubmit = (values: { username: string }) => {
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
