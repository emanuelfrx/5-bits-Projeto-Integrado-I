import { User, LogOutIcon, CalendarDays, Home, PlusCircle, PlusIcon } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import guy from "../../assets/random_guy.jpg"
import LogoVite from "../../assets/vite.svg"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from "axios";

const HomeAdmin = () => {

    const { currentUser } = useContext(AuthContext)

    const queryCLient = new QueryClient()

    //const navigate = useNavigate()

    const handleLogout = async () => {
        const res = await axios.post("http://localhost:8800/api/auth/logout", {}, {
            withCredentials: true,
            credentials: "include",
        })
        localStorage.removeItem("user")
        window.location.reload()
    }

    return (
        <QueryClientProvider client={queryCLient}>
            <div className="flex h-screen font-medium leading-6 antialiased bg-slate-200">
                <aside className="flex w-72 h-screen self-start sticky top-0">
                    <div className="flex flex-col gap-2 self-start sticky m-auto">
                        <div className="rounded-lg border-none bg-neutral-200 gap-3 w-full h-min p-4 flex mt-4">
                            <img src={guy} className="w-14 h-14 rounded-full start" alt="hy"></img>
                            <div className="flex-1 w-full flex flex-col gap-0">
                                <div className="mx-auto my-auto">
                                    <h1 className="justify-content">{currentUser.name}</h1>
                                    <h2 className="text-md text-neutral-600">@{currentUser.username}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 gap-2 pt-5 flex flex-col">
                            <div className="w-full h-min p-3 flex">
                                <Link to="/home/" className="mx-auto flex gap-x-2 items-center">
                                    <Home className="w-10"></Home>
                                    <div className="my-auto text-lg">Home</div>
                                </Link>
                            </div>
                            <div className="w-full h-min p-3 flex">
                                <Link to="/home/profile" className="mx-auto flex gap-x-2 items-center">
                                    <User className="w-10"></User>
                                    <div className="my-auto text-lg">Edit User</div>
                                </Link>
                            </div>
                            <div className="w-full h-min p-3 flex">
                                <Link to="/home/events" className="mx-auto flex gap-x-2 items-center">
                                    <CalendarDays className="w-10"></CalendarDays>
                                    <div className="my-auto text-lg">Events</div>
                                </Link>
                            </div>
                            <div className="w-full h-min p-3 flex">
                                <Link to="/home/addevent" className="mx-auto flex gap-x-2 items-center">
                                    <PlusIcon className="w-10"></PlusIcon>
                                    <div className="my-auto text-lg">Add Event</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>
                <main className="flex-1 flex flex-col h-screen border-l border-neutral-500">
                    <div className="h-20 border-b border-neutral-500 w-full flex justify-between items-center">
                        <div className="h-max ml-2 flex gap-y-2">
                            <img src={LogoVite} className="h-max ml-2" />
                            <div className="my-auto text-2xl font-semibold text-sky-800">FiveBits</div>
                        </div>
                        <button onClick={handleLogout} className="flex mr-4 items-center">
                            <div className="my-auto text-lg font-semibold">SigOut</div>
                            <LogOutIcon className="w-10"></LogOutIcon>
                        </button>
                    </div>
                    <div className="flex flex-1 w-full h-full">

                        <Outlet />

                    </div>
                </main>
            </div>
        </QueryClientProvider>
    )
}

export default HomeAdmin;