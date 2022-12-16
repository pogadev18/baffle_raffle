import { useState } from 'react';
import { GameInfo } from "@/root/constants";
import Image from "next/image";

import styles from './Game.module.scss';

interface IGameProps {
  gameInfo: GameInfo;
}

const Game = ({gameInfo}: IGameProps) => {
  const {ticketPrice, totalSum, bigPrize, winners} = gameInfo;
  const [ticketsValue, setTicketsValue] = useState(1);

  return (
    <div className='gameCard pt-10 pb-5 rounded-3xl shadow-2xl text-center'>
      <div className='imageWrapper mb-3'>
        <Image className='m-auto' priority src='/matic_logo.png' alt='Matic Logo' width={135} height={135}/>
      </div>
      <div className='info text-white'>
        <p className='font-extrabold uppercase text-xl'>Win<br/> {totalSum} matic</p>
        <p className='uppercase font-semibold text-sm'>Ticket Price {ticketPrice} Matic</p>
        <p className='font-extrabold text-base my-3'>Grand Prize {bigPrize} <span className='uppercase'>matic</span></p>
        <p className='font-medium text-xl font-extrabold'>{winners}</p>
        <p className='font-medium'>guaranteed winners</p>
      </div>
      <div className='text-left mt-7 px-4'>
        <p className='text-subtle-gray text-sm mb-3'>Select Ticket Amount</p>
        <div className='range'>
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
            className="w-full h-3 bg-white rounded-lg appearance-none cursor-pointer"/>
        </div>
        <div className='buyButtons flex justify-between mt-5'>
          <button type='button' disabled={ticketsValue === 0}
                  className='disabled:text-subtle-gray transition-colors hover:text-main-yellow text-white text-main-blue uppercase text-xs font-bold'>
            Buy <span className='text-white'>{ticketsValue}</span> {ticketsValue === 1 ? 'ticket' : 'tickets'}
          </button>
          <button type='button' className='hover:text-main-yellow transition-colors text-white text-main-blue uppercase text-xs font-bold'>More tickets</button>
        </div>
      </div>
      <hr className={styles.separator}/>
      <div className='shareAndOpenButtons text-right px-4'>
        <button type='button' className='hover:text-main-yellow transition-colors text-white text-main-blue uppercase text-xs font-bold mr-5'>Share</button>
        <button type='button' className='hover:text-main-yellow transition-colors text-white text-main-blue uppercase text-xs font-bold'>Open</button>
      </div>
    </div>
  );
};

export default Game;