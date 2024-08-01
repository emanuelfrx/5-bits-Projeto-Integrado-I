import axios from "axios"
import { useState } from "react"

const ResgisterStudent = (props) => {

    const [inputs, setInputs] = useState({
        eventid: props.tag.idevent,
        name: "",
        email: "",
        date_born: ""
    })

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const addstudent = async (inputs) => {
        const res = await axios.post("http://localhost:8800/api/students", inputs)
        console.log(res.status)
    }

    const handleRun = async (e) => {
        e.preventDefault()
        try {
            await addstudent(inputs)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
                <div>
                    <div className="text-4xl font-semibold mb-2 flex justify-center">
                        {props.tag.title}
                    </div>
                    <img className="rounded-lg my-2" src={"./assets/upload/"+props.tag.img_event}></img>
                    <div className="font-medium mb-2 flex justify-center">
                        {props.tag.desc}
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
                    <button onClick={handleRun} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cadastrar Presença</button>
                </div>
            </form>
        </div>
    )
}

export default ResgisterStudent