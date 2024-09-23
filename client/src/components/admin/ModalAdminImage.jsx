import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import { Modal, Table } from "flowbite-react";
import { CircleCheck, CloudUpload } from "lucide-react";

export default function ModalAdminImage(props) {

    const [file, setFile] = useState(null)

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

    const changeadminimage = async (inputs) => {
        const res = await makeRequest.post("/admins/changeimage", inputs)
    }

    const handleRun = async () => {

        let imgUrl = ""
        if (file) imgUrl = await upload()
        try {
            await changeadminimage({ imgurl: imgUrl, idadmin: props.idadmin})
            props.setShowModal(false)
            props.refetch()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Modal show={props.showModal} onClose={() => props.setShowModal(false)} className="relative">
            <Modal.Header>
                Alterar Imagem de Perfil
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex gap-y-2 items-center w-full">
                        <input id="file" onChange={(e) => { setFile(e.target.files[0]); }} name="file" type="file" className="file:bg-secondary-500 hover:file:bg-green-400 bg-white dark:bg-neutral-900 appearance-none  border border-gray-200 dark:border-gray-700  rounded-lg w-full py-2 px-4 text-gray-600 dark:text-gray-200 leading-tight focus:outline-none focus:bg-white " />
                    </div>
                    <button onClick={handleRun} className="bg-secondary-500 hover:bg-secondary-700 text-gray-50 p-1 gap-y-2 rounded-lg flex w-1/2 md:w-1/6 my-2 mx-auto">
                        <div className="flex gap-3 m-auto font-bold text-lg">
                            Enviar
                        </div>
                    </button>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button color="gray" className="font-bold text-gray-50 bg-red-500 rounded-xl px-4 py-2" onClick={() => props.setShowModal(false)}>
                    Fechar
                </button>
            </Modal.Footer>
        </Modal>
    );
}