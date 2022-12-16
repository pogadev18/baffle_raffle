import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import { useConnect, useSignMessage } from "wagmi";
import { signIn, SignInResponse, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const WalletConnect = () => {
  const {connectAsync} = useConnect();
  const {signMessageAsync} = useSignMessage();
  const {requestChallengeAsync} = useAuthRequestChallengeEvm();
  const {push} = useRouter();

  const {data: sessionData} = useSession();

  const handleAuth = async () => {
    try {
      const {account, chain} = await connectAsync({connector: new MetaMaskConnector()});
      const {message} = await requestChallengeAsync({address: account, chainId: chain.id});
      const signature = await signMessageAsync({message});

      const {url} = await signIn('moralis-auth', {message, signature, redirect: false, callbackUrl: '/user'});
      await push(url)
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div>

      <button
        className='rounded-lg bg-main-yellow text-black font-medium py-2 px-6 text-lg transition-colors hover:bg-main-yellow-hover'
        onClick={handleAuth}
      >
        Connect Wallet
      </button>
    </div>

  );
};

export default WalletConnect;