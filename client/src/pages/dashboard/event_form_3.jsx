import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { makeRequest } from "../../axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Table, Tabs, Tooltip } from "flowbite-react";
import ResgisterStudentAdmin from "../../components/admin/RegisterStudentAdmin";
import ResgisterStudentsListAdmin from "../../components/admin/RegisterStudentsListAdmin";
import { useQuery } from "@tanstack/react-query";
import { Circle, Info, Pencil, Plus, Trash2 } from "lucide-react";

function EventForm3() {

    const { idevent } = useParams()

    const getLectures = async () => {
        return await makeRequest.post("/lectures/list", { eventid: idevent }).then((res) => {
            if (ResultsLectures != null) setResultsLectures(null)
            return res.data
        })
    }

    const { isLoading, error, data: lectures, refetch } = useQuery({
        queryKey: ["lectures" + idevent],
        queryFn: getLectures,
    })

    const getEventData = async () => {
        return await makeRequest.get("/events/event/" + idevent).then((res) => {
            return res.data
        })
    }

    const { isLoading: isLoading2, error: error2, data: event } = useQuery({
        queryKey: ["getevent" + idevent],
        queryFn: getEventData,
    })

    //Modal

    const [openModal, setOpenModal] = useState(false);

    //CRUD

    const [onEdit, setOnEdit] = useState(null)

    const handleEdit = (lecture) => {
        setOnEdit(lecture)
    }

    const [inputs, setInputs] = useState({
        name: "",
        instructor: "",
        eventid: idevent
    })

    const getClasses = async () => {
        return await makeRequest.get("/classes/list/" + onEdit.idlecture).then((res) => {
            return res.data
        })
    }

    useEffect(() => {
        if (onEdit) {

            const fetchData = async () => {
                const data = await getClasses();
                setClass(data);
            }
            fetchData();

            inputs.name = onEdit.title
            inputs.instructor = onEdit.instructor
        }
    }, [onEdit])

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //Submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (classes.length == 0) {
            toast.error("Adicione ao menos uma aula")
            return
        }

        if (onEdit) {
            await makeRequest.put("/lectures/" + onEdit.idlecture, { inputs, classes }).then(({ data }) => { }).catch(({ data }) => { })
        } else {
            await makeRequest.post("/lectures/", { inputs, classes }).then(({ data }) => { }).catch(({ data }) => { })
        }

        document.getElementById("name").value = "";
        document.getElementById("instructor").value = "";
        inputs.name = ""
        inputs.instructor = ""
        setClass([])

        setOnEdit(null)
        setCont(1)
        document.getElementById("addclass").value = "";
        setNameClass("")
        setOpenModal(false)
        refetch()
        setResultsLectures(undefined)
    }

    //delete

    const handleDelete = async (idlecture) => {

        await makeRequest.delete("/lectures/" + idlecture).then(({ data }) => {

        }).catch(({ data }) => {

        })

        setOnEdit(null)
        refetch()
    }

    //Aulas
    const [nameClass, setNameClass] = useState('')
    const [classes, setClass] = useState([])
    const [cont, setCont] = useState(1)

    const handleAddClass = () => {
        const newList = classes.concat({ title: nameClass, idclass: cont })
        setCont(cont + 1)
        setClass(newList)

        document.getElementById('addclass').value = ""
        setNameClass("")
    }
    const handleChangeClass = (e) => {
        e.preventDefault()
        setNameClass(e.target.value)
    }
    const handleDeleteClass = (idclass) => {
        const newList = classes.filter(obj => {
            return obj.idclass != idclass
        })
        setClass(newList)
    }
    const handleEditClass = (idclass, name_class) => {

        document.getElementById('addclass').value = name_class
        setNameClass(name_class)

        handleDeleteClass(idclass)

    }

    //  Search

    const [ResultsLectures, setResultsLectures] = useState(lectures)

    const handleChangeSearch = (e) => {

        const result = lectures.filter(
            lecture => {

                if (lecture.title.toLowerCase().includes(e.target.value)) return true
                if (lecture.instructor != null)
                    if (lecture.instructor.toLowerCase().includes(e.target.value)) return true

                return false

            }
        )

        setResultsLectures(result)
    }

    const defineSearch = () => {
        if (ResultsLectures != undefined)
            return ResultsLectures
        else
            return lectures
    }

    //Navigate

    const [showModal, setShowModal] = useState(false);
    const [evidenceLecture, setEvidenceLecture] = useState(false);
    const [evidenceLectureName, setEvidenceLectureName] = useState(false);

    const navigate = useNavigate()

    const navigatetoNext = async () => {
        navigate("/home/events_lectures/" + idevent)
    }

    return (

        <div className="lg:max-w-5xl mx-auto">

            <ToastContainer
                position="bottom-left"
                autoClose={3000}
            />

            {/* Dashboard actions */}
            < div className="sm:flex sm:justify-between sm:items-center mb-8" >

                {/* Left: Title */}
                < div className="mb-4 sm:mb-0" >
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Eventos - Adicionar Atividades</h1>
                </div >

            </div >

            <ol class="items-center w-full p-1 md:p-3 space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse justify-between">
                <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse hover:cursor-pointer">
                    <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        1
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Criar Evento</h3>
                        <p class="text-sm">Adicione os dados do evento</p>
                    </span>
                </li>
                <li onClick={() => navigate("../../../home/addevent2/" + idevent)} class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse hover:cursor-pointer">
                    <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        2
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Adicionar Participantes</h3>
                        <p class="text-sm">Adicione os inscritos do evento</p>
                    </span>
                </li>
                <li class="flex items-center text-secondary-500 dark:text-secondary-500 space-x-2.5 rtl:space-x-reverse hover:cursor-pointer">
                    <span class="flex items-center justify-center w-8 h-8 border border-secondary-500 rounded-full shrink-0 dark:border-secondary-500">
                        3
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Adicione Atividades</h3>
                        <p class="text-sm">Liste as atividades do evento</p>
                    </span>
                </li>
            </ol>

            {/* - Modal Add and Edit Lecture - */}

            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>{onEdit != null ? "Editar" : "Adicionar"} Atividade</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <form onSubmit={handleSubmit} className="lg:col-span-2 mb-2 border dark:border-gray-700 rounded-md lg:p-3 p-1 bg-slate-200 dark:bg-slate-900">
                            <h3 className="my-2">Informações Básicas</h3>

                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2 dark:border-gray-200 rounded-xl p-1 lg:p-2">
                                <div className="md:col-span-1">
                                    <label>Nome da Atividade</label>
                                    <input value={inputs.name} onChange={handleChange} type="text" name="name" id="name" className="ring-inset ring-gray-300 h-10 mt-1 rounded px-4 w-full dark:bg-gray-700/60" />
                                </div>
                                <div className="md:col-span-1">
                                    <label>Instrutor</label>
                                    <input value={inputs.instructor} onChange={handleChange} type="text" name="instructor" id="instructor" className="ring-inset ring-gray-300 h-10 mt-1 rounded px-4 w-full dark:bg-gray-700/60" />
                                </div>
                            </div>

                            <h3 className="flex items-center my-2 gap-x-2">Adicione aulas a Atividade<Tooltip content="Exemplo: dia 17/10 14h as 18h"><Info strokeWidth={1.5}></Info></Tooltip></h3>

                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2 dark:border-gray-200  rounded-xl p-1 lg:p-2">
                                <div className="md:col-span-2">
                                    <label>Descreva a aula</label>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <input id="addclass" onChange={handleChangeClass} type="text" className="ring-inset ring-gray-300 flex-1 h-10 rounded px-4 w-full dark:bg-gray-700/60" placeholder="Aula 01 - 16:00 às 18:00" />
                                        <button onClick={handleAddClass} type="button" className="bg-primary-500 hover:bg-primary-700 text-white font-bold p-2 rounded-xl flex items-center"><Plus />Adicionar</button>
                                    </div>
                                </div>
                            </div>

                            <h3 className="flex items-center my-2 gap-x-2">Aulas Adicionadas:</h3>

                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                                {classes.length == 0 ? <>Adicione aulas no campo acima.</>
                                    : classes.map((item) => (
                                        <div key={item.idclass} className="p-2 md:col-span-1  border border-gray-700 dark:border-gray-200  rounded-xl ">
                                            <div className="flex items-center mt-1 gap-x-1">
                                                <input disabled type="text" value={item.title} className="flex-1 h-10 rounded px-4 bg-none w-full text-gray-500 dark:bg-gray-700/60" />
                                                <button onClick={() => { handleEditClass(item.idclass, item.title) }} className="text-white bg-leticia-500 hover:bg-leticia-400 p-1 rounded-xl" href="#"><Pencil /></button>
                                                <button onClick={() => handleDeleteClass(item.idclass)} className="text-white bg-red-500 hover:bg-red-400 p-1 rounded-xl"><Trash2 /></button>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <div className="md:col-span-5 text-right m-3">
                                <div className="inline-flex items-end">
                                    <button className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">Concluir {onEdit ? "Edição" : "Adição"}</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button color="gray" className="font-bold text-gray-50 bg-red-500 rounded-xl px-4 py-2" onClick={() => setOpenModal(false)}>
                        Fechar
                    </button>
                </Modal.Footer>
            </Modal>

            <div className="w-full sm:mx-auto sm:w-full bg-gray-100 dark:bg-slate-800">
                <div className="relative overflow-x-auto sm:rounded-lg p-4 items-center h-full bg-[#E2E8F0] mb-2">
                    <div className="text-black ml-4 font-semibold text-xl ">Atividades do Evento</div>
                    <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 dark:bg-slate-950 border-t dark:border-gray-700 mt-2 pt-3">
                        <div className=" relative ps-3">
                            <button onClick={() => { setOpenModal(true); setOnEdit(null) }} className="bg-primary-500 hover:bg-primary-700 text-gray-50 p-2 font-medium rounded-lg gap-x-2 flex" ><Plus></Plus>Add Atividade</button>
                        </div>
                        <label for="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" onChange={handleChangeSearch} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar"></input>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <Table hoverable className="border rounded-lg dark:border-none">
                            <Table.Head>
                                <Table.HeadCell>Titulo da Atividade</Table.HeadCell>
                                <Table.HeadCell>Instrutor</Table.HeadCell>
                                <Table.HeadCell>
                                    <span className="sr-only">Acoes</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {
                                    error
                                        ? console.log("Something is wrong")
                                        : isLoading
                                            ? <Table.Row><th>Loading</th></Table.Row>/*
                                    : currentRecords == null
                                        ? ""
                                        */: defineSearch().map((lecture) => (
                                                <Table.Row key={lecture.idleture} className="bg-white dark:border-gray-700 dark:bg-gray-800 h-full">
                                                    <Table.Cell className="whitespace-nowrap  flex items-center px-6 py-4 font-medium text-gray-900 dark:text-white" >
                                                        <div className="ps-3">
                                                            <div className="text-base font-semibold">{lecture.title}</div>
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>{lecture.instructor == null ? "nao cadastrado" : lecture.instructor}</Table.Cell>
                                                    <Table.Cell className="flex gap-x-2">
                                                        <button onClick={() => { setOpenModal(true); handleEdit(lecture); }} className="text-white bg-leticia-500 hover:bg-leticia-400 p-1 rounded-xl">
                                                            <Pencil />
                                                        </button>
                                                        <button onClick={() => handleDelete(lecture.idlecture)} href="#" className="text-white bg-red-500 hover:bg-red-400 p-1 rounded-xl">
                                                            <Trash2></Trash2>
                                                        </button>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))
                                }
                            </Table.Body>
                        </Table>
                    </div>
                </div>
                <div className="col-span-2 flex w-full px-2 pb-3 justify-end">
                    <button onClick={navigatetoNext} className="rounded-md bg-primary-500 hover:bg-primary-700 px-3 py-3 font-bold text-lg  leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Ir para o Evento</button>
                </div>
            </div>

        </div>
    )
}

export default EventForm3
