import { protectedProcedure, publicProcedure, router } from '../trpc';
import { walletAddressSchema } from '@/root/schema/user.schema';

export const userRouter = router({
  me: publicProcedure.input(walletAddressSchema).query(async ({ ctx, input }) => {
    const { walletAddress } = input;
    const { prisma } = ctx;

    /*
     - if this query returns data, it means that the user is in DB and he can play games
    */
    return await prisma.user.findFirst({
      where: {
        id: walletAddress,
      },
    });
  }),
  create: protectedProcedure.input(walletAddressSchema).mutation(async ({ ctx, input }) => {
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
