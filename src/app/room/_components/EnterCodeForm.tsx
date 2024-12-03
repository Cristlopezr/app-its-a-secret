import { SocketResponse } from '@/app/interfaces/interfaces';
import { JoinFormSchema } from '@/app/schemas/schemas';
import { Scope, useUiStore } from '@/app/store/store';
import { Button } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { socket } from '@/lib/socket';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const EnterCodeForm = () => {
    const form = useForm<z.infer<typeof JoinFormSchema>>({
        resolver: zodResolver(JoinFormSchema),
        defaultValues: {
            code: '',
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const setNotification = useUiStore(state => state.setNotification);
    const clearNotifications = useUiStore(state => state.clearNotifications);

    const onSubmit = (values: { code: string }) => {
        setIsLoading(true);
        clearNotifications();
        //Callback to handle any errors
        //Response may have an error if room is not found
        socket.timeout(5000).emit('enter-code', { code: values.code }, (err: { message: string }, response: SocketResponse) => {
            console.log({ err, response });
            if (err) {
                setNotification(Scope.JoinRoom, 'An error has occurred, please try again later.');
            } else {
                if (!response.ok) {
                    setNotification(Scope.JoinRoom, response.message);
                }
            }
            setIsLoading(false);
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='code'
                    render={({ field }) => (
                        <FormItem className='mx-auto w-fit'>
                            <FormLabel>8 Digit Code</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={8} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                        <InputOTPSlot index={6} />
                                        <InputOTPSlot index={7} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='w-full' type='submit' disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <span className='mr-4'>Loading...</span>
                            <LoaderCircle className='animate-spin' />
                        </>
                    ) : (
                        'Join room'
                    )}
                </Button>
            </form>
        </Form>
    );
};
