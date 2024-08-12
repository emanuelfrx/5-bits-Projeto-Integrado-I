import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { makeRequest } from "../../axios"

const ResgisterStudentAdmin = (props) => {

    const [currentEvent1, setCurrentEvent1] = useState(null)

    const { isLoading, error, data: events } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            return makeRequest.get("/events").then((res) => {
                return res.data
            })
        }
    })

    const [inputs, setInputs] = useState({
        eventid: "",
        name: "",
        email: "",
        date_born: ""
    })

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const addstudent = async (inputs) => {
        const res = await makeRequest.post("/students", inputs)
        console.log(res.status)
    }

    const handleRun = async (e) => {
        e.preventDefault()
        try {
            await addstudent(inputs)
            setInputs({
                eventid: "",
                name: "",
                email: "",
                date_born: ""
            })
            document.getElementById("select_event").value = 0
            setCurrentEvent1(null)
        } catch (err) {
            console.log(err)
        }
    }

    const changeSelect = async (e) => {
        const res = await makeRequest.get("/events/event/" + e.target.value).then((res) => {
            return res.data
        })
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setCurrentEvent1(res)
    }

    return (
        <div className="mt-10 sm:mx-auto sm:w-full p-3 shadow-lg">

            <h3 className="font-bold p-2 mt-1 text-2xl">Cadastrar aluno Único</h3>

            {
                error
                    ? console.log("Something is wrong")
                    : isLoading
                        ? <div>Loading</div>
                        : <div>
                            <div className="flex items-center gap-y-2">
                                <label className="text-sm font-medium leading-6 text-gray-900 mr-2">Selecione o evento:</label>
                                <select id="select_event" defaultValue={0}  name="eventid" onChange={changeSelect} className="flex-1 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option key="0" value="0" disabled>Selecione</option>
                                    {events.map((event) => (
                                        <option key={event.idevent} value={event.idevent}>{event.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
            }
            {currentEvent1 != null ?
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <div className="text-4xl font-semibold mb-2 flex justify-center">
                            {currentEvent1.title}
                        </div>
                        <img className="rounded-lg my-2" src={"../../assets/upload/" + currentEvent1.img_event}></img>
                        <div className="font-medium mb-2 flex justify-center">
                            {currentEvent1.desc}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Nome</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={handleChange} name="name" type="text" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={handleChange} name="email" type="email" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Data de Nascimento</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={handleChange} name="date_born" type="date" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button onClick={handleRun} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cadastrar Aluno</button>
                    </div>
                </form>
                : ""
            }
        </div>
    )
}

export default ResgisterStudentAdmin