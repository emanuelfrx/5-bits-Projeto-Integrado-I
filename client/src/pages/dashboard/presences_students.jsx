import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useParams } from "react-router-dom";
import ModalClass from "../../components/admin/ModalClass";
import { useEffect, useState } from "react";
import { Checkbox, Table } from "flowbite-react";
import { Upload } from "lucide-react";

function PresenceStudents() {

    const { idlecture, idclass } = useParams()

    const getClass = async () => {
        return await makeRequest.get("/classes/" + idclass).then((res) => {
            console.log(res.data)
            return res.data
        })
    }

    const { isLoading_class, error_class, data: class_info } = useQuery({
        queryKey: ["getclass" + idclass],
        queryFn: getClass,
    })

    //lectureid

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

    // Import of Events

    const importStudents = async () => {
        await makeRequest.post("studentslec/importstudents", { idlecture: idlecture}).then((res) => {
            refetch()
            setChangeData(changeData != null ? !changeData : true)
        })
    }

    useEffect(()=>{
        if(changeData != null){
            handleChangeSearch()
        }
    }, [changeData])

    return (

        <div className="lg:max-w-5xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8" >

                {/* Left: Title */}
                < div className="mb-4 sm:mb-0" >
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">...</h1>
                </div >

            </div >

            <div className="flex w-full h-full items-center p-2 bg-white dark:bg-slate-800 rounded-lg">

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
                                <input type="text" id="search_students" onChange={()=>handleChangeSearch()} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar"></input>
                            </div>
                            <div>
                                <div className="relative ps-3">
                                    <button onClick={() => importStudents()} className="bg-violet-700 hover:bg-violet-500 p-2 font-medium rounded-lg gap-x-2 flex" ><Upload></Upload>Importar Do Evento</button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Nome do Aluno</Table.HeadCell>
                                    <Table.HeadCell>Email</Table.HeadCell>
                                    <Table.HeadCell>
                                        <Checkbox className="text-green-500 focus:ring-green-500 dark:focus:ring-green-600 hover:cursor-pointer" onChange={handleMarkAll} />
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
                                        */: defineSearch().map((student) => (
                                                    <Table.Row key={student.idstudentlec} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                        <Table.Cell className="whitespace-nowrap flex items-center px-6 py-4 font-medium text-gray-900 dark:text-white" >
                                                            <div className="ps-3">
                                                                <div className="text-base font-semibold">{student.name}</div>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell>{student.email}</Table.Cell>
                                                        <Table.Cell className="flex gap-x-2">
                                                            <Checkbox className="text-green-500 focus:ring-green-500 dark:focus:ring-green-600 hover:cursor-pointer" value="1" onChange={() => { handleChange(student.idstudentlec) }} checked={student.idpresence == null ? false : true}></Checkbox>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PresenceStudents;

/* <input type="checkbox" value="1" onChange={() => handleChange(student.idstudent)} checked={student.idpresence == null ? false : true} /> 

<Checkbox  value="1" onChange={() => handleChange(student.idstudent)} checked={student.idpresence == null ? false : true}></Checkbox>*/