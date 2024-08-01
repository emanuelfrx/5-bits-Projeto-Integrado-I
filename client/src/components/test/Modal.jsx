import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { makeRequest } from "../../axios";
import Student from "./Student";

export default function Modal(props) {

    const Runquery = async () => {
        return makeRequest.post("/students/list", { eventid: props.evidenceEvent }).then((res) => {
            console.log(res.data)
            return res.data
        })
    }

    const { isLoading, error, data} = useQuery({
        queryKey: ["students"],
        queryFn: Runquery

    })

    const checkPresence = async (idS) => {
        return makeRequest.post("/students/checkpresence", { studentid: idS }).then((res) => {
            console.log(res.data)
        })
    }

    useEffect(() => {
        Runquery()
    }, [/*props.evidenceEvent,*/ props.setShowModal])

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Lista de Cadastrados
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => props.setShowModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            {data ? data.map((student) => (
                                <Student checkPresence={checkPresence} key={student.idstudent} name={student.name} email={student.email} inivalue={student.presence} idstudent={student.idstudent}/>
                            )): ""}
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => props.setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}