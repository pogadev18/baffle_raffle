import { protectedProcedure, publicProcedure, router } from '../trpc';
import { createGameSchema } from '@/root/schema/game.schema';

export const gameRouter = router({
  create: protectedProcedure.input(createGameSchema).mutation(async ({ ctx, input }) => {
    // TODO: add additional checks for protectedProcedure -> only a few walletAddress can have access to the game creation API
    // TODO: or create another middleware that checks if the walletAddress is an admin one
    return ctx.prisma.game.create({
      data: { ...input },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany();
  }),
});
