import { z } from 'zod';

export const JoinFormSchema = z.object({
    code: z.string().trim().min(8, 'Invalid code').max(8, 'Invalid code'),
});
