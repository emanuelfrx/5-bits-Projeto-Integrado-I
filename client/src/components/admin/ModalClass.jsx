import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";

export default function ModalClass(props) {

    const getClasses = async () => {
        return await makeRequest.get("/classes/list/" + props.evidenceLecture).then((res) => {
            return res.data
        })
    }

    const { isLoading, error, data: classes, refetch } = useQuery({
        queryKey: ["class"],
        queryFn: getClasses,
    })

    useEffect(() => {
        refetch()
    }, [props.setShowModal])

     const navigate = useNavigate()

    const handleNavigate = (clas) =>{
        navigate("../presences_students/"
            + props.idevent
            +"/"+clas
        )
    }

    return (
        <div className="relative">
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-slate-700 outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Aulas : {props.evidenceLectureName}
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
                        <div className="p-2 lg:p-3">
                            
                            {/* Cards */}
                            < div className="grid gap-6" >
                                <div className="card overflow-hidden rounded-sm border">
                                    <div>
                                        <div className="overflow-x-auto">
                                            <div className="min-w-full inline-block align-middle">
                                                <div className="overflow-hidden">
                                                    <table className="min-w-full divide-y">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="px-6 py-3 text-start text-sm">
                                                                    Aula</th>
                                                                <th scope="col" className="px-6 py-3 text-end text-sm">
                                                                    Ações</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                error
                                                                    ? console.log("Something is wrong")
                                                                    : isLoading
                                                                        ? <tr><th>Loading</th></tr>
                                                                        : classes.map((clas) => (
                                                                            <tr className="" key={clas.idclass}>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                                    {clas.title}</td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                                    <button onClick={() => handleNavigate(clas.idclass)} className="text-secondary bg-sky-500 hover:bg-sky-400 p-1 rounded-lg mr-2" href="#">Gerir Presenças</button>
                                                                                    
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => { props.setShowModal(false) }}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    );
}