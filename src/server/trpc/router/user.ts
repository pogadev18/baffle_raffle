import { protectedProcedure, router } from '../trpc';
import { createUserSchema } from '@/root/schema/user.schema';

export const userRouter = router({
  create: protectedProcedure.input(createUserSchema).mutation(async ({ ctx, input }) => {
    const { walletAddress } = input;
    const { prisma } = ctx;

    const userExists = await prisma.user.findFirst({
      where: {
        id: walletAddress,
      },
    });

    if (userExists) {
      throw new Error('User already exists');
    }

    return await prisma.user.create({
      data: {
        id: walletAddress,
      },
    });
  }),
});
