import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { KeySquare , Trash2, Plus } from "lucide-react"

export default function ModalMonitor(props) {

    const getAuthorizedMonitors = async () => {
        return makeRequest.get("/admins/monitors/"+props.evidenceEvent).then((res) => {
            return res.data
        })
    }

    const { isLoading, error, data: monitors, refetch } = useQuery({
        queryKey: ["monitors"],
        queryFn: getAuthorizedMonitors,
    })

    const authorize = async (idadmin) => {
        //post is better
        return makeRequest.post("/admins/authmonitor", { idadmin: idadmin, idevent: props.evidenceEvent}).then((res) => {
            refetch()
            return res.data
        })
    }

    useEffect(() => {
        refetch()
    }, [props.setShowModalMonitor])



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
                                {props.evidenceEventName}
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
                            Lista de Monitores
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
                                                                    Monitor</th>
                                                                <th scope="col" className="px-6 py-3 text-end text-sm">
                                                                    Autorização</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                error
                                                                    ? console.log("Something is wrong")
                                                                    : isLoading
                                                                        ? <tr><th>Loading</th></tr>
                                                                        : monitors.map((monitor) => (
                                                                            <tr className="" key={monitor.idadmin}>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                                    {monitor.name}</td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-nowrap text-end justify-end text-sm font-medium">
                                                                                    <button onClick={() => { authorize(monitor.idadmin) }} className="flex justify-end text-secondary gap-x-1 bg-fuchsia-500 hover:bg-fuchsia-400 p-2 rounded-lg"><KeySquare  /><>{monitor.idauthorization_event == null ? "Autorizar": "Desautorizar"}</></button>
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
                                onClick={() => { props.setShowModalMonitor(false) }}
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