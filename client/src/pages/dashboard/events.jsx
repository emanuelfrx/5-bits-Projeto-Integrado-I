import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { RowEvent } from "../../components/admin/RowEvent";
import ModalLecture from "../../components/admin/ModalLecture";
import ModalMonitor from "../../components/admin/ModalMonitor";
import { useEffect, useState } from "react";

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

                {showModal ? <ModalLecture setShowModal={setShowModal} evidenceEvent={evidenceEvent} evidenceEventName={evidenceEventName}></ModalLecture> : null}
                {showModalMonitor ? <ModalMonitor setShowModalMonitor={setShowModalMonitor} evidenceEvent={evidenceEvent} evidenceEventName={evidenceEventName}></ModalMonitor> : null}

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
                                    : data.map((event) => (<RowEvent setShowModalMonitor={setShowModalMonitor} showModal={showModal} setShowModal={setShowModal} setEvidenceEvent={setEvidenceEvent} setEvidenceEventName={setEvidenceEventName}  event={event} key={event.idevent} />))
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Events;