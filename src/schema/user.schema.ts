import z from 'zod';
export const createUserSchema = z.object({ walletAddress: z.string() });

export type CreateUser = z.infer<typeof createUserSchema>;
