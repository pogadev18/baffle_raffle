import { trpc } from '@/root/utils/trpc';

import Game from './Game';
import LoadingSpinner from '@/root/components/LoadingSpinner';

import styles from './GameShowcase.module.scss';

const GameShowcase = () => {
  const { data: games, isLoading } = trpc.game.getAll.useQuery();

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className={`${styles.gamesShowcase} px-10`}>
      {games?.map((game) => (
        <Game key={game.id} gameInfo={game} />
      ))}
    </section>
  );
};

export default GameShowcase;
