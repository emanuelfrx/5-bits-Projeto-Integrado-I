import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { RowEvent } from "../../components/admin/RowEvent";
import ModalLecture from "../../components/admin/ModalLecture";
import ModalMonitor from "../../components/admin/ModalMonitor";
import { useEffect, useState } from "react";
//import Pagination from "../../components/admin/Pagination";
import { useNavigate } from "react-router-dom";
import { Pagination } from "flowbite-react";

import UserAvatar from '../../assets/random_guy.jpg';
import { ArrowBigRight } from "lucide-react";

function Events() {

    const { isLoading, error, data } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            return makeRequest.get("/events").then((res) => {
                return res.data
            })
        }
    })

    const [showModal, setShowModal] = useState(false);
    const [showModalMonitor, setShowModalMonitor] = useState(false);
    const [evidenceEvent, setEvidenceEvent] = useState(null)
    const [evidenceEventName, setEvidenceEventName] = useState(null)

    const navigate = useNavigate()

    const handleNavigate = (idevent) => {
        navigate("../events_lectures/" + idevent)
    }

    //Status Events

    const getStatus = (date_ini, date_end) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        if (date_ini > today) {
            return "Pendente"
        } else if (date_ini <= today && today <= date_end) {
            return "Ativo"
        } else {
            return "Finalizado"
        }
    }

    //Pagination

    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page) => setCurrentPage(page);

    return (

        <div className="mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-2 md:mb-3 lg:mb-4" >

                {/* Left: Title */}
                < div className="mb-2 sm:mb-0" >
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Eventos</h1>
                </div >

            </div >

            <div className="flex w-full h-full items-center">

                {showModal ? <ModalLecture setShowModal={setShowModal} evidenceEvent={evidenceEvent} evidenceEventName={evidenceEventName}></ModalLecture> : null}
                {showModalMonitor ? <ModalMonitor setShowModalMonitor={setShowModalMonitor} evidenceEvent={evidenceEvent} evidenceEventName={evidenceEventName}></ModalMonitor> : null}

                <div className="flex flex-col w-full relative overflow-x-auto sm:rounded-lg mx-auto pb-4">
                    <div className="flex items-center justify-start flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4  md:px-6">
                        <label for="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"></input>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 md:px-6 py-4">
                        {error
                            ? console.log("Something is wrong")
                            : isLoading
                                ? <div>Loading</div>
                                : data.map((event) => (
                                    <div onClick={() => handleNavigate(event.idevent)} key={event.idevent} className="bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shadow-md group hover:shadow-lg transition-shadow">

                                        <img src={"../../assets/upload/" + event.img_event} className="w-full h-48 xl:h-72 cover"></img>

                                        <div className="w-full rounded-b lg:rounded-b-none lg:rounded-r p-4 flex-1 flex flex-col leading-normal">
                                            <div className="mb-2">
                                                <div className="flex items-center">
                                                    <div className={"h-2.5 w-2.5 rounded-full me-2 " + (getStatus(event.date_ini, event.date_end) == "Ativo" ? "bg-green-500" : getStatus(event.date_ini, event.date_end) == "Pendente" ? "bg-slate-500" : "bg-orange-400")}></div> {getStatus(event.date_ini, event.date_end)}
                                                </div>
                                                <div className="text-green-900 dark:text-green-100 font-bold text-xl mb-1">{event.title}</div>
                                                <p className="text-gray-700 dark:text-gray-300 text-base">{event.desc}</p>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <img className="w-10 h-10 rounded-full mr-4" src={UserAvatar} alt="Avatar of Jonathan Reinink"></img>
                                                <div className="text-sm">
                                                    <p className="text-gray-900 dark:text-gray-100 leading-none">{event.name}</p>
                                                    <p className="text-gray-600 dark:text-gray-400 text-xs">{event.createdAt.slice(0, 10)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="flex w-full font-medium mx-auto px-2" type="button" onClick={() => handleNavigate(event.idevent)}>
                                            <div className="flex w-full p-2 mb-2 rounded-lg justify-center text-gray-200 bg-green-500 hover:bg-green-700 gap-2">
                                                <ArrowBigRight></ArrowBigRight>
                                                Acessar
                                            </div>
                                        </button>
                                    </div>))
                        }
                    </div>
                    <div className="flex w-full justify-center">
                        <div>
                            <div className="flex overflow-x-auto sm:justify-center">
                                <Pagination
                                    layout="navigation"
                                    currentPage={currentPage}
                                    totalPages={100}
                                    onPageChange={onPageChange}
                                    showIcons
                                    previousLabel="Anterior"
                                    nextLabel="Proximo"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Events;