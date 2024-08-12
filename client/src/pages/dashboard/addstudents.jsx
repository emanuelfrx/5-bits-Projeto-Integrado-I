import { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { makeRequest } from "../../axios"
import ResgisterStudentAdmin from "../../components/admin/RegisterStudentAdmin"
import ResgisterStudentsListAdmin from "../../components/admin/RegisterStudentsListAdmin"

function StudentsForm() {

    return (

        <div className="lg:max-w-5xl mx-auto">
            {/* Dashboard actions */}
            < div className="sm:flex sm:justify-between sm:items-center mb-8" >

                {/* Left: Title */}
                < div className="mb-4 sm:mb-0" >
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Eventos - Adicionar Evento</h1>
                </div >

            </div >

            <div className="mt-10 w-full sm:mx-auto sm:w-full grid grid-cols-2 gap-y-2">
                <ResgisterStudentAdmin className="col-span-1"/>
                <ResgisterStudentsListAdmin className="col-span-1" />
            </div>

        </div>
    )
}

export default StudentsForm
