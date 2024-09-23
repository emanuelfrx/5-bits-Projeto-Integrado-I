import { useQuery } from "@tanstack/react-query"
import { Table } from "flowbite-react"
import { makeRequest } from "../../axios"
import { ArrowBigRight } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function UsersTableDashboard() {

    const { isLoading, error, data } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            return makeRequest.get("/events").then((res) => {
                return res.data
            })
        }
    })

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

    const [search, setSearch] = useState("")

    const changeSearch = (e) => {
        setSearch(e.target.value)
    }

    const navigate = useNavigate()

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
            <div className="flex items-center justify-start flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-gray-100 dark:bg-slate-800">
                <label for="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" name="search" id="table-search-users" onChange={changeSearch} className="block p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar"></input>
                </div>
            </div>
            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Titulo do Evento</Table.HeadCell>
                        <Table.HeadCell>Admin Responsavel</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Acoes</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            error
                                ? console.log("Something is wrong")
                                : isLoading
                                    ? <>Loading</>/*
                                    : currentRecords == null
                                        ? ""
                                        */: data.map((event) => (
                                        <Table.Row key={event.idevent} className={"bg-white dark:border-gray-700 dark:bg-gray-800" + (event.title.toLowerCase().includes(search.toLowerCase()) ? "" : " collapse")}>
                                            <Table.Cell className="whitespace-nowrap  flex items-center px-6 py-4 font-medium text-gray-900 dark:text-white" >
                                                <img class="w-10 h-10 rounded-full" src={"../../assets/upload/" + event.img_event}></img>
                                                <div class="ps-3">
                                                    <div class="text-base font-semibold">{event.title}</div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>{event.name}</Table.Cell>
                                            <Table.Cell className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className={"h-2.5 w-2.5 rounded-full me-2 " + (getStatus(event.date_ini, event.date_end) == "Ativo" ? "bg-primary-500" : getStatus(event.date_ini, event.date_end) == "Pendente" ? "bg-slate-500" : "bg-orange-400")}></div> {getStatus(event.date_ini, event.date_end)}
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <button onClick={()=>{navigate("/home/events_lectures/"+event.idevent)}} className=" flex gapy-2 rounded-lg items-end bg-primary-500 hover:bg-primary-700 px-3 py-1 text-white ">
                                                <ArrowBigRight size={20}></ArrowBigRight>Acessar
                                                </button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                        }
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}