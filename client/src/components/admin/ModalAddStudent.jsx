import { useEffect, useState } from "react";
import { Modal, Table } from "flowbite-react";
import { makeRequest } from "../../axios";

export default function ModalAddStudent(props) {

    const [inputs, setInputs] = useState({
        lectureid: props.idlecture,
        eventid: props.idevent,
        name: "",
        email: "",
        date_born: "",
        mat: "",
        gender: ""
    })

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const addstudent = async (inputs) => {
        const res = await makeRequest.post("/studentslec", inputs)
        console.log(res.status)
    }

    const handleRun = async (e) => {
        setInputs((prev) => ({ ...prev, ["eventid"]: props.idevent }))
        e.preventDefault()
        try {
            await addstudent(inputs)
            setInputs({
                lectureid: props.idlecture,
                eventid: props.idevent,
                name: "",
                email: "",
                date_born: "",
                mat: "",
                gender: ""
            })
            props.setShowModalAddStudent(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{

    }, [])

    return (
        <Modal show={props.showModalAddStudent} onClose={() => props.setShowModalAddStudent(false)} className="relative">
            <Modal.Header>
                Adicionar Aluno à Atividade
            </Modal.Header>
            <Modal.Body>
                <div className="lg:p-3 p-1 bg-gray-100 dark:bg-slate-800">
                    <form className="space-y-2 grid grid-cols-2 gap-3" action="#" method="POST">

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
                                <select onChange={handleChange} type="text" name="gender"className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
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
                            <button onClick={handleRun} className="rounded-md bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Cadastrar Aluno</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer className="justify-end">
                <button color="gray" className="font-bold text-gray-50 bg-primary-500 rounded-xl px-4 py-2" onClick={() => props.setShowModalAddStudent(false)}>
                    Salvar
                </button>
            </Modal.Footer>
        </Modal>
    );
}