import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  create: protectedProcedure
    .input(z.object({walletAddress: z.string()}))
    .mutation(async ({ctx, input}) => {
      const {walletAddress} = input;
      const {prisma} = ctx;

      const user = await prisma.user.findFirst({
        where: {
          walletAddress,
        },
      })

      if (user) {
        throw new Error("User already exists");
      }

      return await prisma.user.create({
        data: {
          walletAddress
        },
      });
    }),
});
