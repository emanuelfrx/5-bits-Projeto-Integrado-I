import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { NavLink, useNavigate } from "react-router-dom";

function PresenceEvents() {

    const { isLoading, error, data } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            return makeRequest.get("/events").then((res) => {
                return res.data
            })
        }
    })

    const navigate = useNavigate()

    const handleNavigate = (idevent) => {
        navigate("../presences_lectures/"+idevent)
    }

    return (

        <div className="lg:max-w-5xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8" >

                {/* Left: Title */}
                < div className="mb-4 sm:mb-0" >
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Eventos</h1>
                </div >

            </div >

            <div className="flex w-full h-full items-center">

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="w-dull text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Evento
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    TAG
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Descrição
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>{
                            error
                                ? console.log("Something is wrong")
                                : isLoading
                                    ? <tr><th>Loading</th></tr>
                                    : data.map((event) => (
                                        <tr key={event.idevent} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {event.title}
                                            </th>
                                            <td className="px-6 py-4">
                                                {event.tag_link}
                                            </td>
                                            <td className="px-6 py-4">
                                                {event.desc}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => handleNavigate(event.idevent)}
                                                >Ver Atividades</button>
                                            </td>
                                        </tr>
                                    ))
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default PresenceEvents;