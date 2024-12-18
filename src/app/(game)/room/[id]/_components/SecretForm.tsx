import { SecretFormSchema } from '@/app/schemas';
import { useGameStore } from '@/app/store/store';
import { Button } from '@/app/_components/ui';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/_components/ui/form';
import { Textarea } from '@/app/_components/ui/textarea';
import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const SecretForm = () => {
    const room = useGameStore(state => state.room);
    const form = useForm<z.infer<typeof SecretFormSchema>>({
        resolver: zodResolver(SecretFormSchema),
        defaultValues: {
            secret: '',
        },
    });

    function onSubmit(values: z.infer<typeof SecretFormSchema>) {
        socket.emit('submit-secret', { code: room.code, secret: values.secret });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col items-center space-y-6'>
                <FormField
                    control={form.control}
                    name='secret'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <Textarea placeholder='Write your secret' className='resize-none' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='w-fit' type='submit'>
                    Submit your secret
                </Button>
            </form>
        </Form>
    );
};
