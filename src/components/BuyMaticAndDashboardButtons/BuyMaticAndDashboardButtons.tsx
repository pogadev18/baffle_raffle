import { FaRegUser } from 'react-icons/fa';
import { useRouter } from 'next/router';

const BuyMaticAndDashboardButtons = () => {
  const { push } = useRouter();

  return (
    <section className="flex items-center gap-4">
      <button className="rounded-lg bg-main-yellow py-2 px-6 text-lg font-medium text-black transition-colors hover:bg-main-yellow-hover">
        Buy Matic
      </button>
      <button
        onClick={() => push('/user')}
        className="rounded-full bg-main-yellow p-3 text-black transition-colors hover:bg-main-yellow-hover"
      >
        <FaRegUser size="20px" />
      </button>
    </section>
  );
};

export default BuyMaticAndDashboardButtons;
