import { protectedProcedure, publicProcedure, router } from '../trpc';
import { createGameSchema } from '@/root/schema/game.schema';

export const gameRouter = router({
  create: protectedProcedure.input(createGameSchema).mutation(async ({ ctx, input }) => {
    return ctx.prisma.game.create({
      data: { ...input },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany();
  }),
});
