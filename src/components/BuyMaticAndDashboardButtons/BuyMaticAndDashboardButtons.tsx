import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/router";

const BuyMaticAndDashboardButtons = () => {
  const {push} = useRouter();

  return (
    <section className='flex items-center gap-4'>
      <button
        className='rounded-lg bg-main-yellow text-black font-medium py-2 px-6 text-lg transition-colors hover:bg-main-yellow-hover'
      >
        Buy Matic
      </button>
      <button
        onClick={() => push('/user')}
        className='transition-colors hover:bg-main-yellow-hover text-black bg-main-yellow p-3 rounded-full'>
        <FaRegUser size='20px'/>
      </button>
    </section>
  )
};

export default BuyMaticAndDashboardButtons;