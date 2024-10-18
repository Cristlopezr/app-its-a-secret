import { Button } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface Props {
    form: UseFormReturn<
        {
            code: string;
        },
        any,
        undefined
    >;
    onSubmit: (values: { code: string }) => void;
}

export const EnterCodeForm = ({ form, onSubmit }: Props) => {
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
};
