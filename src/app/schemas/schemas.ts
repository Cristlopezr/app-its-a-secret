import { z } from 'zod';

export const JoinFormSchema = z.object({
    code: z.string().trim().min(8, 'Invalid code').max(8, 'Invalid code'),
});

export const EnterNameViewSchema = z.object({
    username: z.string().trim().min(1, 'Username must be at least 1 character.'),
});

export const SecretFormSchema = z.object({
    secret: z
        .string()
        .trim()
        .min(10, {
            message: 'Secret must be at least 10 characters.',
        })
        .max(160, {
            message: 'Secret must not be longer than 160 characters.',
        }),
});
