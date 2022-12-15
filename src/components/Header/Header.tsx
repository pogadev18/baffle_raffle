import { useSession } from "next-auth/react"
import { useEffect } from "react";

import Logo from "@/root/components/Logo";
import WalletConnect from "@/root/components/WalletConnect";
import BuyMaticAndDashboardButtons from "@/root/components/BuyMaticAndDashboardButtons";

const Header = () => {
  // const {walletUserInfo} = useWalletUserSession()
  const {data: session, status} = useSession()

  useEffect(() => {
    console.log(status)
  }, [status])

  return (
    <header className='flex gap-3'>
      <section className='flex flex-1 justify-between items-center px-10 py-8 text-white'>
        <section className='logo-section flex items-center gap-4'>
          <Logo width='60' height='60'/>
        </section>

        <section className='connect-button font-bold text-sm'>
          {
            session ?
              <BuyMaticAndDashboardButtons/> :
              <WalletConnect/>
          }
        </section>
      </section>
    </header>
  );
};

export default Header;