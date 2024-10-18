import { z } from 'zod';

export const joinFormSchema = z.object({
    code: z.string().trim().min(8, 'Invalid code').max(8, 'Invalid code'),
});

export const enterNameViewSchema = z.object({
    username: z.string().min(1, 'Invalid username'),
});
