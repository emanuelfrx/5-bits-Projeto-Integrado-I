import { useQuery } from "@tanstack/react-query"
import { Table } from "flowbite-react"
import { makeRequest } from "../../axios"

export default function UsersTableDashboard() {

    const { isLoading, error, data } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            return makeRequest.get("/events").then((res) => {
                return res.data
            })
        }
    })

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
            <div className="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-gray-100 dark:bg-slate-800">
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
                                        <Table.Row key={event.idevent} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap  flex items-center px-6 py-4 font-medium text-gray-900 dark:text-white" >
                                                <img class="w-10 h-10 rounded-full" src={"../../assets/upload/" + event.img_event}></img>
                                                <div class="ps-3">
                                                    <div class="text-base font-semibold">{event.title}</div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>Nome do admin</Table.Cell>
                                            <Table.Cell className="px-6 py-4">
                                                <div class="flex items-center">
                                                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Ativo
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    Edit
                                                </a>
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