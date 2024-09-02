import { User, LogOutIcon, CalendarDays, Home, PlusCircle, PlusIcon, Menu, BookOpenCheck } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import guy from "../../assets/random_guy.jpg"
import LogoVite from "../../assets/vite.svg"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from "axios";

//template imports

import Sidebar from "../../components/template/partials/Sidebar"
import Header from "../../components/template/partials/Header"
import FilterButton from "../../components/template/components/DropdownFilter"
import Datepicker from "../../components/template/components/Datepicker"

const HomeMonitor = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { currentMonitor } = useContext(AuthContext)

    const queryCLient = new QueryClient()

    //const navigate = useNavigate()

    const handleLogout = async () => {
        const res = await axios.post("http://localhost:8800/api/auth/logout", {}, {
            withCredentials: true,
            credentials: "include",
        })
        localStorage.removeItem("monitor")
        window.location.reload()
    }

    return (
        <QueryClientProvider client={queryCLient}>
            <div className="flex h-screen overflow-hidden">

                {/* Sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                    {/*  Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} props={currentMonitor}/>

                    <main className="grow">
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                            {/* Dashboard actions */}
                            <div className="sm:flex sm:justify-between sm:items-center mb-8">

                                {/* Left: Title */}
                                <div className="mb-4 sm:mb-0">
                                    <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
                                </div>

                            </div>

                            {/* Cards */}
                            <div className="grid gap-6">
                                <Outlet></Outlet>
                            </div>

                        </div>
                    </main>

                </div>
            </div>
        </QueryClientProvider>
    )
}

export default HomeMonitor;