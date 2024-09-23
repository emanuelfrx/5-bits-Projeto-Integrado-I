import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { KeySquare, Trash2, Plus } from "lucide-react"
import { Modal, Table, Badge } from "flowbite-react";

export default function ModalMonitor(props) {

    const getAuthorizedMonitors = async () => {
        return makeRequest.get("/admins/monitors/" + props.evidenceEvent).then((res) => {
            return res.data
        })
    }

    const { isLoading, error, data: monitors, refetch } = useQuery({
        queryKey: ["monitors"],
        queryFn: getAuthorizedMonitors,
    })

    const authorize = async (idadmin) => {
        //post is better
        return makeRequest.post("/admins/authmonitor", { idadmin: idadmin, idevent: props.evidenceEvent }).then((res) => {
            refetch()
            return res.data
        })
    }

    useEffect(() => {
        refetch()
    }, [props.setShowModalMonitor])



    return (
        <Modal show={props.showModalMonitor} onClose={() => props.setShowModalMonitor(false)} className="relative">

            <Modal.Header>{"Monitores: " + props.evidenceEventName}</Modal.Header>
            {/*body*/}
            <Modal.Body>
                <Table hoverable className="border rounded-lg">
                    <Table.Head>
                        <Table.HeadCell>Nome</Table.HeadCell>
                        <Table.HeadCell>Autorização</Table.HeadCell>
                        <Table.HeadCell className="sr-only">Ação</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {
                            error
                                ? console.log("Something is wrong")
                                : isLoading
                                    ? <Table.Row><th>Loading</th></Table.Row>
                                    : monitors.map((monitor) => (
                                        <Table.Row className="" key={monitor.idadmin}>
                                            <Table.Cell className="whitespace-nowrap  flex items-center px-6 py-4 font-medium text-gray-900 dark:text-white" >
                                                <img className="w-10 h-10 rounded-full cover" src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">{monitor.name}</div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className="block">
                                                    <Badge className="justify-center" color={monitor.idauthorization_event == null ? "red" : "success"}>{monitor.idauthorization_event == null ? "Desautorizado" : "Autorizado"}</Badge>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell
                                                className="px-6 py-4 whitespace-nowrap text-end justify-end text-sm font-medium">
                                                <button onClick={() => { authorize(monitor.idadmin) }} className="flex ml-auto text-white gap-x-1 bg-secondary-500 hover:bg-secondary-700 p-2 rounded-lg"><KeySquare /><>{monitor.idauthorization_event == null ? "Autorizar" : "Desautorizar"}</></button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                        }
                    </Table.Body>
                </Table>
            </Modal.Body>
            {/*footer*/}
            <Modal.Footer>
                <button color="gray" className="font-bold text-gray-50 bg-red-500 rounded-xl px-4 py-2" onClick={() => props.setShowModalMonitor(false)}>
                    Fechar
                </button>
            </Modal.Footer>
        </Modal>
    );
}