import z from 'zod';
export const walletAddressSchema = z.object({ walletAddress: z.string() });

export type CreateUser = z.infer<typeof walletAddressSchema>;
