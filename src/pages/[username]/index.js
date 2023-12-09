import Menu from "@/components/Menu";
import Toolbox from "@/components/Toolbox";
import Board from "@/components/Board";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
    const { isSignedIn, user, isLoaded } = useUser();
    return (
        <>
            {console.log("user", user)}
            <Menu />
            <Toolbox />
            <Board />
            <UserButton />
        </>
    )
}
