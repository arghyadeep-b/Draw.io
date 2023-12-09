import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Menu from "@/components/Menu";
import Toolbox from "@/components/Toolbox";
import Board from "@/components/Board";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  const router = useRouter();

  useEffect(() => {
    // Redirect to /[username] if a username is available
    if (isSignedIn) {
      router.push(`/${user.username}`);
    }
  }, [isSignedIn, router]);

  return (
    <>
      <Menu />
      <Toolbox />
      <Board />
      <UserButton />
    </>
  )
}
