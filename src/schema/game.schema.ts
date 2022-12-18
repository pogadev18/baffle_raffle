import z from 'zod';

export const createGameSchema = z.object({
  ticketPrice: z.string(),
  totalSum: z.string(),
  bigPrize: z.string(),
  winners: z.string(),
});

export type CreateGame = z.infer<typeof createGameSchema>;
