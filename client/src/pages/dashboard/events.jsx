import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Post } from "../../components/post/Post";
import Modal from "../../components/test/Modal";
import { useEffect, useState } from "react";

function Events() {

    const { isLoading, error, data} = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            return makeRequest.get("/events").then((res) => {
                return res.data
            })
        }
    })

    const [showModal, setShowModal] = useState(false);
    const [evidenceEvent, setEvidenceEvent] = useState(null)

    return (
        <div className="flex w-full h-full items-center">

            { showModal ? <Modal setShowModal={setShowModal} evidenceEvent={evidenceEvent}></Modal> : null}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        : data.map((event) => (<Post showModal={showModal} setShowModal={setShowModal} setEvidenceEvent={setEvidenceEvent} event={event} key={event.idevent}/> )
                            )}</tbody>
                </table>
            </div>

        </div>
    )
}

export default Events;