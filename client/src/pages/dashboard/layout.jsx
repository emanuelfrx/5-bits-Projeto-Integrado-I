import { User, LogOutIcon, CalendarDays, Home, PlusCircle, PlusIcon, Menu, BookOpenCheck } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import guy from "../../assets/random_guy.jpg"
import LogoVite from "../../assets/vite.svg"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from "axios";

//template imports

import SidebarAdmin from "../../components/template/partials/SidebarAdmin"
import Header from "../../components/template/partials/Header"
import FilterButton from "../../components/template/components/DropdownFilter"
import Datepicker from "../../components/template/components/Datepicker"

const HomeAdmin = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { currentUser } = useContext(AuthContext)

    const queryCLient = new QueryClient()

    //const navigate = useNavigate()
    /*
    const handleLogout = async () => {
        const res = await axios.post("http://localhost:8800/api/auth/logout", {}, {
            withCredentials: true,
            credentials: "include",
        })
        localStorage.removeItem("user")
        window.location.reload()
    }*/

    return (
        <QueryClientProvider client={queryCLient}>
            <div className="flex h-screen overflow-hidden">

                {/* Sidebar */}
                <SidebarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                    {/*  Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} props={currentUser} />

                    <main className="grow bg-[#F1F5F9] dark:bg-slate-900">
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                            <Outlet></Outlet>

                        </div>
                    </main>

                </div>
            </div>
        </QueryClientProvider>
    )
}

export default HomeAdmin;