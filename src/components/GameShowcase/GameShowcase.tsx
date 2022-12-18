import Game from './Game';

// import { games } from '@/root/constants';

import styles from './GameShowcase.module.scss';
import { trpc } from '@/root/utils/trpc';
import LoadingSpinner from '@/root/components/LoadingSpinner';

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
