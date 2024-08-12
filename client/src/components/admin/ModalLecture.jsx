import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { Pencil, Trash2, Plus } from "lucide-react"

export default function ModalLecture(props) {

    const getLectures = async () => {
        return makeRequest.post("/lectures/list", { eventid: props.evidenceEvent }).then((res) => {
            return res.data
        })
    }

    const { isLoading, error, data: lectures, refetch } = useQuery({
        queryKey: ["lectures"],
        queryFn: getLectures,
    })

    useEffect(() => {
        refetch()
    }, [props.setShowModal])

    //CRUD

    const [onEdit, setOnEdit] = useState(null)

    const handleEdit = (lecture) => {
        setOnEdit(lecture)
    }

    const [inputs, setInputs] = useState({
        name: "",
        eventid: props.evidenceEvent
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

            document.getElementById("name").value = onEdit.title;
            inputs.name = onEdit.title
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
        inputs.name = ""
        setClass([])

        setOnEdit(null)
        setCont(1)
        document.getElementById("addclass").value = "";
        setNameClass("")
        refetch()
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

    return (
        <div className="relative">
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-slate-700 outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {props.evidenceEventName}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => props.setShowModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="p-2 lg:p-3">
                            <form onSubmit={handleSubmit} className="lg:col-span-2 mb-2 border rounded-md lg:p-3 p-1 bg-slate-200 dark:bg-slate-900">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                                    <div className="md:col-span-1">
                                        <label>Nome da Atividade</label>
                                        <input onChange={handleChange} type="text" name="name" id="name" className="h-10 mt-1 rounded px-4 w-full dark:bg-gray-700/60" />
                                    </div>
                                </div>

                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                                    <div className="md:col-span-1">
                                        <label>Nova Aula</label>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <input id="addclass" onChange={handleChangeClass} type="text" className="flex-1 h-10 rounded px-4 w-full dark:bg-gray-700/60" />
                                            <button onClick={handleAddClass} type="button" className="bg-violet-500 hover:bg-violet-700 text-white font-bold p-2 rounded-full"><Plus /></button>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-1 text-left m-1">
                                    <div className="inline-flex items-center">

                                    </div>
                                </div>
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                                    {classes.map((item) => (
                                        <div key={item.idclass} className="p-2 rounded border border-0.5 md:col-span-1">
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
                                        <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">{onEdit ? "Editar" : "Adicionar"} Atividade</button>
                                    </div>
                                </div>

                            </form>


                            {/* Cards */}
                            < div className="grid gap-6" >
                                <div className="card overflow-hidden rounded-sm border">
                                    <div>
                                        <div className="overflow-x-auto">
                                            <div className="min-w-full inline-block align-middle">
                                                <div className="overflow-hidden">
                                                    <table className="min-w-full divide-y">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="px-6 py-3 text-start text-sm">
                                                                    Atividade</th>
                                                                <th scope="col" className="px-6 py-3 text-end text-sm">
                                                                    Ações</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                error
                                                                    ? console.log("Something is wrong")
                                                                    : isLoading
                                                                        ? <tr><th>Loading</th></tr>
                                                                        : lectures.map((lecture) => (
                                                                            <tr className="" key={lecture.idlecture}>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                                    {lecture.title}</td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                                    <button onClick={() => handleEdit(lecture)} className="text-secondary bg-sky-500 hover:bg-sky-400 p-1 rounded-lg mr-2" href="#"><Pencil /></button>
                                                                                    <button onClick={() => { handleDelete(lecture.idlecture) }} className="text-secondary bg-red-500 hover:bg-red-400 p-1 rounded-lg"><Trash2 /></button>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => { props.setShowModal(false) }}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    );
}