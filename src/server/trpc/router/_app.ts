import { router } from '../trpc';
import { authRouter } from './auth';
import { userRouter } from './user';
import { gameRouter } from './game';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  game: gameRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
