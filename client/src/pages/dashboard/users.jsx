import { useRef, useState } from "react";
import { makeRequest } from "../../axios";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Trash2, Pencil } from 'lucide-react';

function Users() {

    const [onEdit, setOnEdit] = useState(null)

    //get Users

    const getUsers = async () => {
        try {
            const res = await makeRequest.get("/admins").then((res) => {
                return res
            })
            return res.data.sort((a, b) => (a.name > b.name ? 1 : -1))
        } catch (error) {
            //error
        }
    }

    const { isLoading, error, data: users, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        refetchOnWindowFocus: false
    })

    //Edit form

    const handleEdit = (user) => {
        setOnEdit(user)
    }

    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        role: "0",
        password: ""
    })

    useEffect(() => {
        if (onEdit) {
            document.getElementById("name").value = onEdit.name;
            document.getElementById("username").value = onEdit.username;
            document.getElementById("email").value = onEdit.email;
            document.getElementById("role").value = onEdit.role;
            document.getElementById("password").value = "";
            inputs.name = onEdit.name
            inputs.username = onEdit.username
            inputs.email = onEdit.email
            inputs.role = onEdit.role
            inputs.password = ""
        }
    }, [onEdit])

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //Submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (onEdit) {
            await makeRequest.put("/admins/" + onEdit.idadmin, { inputs }).then(({ data }) => { }).catch(({ data }) => { })
        } else {
            await makeRequest.post("/admins/", { inputs }).then(({ data }) => { }).catch(({ data }) => { })
        }

        document.getElementById("name").value = "";
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("role").value = "0";
        document.getElementById("password").value = "";
        inputs.name = ""
        inputs.username = ""
        inputs.email = ""
        inputs.role = "0"
        inputs.password = ""

        setOnEdit(null)
        refetch()
    }

    //delete

    const handleDelete = async (idadmin) => {

        await makeRequest.delete("/admins/" + idadmin).then(({ data }) => {
            console.log(data)
        }).catch(({ data }) => {
            console.log(data)
        })

        setOnEdit(null)
        refetch()
    }

    return (
        <div className="lg:max-w-5xl mx-auto">
            {/* Dashboard actions */}
            < div className="sm:flex sm:justify-between sm:items-center mb-8" >

                {/* Left: Title */}
                < div className="mb-4 sm:mb-0" >
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Usuários</h1>
                </div >

            </div >

            <form onSubmit={handleSubmit} className="lg:col-span-2 mb-2 border rounded-md lg:p-3 p-1 bg-slate-200 dark:bg-slate-900">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                    <div className="md:col-span-2">
                        <label>Nome</label>
                        <input onChange={handleChange} type="text" name="name" id="name" className="h-10 mt-1 rounded px-4 w-full dark:bg-gray-700/60" />
                    </div>

                    <div className="md:col-span-2">
                        <label>Username</label>
                        <input onChange={handleChange} type="text" name="username" id="username" className="h-10 mt-1 rounded px-4 w-full dark:bg-gray-700/60" placeholder="" />
                    </div>

                    <div className="md:col-span-2">
                        <label>Email</label>
                        <input onChange={handleChange} type="email" name="email" id="email" className="h-10 mt-1 rounded px-4 w-full dark:bg-gray-700/60" placeholder="email@domain.com" />
                    </div>

                    <div className="md:col-span-2">
                        <label>Função</label>
                        <select onChange={handleChange} type="text" name="role" id="role" className="h-10 mt-1 rounded px-4 w-full dark:bg-gray-700/60">
                            <option value="0">Monitor</option>
                            <option value="1">Admin</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label>Senha</label>
                        <input onChange={handleChange} type="password" name="password" id="password" className="h-10 mt-1 rounded px-4 w-full dark:bg-gray-700/60" placeholder="*******" />
                    </div>

                </div>

                <div className="md:col-span-5 text-right m-3">
                    <div className="inline-flex items-end">
                        <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">{onEdit ? "Editar" : "Adicionar"} Usuário</button>
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
                                                    Nome</th>
                                                <th scope="col" className="px-6 py-3 text-start text-sm">
                                                    Username</th>
                                                <th scope="col" className="px-6 py-3 text-start text-sm hidden md:table-cell">
                                                    Função</th>
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
                                                        : users.map((user) => (
                                                            <tr className="" key={user.idadmin}>
                                                                <td
                                                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    {user.name}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                    {user.username} </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">
                                                                    {user.role == 1 ? "Admin" : "Monitor"}</td>
                                                                <td
                                                                    className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                    <button onClick={() => handleEdit(user)} className="text-secondary bg-sky-500 hover:bg-sky-400 p-1 rounded-lg mr-2" href="#"><Pencil/></button>
                                                                    <button onClick={() => { handleDelete(user.idadmin) }} className="text-secondary bg-red-500 hover:bg-red-400 p-1 rounded-lg"><Trash2/></button>
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
    )
}

export default Users;