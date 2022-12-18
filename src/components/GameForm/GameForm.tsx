import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateGame, createGameSchema } from '@/root/schema/game.schema';
import { trpc } from '@/root/utils/trpc';

const GameForm = () => {
  const { mutateAsync: createGame, isLoading } = trpc.game.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGame>({
    resolver: zodResolver(createGameSchema),
  });

  function onSubmit(values: CreateGame) {
    createGame(values);
  }

  return (
    <div className="game-form my-5 mx-auto w-96">
      <form onSubmit={handleSubmit(onSubmit)} className="text-left">
        <div className="mb-6">
          <label
            htmlFor="ticketPrice"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Ticket Price
          </label>
          <input
            type="number – number input control"
            id="ticketPrice"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            {...register('ticketPrice')}
          />
        </div>
        {errors.ticketPrice && (
          <p className="font-bold text-red-600">{errors.ticketPrice.message}</p>
        )}

        <div className="mb-6">
          <label
            htmlFor="totalSum"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Total Sum
          </label>
          <input
            type="number"
            id="totalSum"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            {...register('totalSum')}
          />
        </div>
        {errors.totalSum && <p className="font-bold text-red-600">{errors.totalSum.message}</p>}

        <div className="mb-6">
          <label
            htmlFor="bigPrize"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Big Prize
          </label>
          <input
            type="number"
            id="bigPrize"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            {...register('bigPrize')}
          />
        </div>
        {errors.bigPrize && <p className="font-bold text-red-600">{errors.bigPrize.message}</p>}

        <div className="mb-6">
          <label
            htmlFor="winners"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Winners
          </label>
          <input
            type="number"
            id="winners"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            {...register('winners')}
          />
        </div>
        {errors.winners && <p className="font-bold text-red-600">{errors.winners.message}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default GameForm;
