import Calendar from "../../components/admin/Calendar";
import CarouselEvents from "../../components/admin/CarouselEvents";
import DatePicker from "react-flatpickr";
import UsersTableDashboard from "../../components/admin/TableUsersDashboard";
import { Button, Timeline } from "flowbite-react";

function HomeIndex() {

    //const {isLoading, data: events} = useQuey

    return (
        <div className="mx-auto flex-col w-full">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-2" >

                {/* Left: Title */}
                < div className="mb-2 sm:mb-0" >
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Dashboard</h1>
                </div >

            </div >
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 lg:col-span-4 rounded-lg overflow-hidden w-full grid grid-cols-4 gap-4">
                    <div class="col-span-2 lg:col-span-1 flex items-center p-4 text-gray-700 dark:text-gray-200  bg-gray-100 dark:bg-slate-800  rounded-lg shadow-lg">
                        <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p class="mb-2 text-sm font-medium">
                                Eventos ativos
                            </p>
                            <p class="text-lg font-semibold ">
                                19238
                            </p>
                        </div>
                    </div>
                    <div class="col-span-2 lg:col-span-1 flex items-center p-4 text-gray-700 dark:text-gray-200  bg-gray-100 dark:bg-slate-800  rounded-lg shadow-lg">
                        <div class="p-3 mr-4 text-gray-500 bg-green-100 rounded-full">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p class="mb-2 text-sm font-medium">
                                Eventos Cadastrados
                            </p>
                            <p class="text-lg font-semibold ">
                                120
                            </p>
                        </div>
                    </div>
                    <div class="col-span-2 lg:col-span-1 flex items-center p-4 text-gray-700 dark:text-gray-200  bg-gray-100 dark:bg-slate-800  rounded-lg shadow-lg">
                        <div class="p-3 mr-4 text-red-500 bg-red-100 rounded-full">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p class="mb-2 text-sm font-medium">
                                Participantes de Eventos
                            </p>
                            <p class="text-lg font-semibold ">
                                6389
                            </p>
                        </div>
                    </div>
                    <div class="col-span-2 lg:col-span-1 flex items-center p-4 text-gray-700 dark:text-gray-200  bg-gray-100 dark:bg-slate-800  rounded-lg shadow-lg">
                        <div
                            class="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" >
                                <circle cx="12" cy="8" r="7"></circle>
                                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                            </svg>
                        </div>
                        <div>
                            <p class="mb-2 text-sm font-medium">
                                Certificados Gerados
                            </p>
                            <p class="text-lg font-semibold ">
                                828
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 lg:col-span-2 rounded-lg overflow-hidden shadow-lg"><CarouselEvents /></div>
                <div className="col-span-4 lg:col-span-2 bg-gray-100 dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg flex p-3">
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
                <div className="col-span-4 lg:col-span-4 bg-gray-100 dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg"><UsersTableDashboard></UsersTableDashboard></div>

            </div>
        </div>
    )
}

export default HomeIndex;