import { useQuery } from "@tanstack/react-query";
import { CloudUpload, PencilIcon } from "lucide-react";

function Profile() {

    const { isLoading, error, data: admininfo } = useQuery({
        queryKey: ["admininfo"],
        queryFn: async () => {
            return makeRequest.get("/admins/getinfo").then((res) => {
                return res.data
            })
        }
    })

    return (
        <div className="container    bg-gray-100 dark:bg-slate-800  shadow-lg    transform  duration-200 easy-in-out">
            <div className=" h-32 overflow-hidden bg-gradient-to-t from-green-600 to-green-400" >

            </div>
            <div className="flex justify-center px-5  -mt-12">
                <img className="h-32 w-32 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
            </div>
            <div className=" ">
                <div className="text-center px-4 md:px-14">
                    <button className="bg-[#C52289] hover:bg-[#9b2470] text-gray-50 p-1 rounded-lg flex w-1/2 md:w-1/6 my-2 mx-auto">
                        <div className="flex gap-3 m-auto font-bold text-lg">
                            <CloudUpload></CloudUpload>
                            Imagem
                        </div>
                    </button>
                    <h2 className="text-gray-800 dark:text-gray-100 text-3xl font-bold">Vitu da Silva</h2>
                    <div className="text-[#C52289] font-semibold uppercase mb-2" target="BLANK()">Administrador</div>
                    <div className="w-full md:w-1/3 space-y-1 mx-auto my-2">
                        <div class="relative">
                            <input type="text" id="hs-floating-input-email-value" class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="you@email.com" value="Vitu da Silva" />
                            <label for="hs-floating-input-email-value" class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
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
                    <div className="w-full md:w-1/3 space-y-1 mx-auto my-2">
                        <div class="relative">
                            <input type="text" id="hs-floating-input-email-value" class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" value="vitu2" />
                            <label for="hs-floating-input-email-value" class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                Nome de Usuário</label>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 space-y-1 mx-auto my-2">
                        <div class="relative">
                            <input type="text" id="hs-floating-input-email-value" class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" value="vitinho@gmail.com" />
                            <label for="hs-floating-input-email-value" class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
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
                    <div className="w-full md:w-1/3 space-y-1 mx-auto my-2">
                        <div class="relative">
                            <input type="password" id="hs-floating-input-email-value" class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" value="vitinho@gmail.com" />
                            <label for="hs-floating-input-email-value" class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
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
                <div className="flex w-full md:w-1/3 space-y-1 mx-auto mt-2 mb-2">
                    <div className="w-full content-end">
                        <button className="bg-green-500 hover:bg-green-700 text-gray-50 py-2 px-3 rounded-lg flex my-2 mx-auto">
                            <div className="flex gap-1 m-auto font-bold text-lg">
                                <PencilIcon></PencilIcon>
                                Editar Perfil
                            </div>
                        </button>
                    </div>
                </div>
                <br className=""></br>
            </div>
        </div>
    )
}

export default Profile;