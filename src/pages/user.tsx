import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

import { authOptions } from "@/root/pages/api/auth/[...nextauth]";
import { trpc } from "@/root/utils/trpc";
import React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

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
      session: await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  }
}

const User = () => {
  const {mutateAsync: createUserRecord, isLoading} = trpc.user.create.useMutation()
  const {data: userData} = trpc.auth.getSession.useQuery()

  const {data: sessionData} = useSession();
  const {data: secretMessage} = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    {enabled: sessionData?.user !== undefined},
  );
  async function createUser() {
    if (!sessionData) return;
    await createUserRecord({walletAddress: sessionData.user?.address ?? ''})
  }



  return (
    <>
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.address}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <h1>User page</h1>
      <button onClick={createUser}>SAVE me</button>
      {isLoading && <p>saving user...</p>}
    </>
  )
}

export default User;