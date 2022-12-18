import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

import GameForm from '@/root/components/GameForm';

import { authOptions } from '@/root/pages/api/auth/[...nextauth]';
import { trpc } from '@/root/utils/trpc';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const User = () => {
  const { mutateAsync: createUserRecord, isLoading } = trpc.user.create.useMutation();
  const { data: userData } = trpc.auth.getSession.useQuery();

  const { data: sessionData } = useSession();
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  async function createUser() {
    if (!sessionData) return;
    await createUserRecord({ walletAddress: sessionData.user?.address ?? '' });
  }

  return (
    <>
      <Head>
        <title>Baffle Raffle | Dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.address}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <section className="text-center text-white">
        <button className="my-3 rounded bg-main-yellow p-3 text-black" onClick={createUser}>
          I want to play
        </button>
        {isLoading && <p>saving user...</p>}

        <GameForm />

        <section className="mt-24 text-white">
          <button onClick={() => signOut()}>sign out</button>
        </section>
      </section>
    </>
  );
};

export default User;
