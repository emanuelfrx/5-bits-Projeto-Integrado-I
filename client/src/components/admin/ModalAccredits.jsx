import { useEffect, useState } from "react";
import { Checkbox, Modal, Table } from "flowbite-react";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

export default function ModalAccredits(props) {

    //get students from event

    const getStudents = async () => {
        return await makeRequest.post("/students/list", { eventid: props.idevent }).then((res) => {
            return res.data
        })
    }

    const { isLoading, error, data: students, refetch } = useQuery({
        queryKey: ["students_event" + props.idevent],
        queryFn: getStudents,
    })

    //functions changed accredits

    const handleChange = async (idstudent) => {
        await makeRequest.post("students/changeaccredited", { idstudent: idstudent }).then((res) => {
            refetch()
        })
    }

    useEffect(() => {
        refetch()
    }, [])

    //True Search
    const [search, setSearch] = useState("")

    const changeSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <Modal show={props.showModalAccredits} onClose={() => props.setShowModalAccredits(false)} className="relative">
            <Modal.Header>
                Credenciamento de Estudantes
            </Modal.Header>
            <Modal.Body>
                <div className="overflow-x-auto">

                    <div className="flex items-center justify-start flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
                        <label for="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" onChange={changeSearch} id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600" placeholder="Pesquisar por usuários"></input>
                        </div>
                    </div>

                    <Table hoverable className="table-auto">
                        <Table.Head>
                            <Table.HeadCell>Nome do Aluno</Table.HeadCell>
                            <Table.HeadCell className="flex">
                                <Checkbox className="text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-600 hover:cursor-pointer" />
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
                                            <Table.Row key={student.idstudentlec} className={"bg-white dark:border-gray-700 dark:bg-gray-800" + (student.name.toLowerCase().includes(search.toLowerCase()) ? "" : " collapse")}>
                                                <Table.Cell >
                                                    <div className="whitespace-nowrap flex items-center px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                        <div className="ps-3">
                                                            <div className="text-base font-semibold">{student.name}</div>
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <div className="flex gap-x-2">
                                                        <Checkbox className="text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-600 hover:cursor-pointer" value="1" checked={student.accredited == 0 ? false : true} onChange={() => { handleChange(student.idstudent) }}></Checkbox>
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                            }
                        </Table.Body>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-end pr-4">
                <button color="gray" className="font-bold text-gray-50 bg-primary-500 rounded-xl px-4 py-2" onClick={() => props.setShowModalAccredits(false)}>
                    Salvar
                </button>
            </Modal.Footer>
        </Modal>
    );
}