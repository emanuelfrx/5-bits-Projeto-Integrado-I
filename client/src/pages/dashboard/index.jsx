import Calendar from "../../components/admin/Calendar";
import CarouselEvents from "../../components/admin/CarouselEvents";
import DatePicker from "react-flatpickr";
import UsersTableDashboard from "../../components/admin/TableUsersDashboard";
import { Button, Timeline } from "flowbite-react";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

function HomeIndex() {

    const getInfochart = async () => {
        return await makeRequest.get("events/infochartdashboard").then((res) => {
            return res.data
        })
    }

    const { isLoading, error, data: info } = useQuery({
        queryKey: ["infochart"],
        queryFn: getInfochart,
    })

    const { currentUser } = useContext(AuthContext)

    return (
        <div className="mx-auto flex-col w-full pt-2">
            {/* Dashboard actions */}
            <div className="sm:flex flex-col sm:justify-between mt-3" >

                {/* Left: Title */}
                < div className="mb-3 sm:mb-1" >
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Olá, {currentUser.name}!</h1>
                </div >
                < div className="mb-3 sm:mb-1" >
                    <h1 className="text-xl md:text-2xl dark:text-gray-100 font-semibold flex gap-2">Aqui vão algumas Informações sobre o evento <p className="text-primary-500">{error || isLoading ? "" : info.title}</p></h1>
                </div >

            </div >
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 lg:col-span-4 rounded-lg overflow-hidden w-full grid grid-cols-4 gap-4">
                    <div className="col-span-2 lg:col-span-1 flex items-center p-4 text-gray-700 dark:text-gray-200  border border-gray-500 dark:bg-slate-800  rounded-lg shadow-lg">
                        <div className="p-5 mr-4 text-primary-600 bg-primary-100 rounded-full">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-xl font-bold ">
                                Inscritos
                            </p>
                        </div>
                        <p className="text-3xl font-bold text-secondary-500 flex w-full items-center ">
                            <div className="mx-auto">{error ? console.log("Something is wrong") : isLoading ? <>Loading</> : info.num_students}</div>
                        </p>
                    </div>
                    <div className="col-span-2 lg:col-span-1 flex items-center p-4 text-gray-700 dark:text-gray-200  border border-gray-500 dark:bg-slate-800  rounded-lg shadow-lg">
                        <div className="p-5 mr-4 text-primary-600 bg-primary-100 rounded-full">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-xl font-bold ">
                                Atividades Cadastradas
                            </p>
                        </div>
                        <p className="text-3xl font-bold text-secondary-500 flex w-full items-center ">
                            <div className="mx-auto">{error ? console.log("Something is wrong") : isLoading ? <>Loading</> : info.num_lectures}</div>
                        </p>
                    </div>
                    <div className="col-span-2 lg:col-span-1 flex items-center p-4 text-gray-700 dark:text-gray-200  border border-gray-500 dark:bg-slate-800  rounded-lg shadow-lg">
                        <div className="p-5 mr-4 text-primary-600 bg-primary-100 rounded-full">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-xl font-bold ">
                                Presenças Registradas
                            </p>
                        </div>
                        <p className="text-3xl font-bold text-secondary-500 flex w-full items-center ">
                            <div className="mx-auto">{error ? console.log("Something is wrong") : isLoading ? <>Loading</> : info.tot_events}</div>
                        </p>
                    </div>
                    <div className="col-span-2 lg:col-span-1 flex items-center p-4 text-gray-700 dark:text-gray-200  border border-gray-500 dark:bg-slate-800  rounded-lg shadow-lg">
                        <div
                            className="p-5 mr-4 text-primary-600 bg-primary-100 rounded-full">
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" >
                                <circle cx="12" cy="8" r="7"></circle>
                                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-xl font-bold ">
                                Certificados Emitidos
                            </p>
                        </div>
                        <p className="text-3xl font-bold text-secondary-500 flex w-full items-center ">
                            <div className="mx-auto">{error ? console.log("Something is wrong") : isLoading ? <>Loading</> : info.tot_events}</div>
                        </p>
                    </div>
                </div>
                <div className="col-span-4 sm:flex flex-col sm:justify-between mt-3" >

                    {/* Left: Title */}
                    < div className="mb-3 sm:mb-1" >
                        <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold flex  gap-2">Sobre o <div className="text-primary-500">{error || isLoading ? "" : info.title}</div></h1>
                    </div >

                </div >
                <div className="col-span-4 lg:col-span-2 rounded-lg overflow-hidden shadow-lg"><CarouselEvents /></div>
                <div className="col-span-4 lg:col-span-2 bg-[#E2E8F0] dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg flex p-3">
                    <Calendar className="m-auto bg-white dark:bg-slate-800 " ></Calendar>
                    <div className="p-3">
                        <Timeline>
                            <Timeline.Item>
                                <Timeline.Point />
                                <Timeline.Content>
                                    <Timeline.Time>February 2022</Timeline.Time>
                                    <Timeline.Title>Application UI code in Tailwind CSS</Timeline.Title>
                                    <Timeline.Body>
                                        Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order
                                        E-commerce & Marketing pages.
                                    </Timeline.Body>
                                </Timeline.Content>
                            </Timeline.Item>
                            <Timeline.Item>
                                <Timeline.Point />
                                <Timeline.Content>
                                    <Timeline.Time>March 2022</Timeline.Time>
                                    <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
                                    <Timeline.Body>
                                        All of the pages and
                                    </Timeline.Body>
                                </Timeline.Content>
                            </Timeline.Item>
                        </Timeline>
                    </div>
                </div>
                <div className="col-span-4 sm:flex flex-col sm:justify-between mt-3" >

                    {/* Left: Title */}
                    < div className="mb-3 sm:mb-1" >
                        <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold flex  gap-2">Histórico de Eventos</h1>
                    </div >

                </div >
                <div className="col-span-4 lg:col-span-4 bg-[#E2E8F0] dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg"><UsersTableDashboard></UsersTableDashboard></div>

            </div>
        </div>
    )
}

export default HomeIndex;