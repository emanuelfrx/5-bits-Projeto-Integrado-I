import { useContext, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { makeRequest } from "../../axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs } from "flowbite-react";
import ResgisterStudentAdmin from "../../components/admin/RegisterStudentAdmin";
import ResgisterStudentsListAdmin from "../../components/admin/RegisterStudentsListAdmin";
import { useQuery } from "@tanstack/react-query";

function EventForm2() {

    const { idevent } = useParams()

    const getEventData = async () => {
        return await makeRequest.get("/events/event/" + idevent).then((res) => {
            return res.data
        })
    }

    const { isLoading: isLoading2, error: error2, data: event } = useQuery({
        queryKey: ["getevent" + idevent],
        queryFn: getEventData,
    })

    const navigate = useNavigate()

    const navigatetoNext = async () => {
        navigate("/home/addevent3/" + idevent)
    }

    return (

        <div className="lg:max-w-5xl mx-auto">

            <ToastContainer
                position="bottom-left"
                autoClose={3000}
            />

            {/* Dashboard actions */}
            < div className="sm:flex sm:justify-between sm:items-center mb-8" >

                {/* Left: Title */}
                < div className="mb-4 sm:mb-0" >
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Eventos - Adicionar Participantes</h1>
                </div >

            </div >

            <ol class="items-center w-full p-1 md:p-3 space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse justify-between">
                <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse hover:cursor-pointer">
                    <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        1
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Criar Evento</h3>
                        <p class="text-sm">Adicione os dados do evento</p>
                    </span>
                </li>
                <li class="flex items-center text-secondary-500 dark:text-secondary-500 space-x-2.5 rtl:space-x-reverse hover:cursor-pointer">
                    <span class="flex items-center justify-center w-8 h-8 border border-secontext-secondary-500 rounded-full shrink-0 dark:border-secontext-secondary-500">
                        2
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Adicionar Participantes</h3>
                        <p class="text-sm">Adicione os inscritos do evento</p>
                    </span>
                </li>
                <li onClick={() => navigate("../../../home/addevent3/" + idevent)} class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse hover:cursor-pointer">
                    <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        3
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Adicione Atividades</h3>
                        <p class="text-sm">Liste as atividades do evento</p>
                    </span>
                </li>
            </ol>

            <div className="w-full sm:mx-auto sm:w-full rounded-lg mb-2 shadow-lg bg-[#E2E8F0] dark:bg-slate-800">
                {
                    error2
                        ? console.log("Something is wrong")
                        : isLoading2
                            ? <div>Loading</div>
                            : <Tabs aria-label="Default tabs" variant="fullWidth" >
                                <Tabs.Item title="Registar Inscritos" className="active:bg-red-500">
                                    <ResgisterStudentAdmin event={event} className="" />
                                </Tabs.Item>
                                <Tabs.Item active title="Importar Planilha de Inscritos" >
                                    <ResgisterStudentsListAdmin event={event} className="active:bg-red-500" />
                                </Tabs.Item>
                            </Tabs>
                }
            </div>
            <div className="flex w-full px-2 pb-3 mr-2 justify-end">
                <button onClick={navigatetoNext} className="font-bold text-lg bg-primary-500 hover:bg-primary-700 text-white py-2 px-4 mr-2 rounded-lg">Seguir</button>
            </div>
        </div>
    )
}

export default EventForm2
