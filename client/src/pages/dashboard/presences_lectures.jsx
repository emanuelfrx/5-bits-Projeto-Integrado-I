import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useParams } from "react-router-dom";
import ModalClass from "../../components/admin/ModalClass";
import { useState } from "react";

function PresenceLectures() {

    const { idevent } = useParams()

    const getLectures = async () => {
        return makeRequest.post("/lectures/list", { eventid: idevent }).then((res) => {
            return res.data
        })
    }

    const { isLoading, error, data: lectures, refetch } = useQuery({
        queryKey: ["lectures"],
        queryFn: getLectures,
    })

    const [showModal, setShowModal] = useState(false);
    const [evidenceLecture, setEvidenceLecture] = useState(false);
    const [evidenceLectureName, setEvidenceLectureName] = useState(false);

    return (

        <div className="lg:max-w-5xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8" >

                {/* Left: Title */}
                < div className="mb-4 sm:mb-0" >
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Presença - Nome do Evento</h1>
                </div >

            </div >

            <div className="flex w-full h-full items-center">

                {showModal ? <ModalClass idevent={idevent} setShowModal={setShowModal} evidenceLecture={evidenceLecture} evidenceLectureName={evidenceLectureName}></ModalClass> : null}

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto lg:min-w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="w-dull text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Atividade
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>{
                            error
                                ? console.log("Something is wrong")
                                : isLoading
                                    ? <tr><th>Loading</th></tr>
                                    : lectures.map((lecture) => (
                                        <tr key={lecture.idlecture}>
                                            <th>
                                                {lecture.title}
                                            </th>
                                            <th>
                                                <button
                                                    type="button"
                                                    onClick={() => { setShowModal(true); setEvidenceLecture(lecture.idlecture); setEvidenceLectureName(lecture.title) }}
                                                >Aulas</button>
                                            </th>
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

export default PresenceLectures;