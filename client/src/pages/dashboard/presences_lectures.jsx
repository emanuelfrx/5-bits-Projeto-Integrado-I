import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, Timeline, Modal } from "flowbite-react";
import { Award, GraduationCap, Pencil, Plus, Settings, Trash2, User, User2 } from 'lucide-react';
import Calendar from "../../components/admin/Calendar";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts"
import { Breadcrumb } from "flowbite-react";
import ModalClass from "../../components/admin/ModalClass";
import ModalMonitor from "../../components/admin/ModalMonitor";
import { Dropdown } from "flowbite-react";

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

    const infochart = [
        { name: 'Estudantes Presentes', value: 400 },
        { name: 'Estudantes Ausentes', value: 300 },
    ];

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
            console.log(classes)
        }
    }, [onEdit])

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //Submit
    const handleSubmit = async (e) => {
        e.preventDefault()

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
            console.log(data)
        }).catch(({ data }) => {
            console.log(data)
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

    //Modal Monitor

    const [showModalMonitor, setShowModalMonitor] = useState(false);

    //

    return (

        <div className=" mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8" >

                {/* Left: Title */}
                <Breadcrumb aria-label="Default breadcrumb example" className=" dark:text-gray-100 font-bold">
                    <Breadcrumb.Item href="#">Eventos</Breadcrumb.Item>
                    <Breadcrumb.Item>{error2 ? "" : isLoading2 ? "" : event.title}</Breadcrumb.Item>
                </Breadcrumb>

            </div >

            <div className="flex w-full h-full items-center">

                {/* Modal of Classes and Monitors */}

                {showModal ? <ModalClass idlecture={evidenceLecture} setShowModal={setShowModal} evidenceLecture={evidenceLecture} evidenceLectureName={evidenceLectureName}></ModalClass> : null}

                {showModalMonitor ? <ModalMonitor setShowModalMonitor={setShowModalMonitor} evidenceEvent={idevent} evidenceEventName={error2 ? "" : isLoading2 ? "" : event.title}></ModalMonitor> : null}

                {/* - Modal Add and Edit Lecture - */}

                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>{onEdit != null ? "Editar" : "Adicionar"} Atividade</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <form onSubmit={handleSubmit} className="lg:col-span-2 mb-2 border dark:border-gray-700 rounded-md lg:p-3 p-1 bg-slate-200 dark:bg-slate-900">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                                    <div className="md:col-span-1">
                                        <label>Nome da Atividade</label>
                                        <input value={inputs.name} onChange={handleChange} type="text" name="name" id="name" className="ring-inset ring-gray-300 h-10 mt-1 rounded px-4 w-full dark:bg-gray-700/60" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label>Instrutor</label>
                                        <input value={inputs.instructor} onChange={handleChange} type="text" name="instructor" id="instructor" className="ring-inset ring-gray-300 h-10 mt-1 rounded px-4 w-full dark:bg-gray-700/60" />
                                    </div>
                                </div>

                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                                    <div className="md:col-span-1">
                                        <label>Nova Aula</label>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <input id="addclass" onChange={handleChangeClass} type="text" className="ring-inset ring-gray-300 flex-1 h-10 rounded px-4 w-full dark:bg-gray-700/60" />
                                            <button onClick={handleAddClass} type="button" className="bg-green-500 hover:bg-green-300 text-white font-bold p-2 rounded-full"><Plus /></button>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-1 text-left m-1">
                                    <div className="inline-flex items-center">

                                    </div>
                                </div>
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                                    {classes.map((item) => (
                                        <div key={item.idclass} className="p-2 rounded border border-0.5 dark:border-gray-700 md:col-span-1">
                                            <label>Aula Adicionada</label>
                                            <div className="flex items-center mt-1 gap-x-1">
                                                <input disabled type="text" value={item.title} className="flex-1 h-10 rounded px-4 w-full dark:bg-gray-700/60" />
                                                <button onClick={() => { handleEditClass(item.idclass, item.title) }} className="text-secondary bg-sky-500 hover:bg-sky-400 p-1 rounded-lg" href="#"><Pencil /></button>
                                                <button onClick={() => handleDeleteClass(item.idclass)} className="text-secondary bg-red-500 hover:bg-red-400 p-1 rounded-lg"><Trash2 /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="md:col-span-5 text-right m-3">
                                    <div className="inline-flex items-end">
                                        <button className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded">{onEdit ? "Editar" : "Adicionar"} Atividade</button>
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

                {/*showModal ? <ModalClass idevent={idevent} setShowModal={setShowModal} evidenceLecture={evidenceLecture} evidenceLectureName={evidenceLectureName}></ModalClass> : null*/}

                <div className="grid grid-cols-4 gap-4 w-full">
                    <div className="col-span-4 lg:col-span-2 bg-gray-100 dark:bg-slate-950 rounded-lg overflow-hidden shadow-lg h-full items-center">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 items-center h-full">
                            <div className="font-xl text-green-500 ml-4 font-bold text-xl ">Atividades do Evento</div>
                            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-gray-100 dark:bg-slate-950 border-t dark:border-gray-700 mt-2 pt-3">
                                <div className=" relative ps-3">
                                    <button onClick={() => { setOpenModal(true); setOnEdit(null) }} className="bg-green-500 hover:bg-green-700 text-gray-50 p-2 font-medium rounded-lg gap-x-2 flex" ><Plus></Plus>Add Atividade</button>
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
                                                                <button onClick={() => { setShowModal(true); setEvidenceLecture(lecture.idlecture); setEvidenceLectureName(lecture.title) }} className="font-medium text-amber-600 hover:underline dark:text-amber-500">
                                                                    Presenças
                                                                </button>
                                                                <Dropdown label="Mais" inline placement="bottom" dismissOnClick={false}>
                                                                    <Dropdown.Item>
                                                                        <button onClick={() => { setOpenModal(true); handleEdit(lecture); }} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                                            Editar
                                                                        </button></Dropdown.Item>
                                                                    <Dropdown.Item>
                                                                        <button onClick={() => handleDelete(lecture.idlecture)} href="#" className="font-medium text-red-600 hover:underline dark:text-red-500">
                                                                            Deletar
                                                                        </button></Dropdown.Item>
                                                                </Dropdown>
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    ))
                                        }
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 lg:col-span-2 ">
                        <div className="grid grid-cols-2 w-full gap-4">
                            <div className="col-span-2 grid grid-cols-2 gap-3">
                                <div className="col-span-1 flex flex-col gap-3 p-3 bg-gray-100 dark:bg-slate-950 rounded-lg overflow-hidden shadow-lg">
                                    <button onClick={() => { setShowModalMonitor(true) }} className="bg-green-500 hover:bg-green-700 text-gray-50 p-3 rounded-lg flex w-full font-medium">
                                        <div className="flex gap-3 m-auto">
                                            <User2></User2>
                                            Monitores
                                        </div>
                                    </button>
                                    <button className="bg-green-500 hover:bg-green-700 text-gray-50 p-3 rounded-lg flex w-full font-medium">
                                        <div className="flex gap-3 m-auto">
                                            <Settings></Settings>
                                            Editar Evento
                                        </div>
                                    </button>
                                    <button className="bg-green-500 hover:bg-green-700 text-gray-50 p-3 rounded-lg flex w-full font-medium">
                                        <div className="flex gap-3 m-auto">
                                            <Award></Award>
                                            Certificados
                                        </div>
                                    </button>
                                    <button className="bg-green-500 hover:bg-green-700 text-gray-50 p-3 rounded-lg flex w-full font-medium">
                                        <div className="flex gap-3 m-auto">
                                            <GraduationCap></GraduationCap>
                                            Alunos
                                        </div>
                                    </button>
                                </div>
                                <div className="col-span-1 flex flex-col overflow-visible bg-gray-100 dark:bg-slate-950 rounded-lg shadow-lg gap-y-5">
                                    
                                    <div className="flex w-full h-full overflow-visible">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart width={400} height={400}>
                                                <Pie
                                                    dataKey="value"
                                                    startAngle={360}
                                                    endAngle={0}
                                                    data={infochart}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    fill="#8b5cf6"
                                                    label="test"
                                                >
                                                    <Cell fill="#3b82f6" />
                                                    <Cell fill="#ef4444" />
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 flex p-3 bg-gray-100 dark:bg-slate-950 rounded-lg overflow-hidden shadow-lg">
                                <Calendar className="m-auto bg-gray-100 dark:bg-slate-950 " ></Calendar>
                                <div className="p-3">
                                    <Timeline>
                                        <Timeline.Item>
                                            <Timeline.Point />
                                            <Timeline.Content>
                                                <Timeline.Time>February 2022</Timeline.Time>
                                                <Timeline.Title>Application UI code in Tailwind CSS</Timeline.Title>
                                                <Timeline.Body>
                                                    Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order
                                                    E-commerce & Marketing pages.
                                                </Timeline.Body>
                                            </Timeline.Content>
                                        </Timeline.Item>
                                        <Timeline.Item>
                                            <Timeline.Point />
                                            <Timeline.Content>
                                                <Timeline.Time>March 2022</Timeline.Time>
                                                <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
                                                <Timeline.Body>
                                                    All of the pages and
                                                </Timeline.Body>
                                            </Timeline.Content>
                                        </Timeline.Item>
                                    </Timeline>
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