import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import ModalClass from "../../components/admin/ModalClass";
import { useEffect, useState } from "react";
import { Breadcrumb, Checkbox, Table } from "flowbite-react";
import { ArrowLeftFromLine, ArrowRightCircle, Pencil, Settings, Upload } from "lucide-react";
import ModalAddStudent from "../../components/admin/ModalAddStudent";
import ImportStudents from "../../components/admin/ImportStudents";

function PresenceStudents() {

    const { idevent, idlecture, idclass } = useParams()
    //lectureid

    const navigate = useNavigate()

    const [changeData, setChangeData] = useState(null)

    const getStudents = async () => {
        return await makeRequest.post("/studentslec/class", { lectureid: idlecture, idclass: idclass }).then((res) => {
            return res.data
        })
    }

    const { isLoading, error, data: students, refetch } = useQuery({
        queryKey: ["students" + idclass],
        queryFn: getStudents,
    })

    const handleChange = async (idstudent) => {
        await makeRequest.post("studentslec/checkpresence", { idstudent: idstudent, idclass: idclass }).then((res) => {
            refetch()
            setChangeData(changeData != null ? !changeData : true)
        })
    }

    //MarkAll

    const handleMarkAll = async (e) => {

        if (e.target.checked == true) {
            await makeRequest.post("studentslec/checkpresenceall", { lectureid: idlecture, idclass: idclass }).then((res) => {
                refetch()
                setChangeData(changeData != null ? !changeData : true)
            })
        } else if (e.target.checked == false) {
            await makeRequest.post("studentslec/deletepresenceall", { lectureid: idlecture, idclass: idclass }).then((res) => {
                refetch()
                setChangeData(changeData != null ? !changeData : true)
            })
        }
    }

    //  Search

    const [ResultsStudents, setResultsStudents] = useState(students)

    const handleChangeSearch = () => {

        let search = document.getElementById("search_students").value

        const result = students.filter(
            student => {

                if (student.name.toLowerCase().includes(search)) return true

                return false

            }
        )

        setResultsStudents(result)
    }

    const defineSearch = () => {
        if (ResultsStudents != undefined)
            return ResultsStudents
        else
            return students
    }

    useEffect(() => {
        if (changeData != null) {
            handleChangeSearch()
        }
    }, [changeData])

    //Modais

    //True Search
    const [search, setSearch] = useState("")

    const changeSearch = (e) => {
        setSearch(e.target.value)
    }

    const [showModalAddStudent, setShowModalAddStudent] = useState(false);
    const [showImportStudents, setShowImportStudents] = useState(false);

    useEffect(() => {
        refetch()
    }, [showModalAddStudent])

    useEffect(() => {
        refetch()
    }, [showImportStudents])

    return (

        <div className="lg:max-w-5xl mx-auto">
            {/* Dashboard actions */}

            <div className="sm:flex sm:justify-between sm:items-center mb-8" >

                {/* Left: Title */}
                <Breadcrumb aria-label="Default breadcrumb example" className=" dark:text-gray-100 font-bold">
                    <Breadcrumb.Item onClick={() => navigate("../../home/events_lectures/" + idevent)} className="hover:cursor-pointer hover:underline">Voltar ao evento</Breadcrumb.Item>
                    <Breadcrumb.Item>Presenças da Atividade</Breadcrumb.Item>
                </Breadcrumb>

            </div >

            <div className="sm:flex sm:justify-between sm:items-center mb-8" >

                {/* Left: Title */}
                < div className="mb-4 sm:mb-0" >
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Presenças da Atividade</h1>
                </div >

            </div >

            <div className="flex w-full h-full items-center p-2 bg-white dark:bg-slate-800 rounded-lg">

                {/* Modais */}

                <ModalAddStudent showModalAddStudent={showModalAddStudent} idlecture={idlecture} idevent={idevent} setShowModalAddStudent={setShowModalAddStudent}></ModalAddStudent>
                <ImportStudents showImportStudents={showImportStudents} idlecture={idlecture} idevent={idevent} setShowImportStudents={setShowImportStudents}></ImportStudents>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto w-full">

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">

                            <label for="table-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="text" id="search_students" onChange={changeSearch} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar"></input>
                            </div>
                            <div className="flex text-white">
                                <div className="relative ps-3">
                                    <button onClick={() => setShowModalAddStudent(true)} className="bg-secondary-500 hover:bg-secondary-700 p-2 font-medium rounded-lg gap-x-2 flex" ><Pencil></Pencil>Inscrever Aluno</button>
                                </div>
                                <div className="relative ps-3">
                                    <button onClick={() => setShowImportStudents(true)} className="bg-secondary-500 hover:bg-secondary-700 p-2 font-medium rounded-lg gap-x-2 flex" ><Settings></Settings>Gerenciar Participantes</button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <Table className="border-b-2 mb-2">
                                <Table.Head>
                                    <Table.HeadCell>Nome do Aluno</Table.HeadCell>
                                    <Table.HeadCell>Email</Table.HeadCell>
                                    <Table.HeadCell>
                                        <Checkbox className="text-green-500 invisible focus:ring-green-500 dark:focus:ring-green-600 hover:cursor-pointer" onChange={handleMarkAll} />
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
                                                    <Table.Row key={student.idstudentlec} className={"bg-white dark:border-gray-700 dark:bg-gray-800" + (student.name.toLowerCase().includes(search.toLowerCase()) ? "" : " collapse") + (student.idpresence == null ? "" : " bg-primary-200")}>
                                                        <Table.Cell className="whitespace-nowrap flex items-center px-6 py-4 font-medium text-gray-900 dark:text-white" >
                                                            <div className="ps-3">
                                                                <div className="text-base font-semibold">{student.name}</div>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell>{student.email}</Table.Cell>
                                                        <Table.Cell className="flex gap-x-2">
                                                            <Checkbox className="p-3 border border-black text-green-500 focus:ring-green-500 dark:focus:ring-green-600 hover:cursor-pointer" value="1" onChange={() => { handleChange(student.idstudentlec) }} checked={student.idpresence == null ? false : true}></Checkbox>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))
                                    }
                                </Table.Body>
                            </Table>
                            <div className="flex w-full  justify-end mb-2 pr-2">
                                <div className="relative ps-3">
                                    <button onClick={() => navigate("../../home/events_lectures/" + idevent)} className="text-white bg-primary-500 hover:bg-primary-700 p-3 font-lg font-bold rounded-lg gap-x-2 flex" ><ArrowRightCircle></ArrowRightCircle>Voltar ao Evento</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PresenceStudents;