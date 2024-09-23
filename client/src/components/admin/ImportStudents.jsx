import { useEffect, useState } from "react";
import { Checkbox, Modal, Table } from "flowbite-react";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

export default function ImportStudents(props) {

    //get students from event

    const getStudents = async () => {
        return await makeRequest.post("/students/list", { eventid: props.idevent }).then((res) => {
            return res.data
        })
    }

    const { isLoading, error, data: students, refetch } = useQuery({
        queryKey: ["students_event" + props.idevent+"_"+props.idlecture],
        queryFn: getStudents,
    })

    //functions to add-remove student

    const handleChange = async (idstudent) => {
        await makeRequest.post("students/changelecture", { idstudent: idstudent, idlecture: props.idlecture }).then((res) => {
            refetch()
        })
    }

    useEffect(() => {
        refetch()
    }, [])


    return (
        <Modal show={props.showImportStudents} onClose={() => props.setShowImportStudents(false)} className="relative">
            <Modal.Header>
                Importar Estudantes do Evento
            </Modal.Header>
            <Modal.Body>
                <div className="overflow-x-auto">
                    <Table hoverable className="table-auto">
                        <Table.Head>
                            <Table.HeadCell>Nome do Aluno</Table.HeadCell>
                            <Table.HeadCell className="flex">
                                <Checkbox className="invisible text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-600 hover:cursor-pointer" />
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                error
                                    ? console.log("Something is wrong")
                                    : isLoading
                                        ? <>Loading</>/*
                                    : currentRecords == null
                                        ? ""
                                        */: students.map((student) => (
                                            <Table.Row key={student.idstudent} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell >
                                                    <div className="whitespace-nowrap flex items-center px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                        <div className="ps-3">
                                                            <div className="text-base font-semibold">{student.name}</div>
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <div className="flex gap-x-2">
                                                        <Checkbox className="text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-600 hover:cursor-pointer" value="1" checked={ student.idstudentlec == null ? false : true} onChange={() => {handleChange(student.idstudent)}}></Checkbox>
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                            }
                        </Table.Body>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer className="justify-end">
                <button color="gray" className="font-bold text-gray-50 bg-primary-500 rounded-xl px-4 py-2" onClick={() => props.setShowImportStudents(false)}>
                    Salvar
                </button>
            </Modal.Footer>
        </Modal>
    );
}