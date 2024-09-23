import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge, Breadcrumb, Checkbox, Table } from "flowbite-react";
import { Pencil, Upload } from "lucide-react";

function Certificates() {

    const { idevent, idlecture } = useParams()

    const getCertificates = async () => {
        return await makeRequest.post("/lectures/certificates", { idevent: idevent, idlecture: idlecture }).then((res) => {
            return res.data
        })
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ["certificates" + idlecture],
        queryFn: getCertificates,
    })

    //True Search
    const [search, setSearch] = useState("")

    const changeSearch = (e) => {
        setSearch(e.target.value)
    }

    const navigate = useNavigate()

    return (

        <div className="lg:max-w-5xl mx-auto">

            {/* Left: Title */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8" >
                <Breadcrumb aria-label="Default breadcrumb example" className=" dark:text-gray-100 font-bold">
                    <Breadcrumb.Item onClick={() => navigate("../../home/events_lectures/" + idevent)} className="hover:cursor-pointer hover:underline">Voltar ao evento</Breadcrumb.Item>
                    <Breadcrumb.Item>Certificados</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8" >

                {/* Left: Title */}
                < div className="mb-4 sm:mb-0" >
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Certificados</h1>
                    <h3 className="text-red-500 text-sm">Atenção: Não emitimos certificados, apenas identificamos quando um aluno está elegível a receber um certificado.
                    </h3>
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
                                <input type="text" id="search_students" onChange={changeSearch} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar"></input>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Nome do Aluno</Table.HeadCell>
                                    <Table.HeadCell>Presenças</Table.HeadCell>
                                    <Table.HeadCell>Status</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {
                                        error
                                            ? console.log("Something is wrong")
                                            : isLoading
                                                ? <>Loading</>/*
                                    : currentRecords == null
                                        ? ""
                                        */: data.students.map((student) => (
                                                    <Table.Row key={student.idstudentlec} className={"bg-white dark:border-gray-700 dark:bg-gray-800" + (student.name.toLowerCase().includes(search.toLowerCase()) ? "" : " collapse")}>
                                                        <Table.Cell className="whitespace-nowrap flex items-center px-6 py-4 font-medium text-gray-900 dark:text-white" >
                                                            <div className="ps-3">
                                                                <div className="text-base font-semibold">{student.name}</div>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell className="font-bold">{student.tot_presences}/{data.tot_classes}</Table.Cell>
                                                        <Table.Cell className="font-bold block"><Badge className="justify-center" color={student.tot_presences != data.tot_classes ? "warning" : "success"}>{student.tot_presences != data.tot_classes ? "Não Elegível" : "Elegível"}</Badge></Table.Cell>
                                                    </Table.Row>
                                                ))
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Certificates;