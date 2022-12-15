import React from 'react';
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { signIn, SignInResponse, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingSpinner from "@/root/components/LoadingSpinner";

const WalletConnect = () => {
  const {connectAsync} = useConnect();
  const {disconnectAsync} = useDisconnect();
  const {isConnected} = useAccount();
  const {signMessageAsync} = useSignMessage();
  const {requestChallengeAsync} = useAuthRequestChallengeEvm();
  const {push} = useRouter();
  const {status} = useSession()

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    try {
      const {account, chain} = await connectAsync({connector: new MetaMaskConnector()});
      const {message} = await requestChallengeAsync({address: account, chainId: chain.id});
      const signature = await signMessageAsync({message});

      const {url} = await signIn('moralis-auth', {message, signature, redirect: false, callbackUrl: '/'});
      await push(url!)
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <button
      disabled={status === 'loading'}
      className='rounded-lg bg-main-yellow text-black font-medium py-2 px-6 text-lg transition-colors hover:bg-main-yellow-hover'
      onClick={handleAuth}
    >
      {status === 'loading' ? <LoadingSpinner/> : <span>Connect Wallet</span>}
    </button>
  );
};

export default WalletConnect;