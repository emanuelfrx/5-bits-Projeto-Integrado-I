import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import { makeRequest } from "../../axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResgisterStudentAdmin = (props) => {

    const [currentEvent1, setCurrentEvent1] = useState(props.event != undefined ? props.event : null)

    const { isLoading, error, data: events, refetch } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            return makeRequest.get("/events").then((res) => {
                return res.data
            })
        }
    })

    const [inputs, setInputs] = useState({
        eventid: (props.event ? props.event.idevent : ""),
        name: "",
        email: "",
        date_born: "",
        gender: "O"
    })

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const addstudent = async (inputs) => {
        const res = await makeRequest.post("/students", inputs).then((data) => {
            toast.success(data.data)
        }).catch((err) => {
            toast.error(err.response.data)
        })
    }

    const handleRun = async (e) => {
        e.preventDefault()
        try {
            await addstudent(inputs)
            setInputs({
                eventid: (props.event ? props.event.idevent : ""),
                name: "",
                email: "",
                date_born: "",
                gender: "O"
            })
        } catch (err) {
            
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
        <div className="mt-2 sm:mx-auto sm:w-full p-1 md:p-3">

            <h3 className="font-bold p-2 text-2xl">Cadastrar aluno Único</h3>

            {
                error
                    ? console.log("Something is wrong")
                    : isLoading
                        ? <div>Loading</div>
                        : <div>
                            <div className="flex items-center gap-y-2">
                                <label className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 mr-2">Selecione o evento:</label>
                                <select id="select_event" defaultValue={props.event != undefined ? props.event.idevent : 0} name="eventid" onChange={changeSelect} className="flex-1 rounded-md border-0 py-1.5 px-1.5 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" disabled={props.event != undefined ? "disabled" : ""} >
                                    <option key="0" value="0" disabled>Selecione</option>
                                    {events.map((event) => (
                                        <option key={event.idevent} value={event.idevent}>{event.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
            }
            {currentEvent1 != null ?
                <form className="space-y-3 p-1 md:p-3" action="#" method="POST">
                    <div>
                        <div className="text-4xl font-semibold mb-2 flex justify-center">
                            {currentEvent1.title}
                        </div>{props.event != undefined ?
                        "": <img className="rounded-lg my-2 mx-auto max-w-44 max-h-44" src={"../../assets/upload/" + currentEvent1.img_event}></img>}
                    </div>
                    <div className="space-y-2 grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <div className="relative">
                                <input onChange={handleChange} type="text" name="name" id="name" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="you@email.com" />
                                <label for="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                    Nome</label>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <div className="relative">
                                <input onChange={handleChange} type="email" name="email" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="you@email.com" />
                                <label for="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                    Email</label>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <div className="relative">
                                <input onChange={handleChange} type="date" name="date_born" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="you@email.com" />
                                <label for="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                    Data de Nascimento</label>
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="relative">
                                <input onChange={handleChange} type="text" name="mat" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="you@email.com" />
                                <label for="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                    Matricula</label>
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="relative">
                                <select onChange={handleChange} type="text" name="gender" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="you@email.com" >
                                    <option value="Outro">Outro</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Masculino">Masculino</option>
                                </select>
                                <label for="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                    Genero</label>
                            </div>
                        </div>

                        <div className="col-span-2 flex w-full justify-end">
                            <button onClick={handleRun} className="rounded-md bg-secondary-500 hover:bg-secondary-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Cadastrar Aluno</button>
                        </div>
                    </div>
                </form>
                : ""
            }
        </div>
    )
}

export default ResgisterStudentAdmin