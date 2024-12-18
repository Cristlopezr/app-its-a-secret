import { z } from 'zod';

export const SecretFormSchema = z.object({
    secret: z
        .string()
        .trim()
        .min(10, {
            message: 'Secret must be at least 10 characters.',
        })
        .max(300, {
            message: 'Secret must not be longer than 300 characters.',
        }),
});
