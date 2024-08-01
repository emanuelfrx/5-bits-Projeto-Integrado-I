import { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { makeRequest } from "../../axios"

function EventForm() {

    const [file, setFile] = useState(null)
    //console.log(file)

    const upload = async () => {
        try {
            const formData = new FormData()
            formData.append("file", file)

            const res = await makeRequest.post("/upload", formData)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    const [inputs, setInputs] = useState({
        title: "",
        desc: "",
        tag_link: "",
        img_event: "",
        type: ""
    })

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const addevent = async (inputs) => {
        const res = await axios.post("http://localhost:8800/api/events", inputs, {
            withCredentials: true
        })
    }

    const navigate = useNavigate();

    //Se colocar em planilha há a necessidade de mutations

    const handleRun = async (e) => {
        e.preventDefault()
        let imgUrl = ""
        if (file) imgUrl = await upload()
        inputs.img_event = imgUrl
        try {
            await addevent(inputs)
            navigate("/home/events")
        } catch (err) {
            console.log(err)
        }
    }

    return (

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
                <div>
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                    </div>
                    <div className="mt-2">
                        <input onChange={handleChange} name="title" type="text" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Type</label>
                    </div>
                    <div className="mt-2">
                        <select onChange={handleChange} name="type" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option value="0">Presença Manual</option>
                            <option value="1">Código de Validação</option>
                            <option value="1">Presença Automática</option>
                        </select>
                    </div>
                </div>

                { inputs.type == 1 ? 
                    <>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Quantidade de códigos</label>
                        </div>
                        <div className="mt-2">
                            <select name="qtd_c" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="500">500</option>
                            </select>
                        </div>
                    </div>
                    </>
                : ""}

                <div>
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                    </div>
                    <div className="mt-2">
                        <textarea onChange={handleChange} name="desc" type="text" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium leading-6 text-gray-900">TAG LINK</label>
                    </div>
                    <div className="mt-2">
                        <input onChange={handleChange} name="tag_link" type="text" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium leading-6 text-gray-900">IMG EVENT</label>
                    </div>
                    <div className="mt-2">
                        <input id="file" onChange={(e) => { setFile(e.target.files[0]); }} name="file" type="file" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button type="submit" onClick={handleRun} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Event</button>
                </div>
            </form>
        </div>
    )
}

export default EventForm
