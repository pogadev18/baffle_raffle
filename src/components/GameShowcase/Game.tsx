import { useState } from 'react';
import Image from 'next/image';
import type { Game } from '@prisma/client';

import { trpc } from '@/root/utils/trpc';

import styles from './Game.module.scss';
import LoadingSpinner from '@/root/components/LoadingSpinner';

interface IGameProps {
  gameInfo: Game;
}

const Game = ({ gameInfo }: IGameProps) => {
  const { ticketPrice, totalSum, bigPrize, winners } = gameInfo;

  const [ticketsValue, setTicketsValue] = useState(1);
  const trpcUtils = trpc.useContext();

  const { data: userSession } = trpc.auth.getSession.useQuery();
  const { mutateAsync: createUserRecord, isLoading } = trpc.user.create.useMutation({
    onSuccess: () => trpcUtils.user.me.invalidate(),
  });
  const { data: isUserEligibleToPlay } = trpc.user.me.useQuery(
    {
      walletAddress: userSession?.user?.address ?? '',
    },
    {
      enabled: userSession !== null,
    },
  );

  async function createUser() {
    if (!isUserEligibleToPlay) {
      console.log('creating user!!');
      await createUserRecord({ walletAddress: userSession?.user?.address ?? '' });
      await buyTicket();
    } else {
      console.log('just buying a ticket!!');

      await buyTicket();
    }
  }

  async function buyTicket() {
    console.log('buy ticket function!!');
  }

  function renderUI() {
    if (!userSession) {
      return <p className="my-3 text-main-yellow">connect to interact with the game</p>;
    }

    if (isLoading) return <LoadingSpinner />;

    return (
      <>
        <div className="mt-7 px-4 text-left">
          <p className="mb-3 text-sm text-subtle-gray">Select Ticket Amount</p>
          <div className="range">
            <datalist id="tickmarks">
              <option value="0" label="0"></option>
              <option value="10" label="10"></option>
              <option value="20" label="20"></option>
              <option value="30" label="30"></option>
              <option value="40" label="40"></option>
              <option value="50" label="50"></option>
            </datalist>
            <input
              list="tickmarks"
              id="tick"
              name="tick"
              type="range"
              min="0"
              max="50"
              step="1"
              value={ticketsValue}
              onChange={(e) => setTicketsValue(Number(e.target.value))}
              className="h-3 w-full cursor-pointer appearance-none rounded-lg bg-white"
            />
          </div>
          <div className="buyButtons mt-5 flex justify-between">
            <button
              type="button"
              onClick={createUser}
              disabled={ticketsValue === 0}
              className="text-xs font-bold uppercase text-white text-main-blue transition-colors hover:text-main-yellow disabled:text-subtle-gray"
            >
              Buy <span className="text-white">{ticketsValue}</span>{' '}
              {ticketsValue === 1 ? 'ticket' : 'tickets'}
            </button>
            <button
              type="button"
              className="text-xs font-bold uppercase text-white text-main-blue transition-colors hover:text-main-yellow"
            >
              More tickets
            </button>
          </div>
        </div>

        <hr className={styles.separator} />
        <div className="shareAndOpenButtons px-4 text-right">
          <button
            type="button"
            className="mr-5 text-xs font-bold uppercase text-white text-main-blue transition-colors hover:text-main-yellow"
          >
            Share
          </button>
          <button
            type="button"
            className="text-xs font-bold uppercase text-white text-main-blue transition-colors hover:text-main-yellow"
          >
            Open
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="gameCard rounded-3xl pt-10 pb-5 text-center shadow-2xl">
      <div className="imageWrapper mb-3">
        <Image
          className="m-auto"
          priority
          src="/matic_logo.png"
          alt="Matic Logo"
          width={135}
          height={135}
        />
      </div>
      <div className="info text-white">
        <p className="text-xl font-extrabold uppercase">
          Win
          <br /> {totalSum} matic
        </p>
        <p className="text-sm font-semibold uppercase">Ticket Price {ticketPrice} Matic</p>
        <p className="my-3 text-base font-extrabold">
          Grand Prize {bigPrize} <span className="uppercase">matic</span>
        </p>
        <p className="text-xl font-medium font-extrabold">{winners}</p>
        <p className="font-medium">guaranteed winners</p>
      </div>
      {renderUI()}
    </div>
  );
};

export default Game;
