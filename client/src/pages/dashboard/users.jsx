import { useRef, useState } from "react";
import { makeRequest } from "../../axios";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Trash2, Pencil } from 'lucide-react';
import { Table } from "flowbite-react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            await makeRequest.put("/admins/" + onEdit.idadmin, { inputs }).then(({ data }) => { toast.success(data) }).catch(( err ) => { toast.error(err.response.data) })
        } else {
            await makeRequest.post("/admins/", { inputs }).then(({ data }) => { toast.success(data) }).catch(( err ) => { toast.error(err.response.data) })
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
            toast.success(data)
        }).catch(( err ) => {
            toast.error(err.response.data)
        })

        setOnEdit(null)
        refetch()
    }

    //True Search
    const [search, setSearch] = useState("")

    const changeSearch = (e) => {
        setSearch(e.target.value)
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
                    <h1 className="text-2xl md:text-3xl dark:text-gray-100 font-bold">Usuários</h1>
                </div >

            </div >

            <form onSubmit={handleSubmit} className="lg:col-span-2 mb-2 rounded-md shadow-md lg:p-3 p-1 bg-gray-100 dark:bg-slate-800">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <input onChange={handleChange} type="text" name="name" id="name" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
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

                    <div className="md:col-span-2">
                        <div className="relative">
                            <input onChange={handleChange} type="text" name="username" id="username" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="" />
                            <label for="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                UserName</label>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="relative">
                            <input onChange={handleChange} type="text" name="email" id="email" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="" />
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

                    <div className="md:col-span-2">
                        <div className="relative">
                            <select onChange={handleChange} type="text" name="role" id="role" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="" >
                                <option value="0">Monitor</option>
                                <option value="1">Admin</option>
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
                                Função</label>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="relative">
                            <input onChange={handleChange} type="password" name="password" id="password" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="" />
                            <label for="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                Senha</label>
                        </div>
                    </div>

                </div>

                <div className="md:col-span-5 text-right m-3">
                    <div className="inline-flex items-end">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">{onEdit ? "Editar" : "Adicionar"} Usuário</button>
                    </div>
                </div>

            </form>


            {/* Cards */}
            < div className="grid gap-6" >
                <div className="card overflow-hidden rounded-sm">
                    <div>
                        <div className="overflow-x-auto">
                            <div className="min-w-full inline-block align-middle md:p-3">
                                <div className="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
                                    <label for="table-search" className="sr-only">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="text" onChange={changeSearch} id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600" placeholder="Pesquisar por usuários"></input>
                                    </div>
                                </div>
                                <div className="overflow-hidden">
                                    <Table hoverable>
                                        <Table.Head>
                                            <Table.HeadCell>Nome</Table.HeadCell>
                                            <Table.HeadCell>Username</Table.HeadCell>
                                            <Table.HeadCell>Função</Table.HeadCell>
                                            <Table.HeadCell>
                                                <span className="sr-only">Ações</span>
                                            </Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divide-y">
                                            {
                                                error
                                                    ? console.log("Something is wrong")
                                                    : isLoading
                                                        ? <>Loading</>/*
                                    : currentRecords == null
                                        ? ""
                                        */: users.map((user) => (
                                                            <Table.Row key={user.idadmin} className={"bg-white dark:border-gray-700 dark:bg-gray-800" + (user.name.toLowerCase().includes(search.toLowerCase()) ? "" : " collapse")}>
                                                                <Table.Cell className="whitespace-nowrap  flex items-center px-6 py-4 font-medium text-gray-900 dark:text-white" >
                                                                    <img className="w-10 h-10 rounded-full cover" src={"../../assets/upload/" + (user.img_profile != null ? user.img_profile : "1711063952921avatar.png")}></img>
                                                                    <div className="ps-3">
                                                                        <div className="text-base font-semibold">{user.name}</div>
                                                                    </div>
                                                                </Table.Cell>
                                                                <Table.Cell>{user.username}</Table.Cell>
                                                                <Table.Cell className="px-6 py-4">
                                                                    <div className="flex items-center">
                                                                        <div className="h-2.5 w-2.5 rounded-full bg-[#C52289] me-2"></div> {user.role == 1 ? "Admin" : "Monitor"}
                                                                    </div>
                                                                </Table.Cell>
                                                                <Table.Cell className="text-white">
                                                                    <button onClick={() => handleEdit(user)} className="text-white bg-leticia-500 hover:bg-leticia-400 p-1 rounded-lg mr-2" href="#"><Pencil /></button>
                                                                    <button onClick={() => { handleDelete(user.idadmin) }} className="text-white bg-red-500 hover:bg-red-400 p-1 rounded-lg"><Trash2 /></button>
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        ))
                                            }
                                        </Table.Body>
                                    </Table>
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