import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import { Modal, Table } from "flowbite-react";
import { CircleCheck } from "lucide-react";

export default function ModalClass(props) {

    const getClasses = async () => {
        return await makeRequest.get("/classes/list/" + props.evidenceLecture).then((res) => {
            return res.data
        })
    }

    const { isLoading, error, data: classes, refetch } = useQuery({
        queryKey: ["class"+props.idlecture],
        queryFn: getClasses,
    })

    useEffect(() => {
        refetch()
    }, [props.showModal])

    const navigate = useNavigate()

    const handleNavigate = (clas) => {
        navigate("../events_students/"
            + props.idevent
            + "/" + props.idlecture
            + "/" + clas
        )
    }

    return (
        <Modal show={props.showModal} onClose={() => props.setShowModal(false)} className="relative">
            <Modal.Header>
                {"Aulas: " + props.evidenceLectureName}
            </Modal.Header>
            <Modal.Body>
                <Table hoverable className="border rounded-lg ">
                    <Table.Head>
                        <Table.HeadCell>Aula</Table.HeadCell>
                        <Table.HeadCell className="sr-only">Ação</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {
                            error
                                ? console.log("Something is wrong")
                                : isLoading
                                    ? <Table.Row><th>Loading</th></Table.Row>
                                    : classes.map((clas) => (
                                        <Table.Row className="" key={clas.idclass}>
                                            <Table.Cell
                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {clas.title}</Table.Cell>
                                            <Table.Cell
                                                className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex justify-end">
                                                <button onClick={() => handleNavigate(clas.idclass)} className="text-white flex p-2 bg-secondary-500 hover:bg-secondary-700 rounded-lg mr-2 gap-x-2" href="#"><CircleCheck ></CircleCheck><>Gerir Presenças</></button>

                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                        }
                    </Table.Body>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <button color="gray" className="font-bold text-gray-50 bg-red-500 rounded-xl px-4 py-2" onClick={() => props.setShowModal(false)}>
                    Fechar
                </button>
            </Modal.Footer>
        </Modal>
    );
}