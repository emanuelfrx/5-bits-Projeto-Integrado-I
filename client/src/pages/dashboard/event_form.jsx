import { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { makeRequest } from "../../axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        date_ini: "",
        date_end: ""
    })

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const addevent = async (inputs) => {
        const res = await makeRequest.post("/events", inputs).then((data) => {
            toast.success(data.data)
            navigate("/home/addevent2/" + data.data)
        }).catch((err) => {
            toast.error(err.response.data)
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
        } catch (err) {
            console.log(err)
        }
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
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Eventos - Criar Evento</h1>
                </div >

            </div >

            <ol class="items-center w-full p-1 md:p-3 space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse justify-between">
                <li class="flex items-center text-[#C52289] dark:text-[#e34eac] space-x-2.5 rtl:space-x-reverse hover:cursor-pointer">
                    <span class="flex items-center justify-center w-8 h-8 border border-[#C52289] rounded-full shrink-0 dark:border-[#e34eac]">
                        1
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Criar Evento</h3>
                        <p class="text-sm">Adicione os dados do evento</p>
                    </span>
                </li>
                <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse hover:cursor-pointer">
                    <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        2
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Adicionar Participantes</h3>
                        <p class="text-sm">Adicione os inscritos do evento</p>
                    </span>
                </li>
                <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse hover:cursor-pointer">
                    <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        3
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Adicione Atividades</h3>
                        <p class="text-sm">Liste as atividades do evento</p>
                    </span>
                </li>
            </ol>

            <div className="mt-4 w-full lg:p-3 p-1 bg-[#E2E8F0] shadow-lg rounded-lg dark:bg-slate-800">

                <form className="grid grid-cols-4 gap-3 p-1 md:p-3" action="#" method="POST">


                    <div className="col-span-4 md:col-span-2">
                        <div className="relative">
                            <input onChange={handleChange} type="text" name="title" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="" />
                            <label htmlFor="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                Título</label>
                        </div>
                    </div>

                    <div className="col-span-4 md:col-span-1">

                        <div className="relative">
                            <input onChange={handleChange} type="date" name="date_ini" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="" />
                            <label htmlFor="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                Data do Início</label>
                        </div>
                    </div>

                    <div className="col-span-4 md:col-span-1">
                        <div className="relative">
                            <input onChange={handleChange} type="date" name="date_end" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="" />
                            <label htmlFor="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                Data do Fim</label>
                        </div>
                    </div>

                    <div className="col-span-4">
                        <div className="relative">
                            <textarea onChange={handleChange} type="text" name="desc" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="" />
                            <label htmlFor="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                Descrição</label>
                        </div>
                    </div>

                    <div className="col-span-4 md:col-span-1">
                        <div className="relative">
                            <input onChange={handleChange} type="text" name="tag_link" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="" />
                            <label htmlFor="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                Tag de Busca</label>
                        </div>
                    </div>

                    <div className="col-span-4 md:col-span-3">
                        <div className="flex gap-y-2 items-center w-full">
                            <div className="w-1/3">
                                <label className="block text-gray-700 dark:text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                    Imagem do Evento
                                </label>
                            </div>
                            <div className="w-2/3">
                                <input id="file" onChange={(e) => { setFile(e.target.files[0]); }} name="file" type="file" className="file:bg-[#C52289] hover:file:bg-primary-400 bg-white dark:bg-neutral-900 appearance-none  border border-gray-200 dark:border-gray-700  rounded-lg w-full py-2 px-4 text-gray-600 dark:text-gray-200 leading-tight focus:outline-none focus:bg-white " />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="flex w-full text-right m-3">
                <div className="w-full inline-flex items-end justify-end">
                    <button type="submit" onClick={handleRun} className="font-bold text-lg bg-primary-500 hover:bg-primary-700 text-white py-2 px-4 mr-2 rounded-lg">Seguir</button>
                </div>
            </div>

        </div>
    )
}

export default EventForm
