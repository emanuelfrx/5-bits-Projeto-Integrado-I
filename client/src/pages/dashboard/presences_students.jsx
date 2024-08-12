import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useParams } from "react-router-dom";
import ModalClass from "../../components/admin/ModalClass";
import { useState } from "react";

function PresenceStudents() {

    const { idevent, idclass } = useParams()

    const getStudents = async () => {
        return makeRequest.post("/students/class", { eventid: idevent, idclass: idclass }).then((res) => {
            return res.data
        })
    }

    const { isLoading, error, data: students, refetch } = useQuery({
        queryKey: ["students"],
        queryFn: getStudents,
    })

    const handleChange = (idstudent) => {
        makeRequest.post("students/checkpresence",  { idstudent: idstudent, idclass: idclass }).then((res) => {
            refetch()
        })
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

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto lg:min-w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="w-dull text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nome do Aluno
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Presença
                                </th>
                            </tr>
                        </thead>
                        <tbody>{
                            error
                                ? console.log("Something is wrong")
                                : isLoading
                                    ? <tr><th>Loading</th></tr>
                                    : students.map((student) => (
                                        <tr key={student.idstudent}>
                                            <th>
                                                {student.name}
                                            </th>
                                            <th>
                                                <input type="checkbox" value="1" onChange={() => handleChange(student.idstudent)} checked={student.idpresence == null ? false: true} />
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

export default PresenceStudents;