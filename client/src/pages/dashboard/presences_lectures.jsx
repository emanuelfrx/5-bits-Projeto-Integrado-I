import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, Timeline, Modal } from "flowbite-react";
import { Award, GraduationCap, Info, Pencil, Plus, Settings, Trash2, TriangleAlert, User, User2 } from 'lucide-react';
import Calendar from "../../components/admin/Calendar";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts"
import { Breadcrumb } from "flowbite-react";
import ModalClass from "../../components/admin/ModalClass";
import ModalMonitor from "../../components/admin/ModalMonitor";
import { Dropdown } from "flowbite-react";
import ModalAccredits from "../../components/admin/ModalAccredits";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PresenceLectures() {

    const { idevent } = useParams()

    const getEventData = async () => {
        return await makeRequest.get("/events/event/" + idevent).then((res) => {
            return res.data
        })
    }

    const getLectures = async () => {
        return await makeRequest.post("/lectures/list", { eventid: idevent }).then((res) => {
            if (ResultsLectures != null) setResultsLectures(null)
            return res.data
        })
    }

    const { isLoading, error, data: lectures, refetch } = useQuery({
        queryKey: ["lectures"],
        queryFn: getLectures,
    })

    const { isLoading: isLoading2, error: error2, data: event } = useQuery({
        queryKey: ["getevent"],
        queryFn: getEventData,
    })

    //data of chart

    const getInfochart = async () => {
        return await makeRequest.post("/events/infochart", { idevent: idevent }).then((res) => {
            return res.data
        })
    }

    const { isLoading: isLoading_chart, error: error_chart, data: infochart, refetch: refetchinfo } = useQuery({
        queryKey: ["getchart" + idevent],
        queryFn: getInfochart,
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

    const handleNavigate = (lecture) => {
        navigate("../certification_students/"
            + idevent
            + "/" + lecture
        )
    }

    //Modal Monitor

    const [showModalMonitor, setShowModalMonitor] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    //Modal Accredits
    const [showModalAccredits, setShowModalAccredits] = useState(false);

    useEffect(() => {
        refetchinfo()
    }, [showModalAccredits])

    //Delete Event

    const handleDeleteEvent = async() => {
        await makeRequest.post("/events/deleteevent/", { idevent: idevent}).then(({ data }) => {
            navigate("../../home/events")
        }).catch(({ data }) => {
            toast.error(data.data)
        })
    }

    return (

        <div className=" mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:flex-col mb-4" >

                {/* Left: Title */}
                <Breadcrumb aria-label="Default breadcrumb example" className=" dark:text-gray-100 font-bold">
                    <Breadcrumb.Item href="#">Eventos</Breadcrumb.Item>
                    <Breadcrumb.Item>{error2 ? "" : isLoading2 ? "" : event.title}</Breadcrumb.Item>
                </Breadcrumb>

                <div className="font-black text-4xl">
                    {error2 ? "" : isLoading2 ? "" : event.title}
                </div>

            </div >

            <div className="flex w-full h-full items-center">

                <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                />

                {/* Modal of Classes and Monitors */}

                <ModalClass showModal={showModal} idlecture={evidenceLecture} idevent={idevent} setShowModal={setShowModal} evidenceLecture={evidenceLecture} evidenceLectureName={evidenceLectureName}></ModalClass>

                <ModalMonitor showModalMonitor={showModalMonitor} setShowModalMonitor={setShowModalMonitor} evidenceEvent={idevent} evidenceEventName={error2 ? "" : isLoading2 ? "" : event.title}></ModalMonitor>

                <ModalAccredits showModalAccredits={showModalAccredits} setShowModalAccredits={setShowModalAccredits} idevent={idevent}></ModalAccredits>

                {/* - Modal Add and Edit Lecture - */}

                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>{onEdit != null ? "Editar" : "Adicionar"} Atividade</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <form onSubmit={handleSubmit} className="lg:col-span-2 mb-2 border dark:border-gray-700 rounded-md lg:p-3 p-1 bg-slate-200 dark:bg-slate-900">
                                <h3 className="my-2">Informações Básicas</h3>

                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2  dark:border-gray-200 rounded-xl p-1 lg:p-2">
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

                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2  dark:border-gray-200  rounded-xl p-1 lg:p-2">
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

                <Modal show={showModalDelete} onClose={() => setShowModalDelete(false)}>
                    <Modal.Body className="flex flex-col xl:mx-10 gap-y-4">
                        <div className="flex w-full justify-center"><TriangleAlert className="text-red-500" size={100}></TriangleAlert></div>
                        <div className="mb-2 items-center text-xl">O Evento será excluido <b className="text-red-500 underline">permanentemente</b>. Deseja realmente proceder?</div>
                        <div className=" flex w-full justify-around gap-3">
                            <div className="inline-flex items-end">
                                <button onClick={()=>setShowModalDelete(false)} className="bg-leticia-500 hover:bg-leticia-700 text-white font-bold py-2 px-4 rounded-xl">Não</button>
                            </div>
                            <div className="inline-flex items-end">
                                <button onClick={()=>handleDeleteEvent()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">Deletar</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                {/*showModal ? <ModalClass idevent={idevent} setShowModal={setShowModal} evidenceLecture={evidenceLecture} evidenceLectureName={evidenceLectureName}></ModalClass> : null*/}



                <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="col-span-3 lg:col-span-2 bg-gray-100 dark:bg-slate-950 rounded-xl overflow-hidden shadow-2xl h-full items-center">
                        <div className="border-gray-400 border  relative overflow-x-auto shadow-md sm:rounded-xl p-4 lg:p-5 items-center h-full">
                            <div className="font-xl text-primary-500 ml-4 font-bold text-xl ">Atividades do Evento</div>
                            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-gray-100 dark:bg-slate-950 border-t dark:border-gray-700 mt-2 pt-3">
                                <div className=" relative ps-3">
                                    <button onClick={() => { setOpenModal(true); setOnEdit(null); }} className="bg-primary-500 hover:bg-primary-700 text-gray-50 text-md px-2 py-3 font-bold rounded-xl gap-x-2 flex items-center" ><Plus size={32}></Plus>Adicionar Atividade</button>
                                </div>
                                <label for="table-search" className="sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="text" onChange={handleChangeSearch} className="block px-2 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl w-80 bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Pesquisar"></input>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <Table hoverable className="border rounded-xl dark:border-none">
                                    <Table.Head className=" bg-[#64748B]">
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
                                                                <button onClick={() => { setShowModal(true); setEvidenceLecture(lecture.idlecture); setEvidenceLectureName(lecture.title) }} className="font-medium p-1 rounded-md text-white hover:underline bg-primary-500 hover:bg-primary-600">
                                                                    Presenças
                                                                </button>
                                                                <button onClick={() => { handleNavigate(lecture.idlecture) }} className="font-medium p-1 rounded-md text-white hover:underline bg-secondary-500 hover:bg-secondary-700">
                                                                    Certificados
                                                                </button>
                                                                <button onClick={() => { setOpenModal(true); handleEdit(lecture); }} className="font-medium p-1 rounded-md text-white bg-leticia-500 hover:bg-leticia-600">
                                                                    <Pencil></Pencil>
                                                                </button>
                                                                <button onClick={() => handleDelete(lecture.idlecture)} href="#" className="font-medium p-1 rounded-md text-white bg-red-500 hover:bg-red-600">
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
                    </div>
                    <div className="col-span-3 lg:col-span-1 ">
                        <div className="flex flex-col w-full gap-4">
                            <div className="flex flex-col gap-3">
                                <div className="border-gray-400 border lg:p-5 flex flex-col gap-3 bg-gray-100 dark:bg-slate-950 rounded-xl overflow-hidden shadow-2xl">
                                    <button onClick={() => { setShowModalMonitor(true) }} className="bg-primary-500 hover:bg-primary-700 text-gray-50 px-3 py-4 rounded-xl flex w-full font-medium">
                                        <div className="flex gap-3 m-auto items-center text-xl font-bold">
                                            <User2></User2>
                                            Gerenciar Monitores
                                        </div>
                                    </button>
                                    <button onClick={() => { setShowModalAccredits(true) }} className="bg-primary-500 hover:bg-primary-700 text-gray-50 px-3 py-4 rounded-xl flex w-full font-medium">
                                        <div className="flex gap-3 m-auto items-center text-xl font-bold">
                                            <GraduationCap></GraduationCap>
                                            Credenciar Inscrições
                                        </div>
                                    </button>
                                    <button onClick={() => { navigate("/home/addstudents") }} className="bg-primary-500 hover:bg-primary-700 text-gray-50 px-3 py-4 rounded-xl flex w-full font-medium">
                                        <div className="flex gap-3 m-auto items-center text-xl font-bold">
                                            <Plus size={32}></Plus>
                                            Adicionar Participantes
                                        </div>
                                    </button>
                                    <button onClick={() => setShowModalDelete(true)} className="bg-red-500 hover:bg-red-700 text-gray-50 px-3 py-4 rounded-xl flex w-full font-medium">
                                        <div className="flex gap-3 m-auto items-center text-xl font-bold">
                                            <Trash2></Trash2>
                                            Excluir Evento
                                        </div>
                                    </button>
                                </div>
                                <div className="border-gray-400 border flex flex-col overflow-visible bg-gray-100 dark:bg-slate-950 rounded-xl shadow-2xl ">

                                    <div className="flex overflow-visible h-60">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart width={300} height={300}>
                                                <Pie
                                                    dataKey="value"
                                                    startAngle={360}
                                                    endAngle={0}
                                                    data={error_chart || isLoading_chart ? {} : infochart}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    fill="#8b5cf6"
                                                    label="test"
                                                >
                                                    <Cell fill="#A3E635" />
                                                    <Cell fill="#EE1515" />
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default PresenceLectures;