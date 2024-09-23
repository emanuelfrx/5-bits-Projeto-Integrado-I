import { Link, useNavigate } from "react-router-dom"
import People from '../../assets/people.svg';
import Presences from '../../assets/presences.svg';
import Lectures from '../../assets/lectures.svg';
import { Carousel } from "flowbite-react";

import tool1 from '../../assets/tools/node-js-96.png'
import tool2 from '../../assets/tools/react-96.png'
import tool3 from '../../assets/tools/tailwind-css-96.png'
import tool4 from '../../assets/tools/figma-96.png'
import tool5 from '../../assets/tools/mysql-96.png'
import tool6 from '../../assets/tools/illustrator-96.png'
import SMD from '../../assets/smd.png'
import logoex from '../../assets/logoex.png'

import home_img_1 from '../../assets/home_img_1.png'
import home_img_2 from '../../assets/home_img_2.png'
import home_img_3 from '../../assets/home_img_3.png'

import { Github, Linkedin } from "lucide-react";

function Home() {

    const navigate = useNavigate()

    return (
        <div className="bg-gray-50">
            <nav className="bg-primary-100">
                <div
                    className="container mx-auto px-6 py-2 flex justify-between items-center"
                >
                    <a
                        className="font-bold text-2xl lg:text-4xl text-primary-500 flex gap-x-2 items-center"
                        href="#"
                    >

                        <img src={logoex} height={32} width={120} />
                    </a>
                    <div className="block lg:hidden">
                        <button
                            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none"
                        >
                            <svg
                                className="fill-current h-3 w-3"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:block">
                        <ul className="inline-flex">
                            <li>
                                <a className="px-4 font-bold" href="/">Home</a>
                            </li>
                            <li>
                                <a className="px-4 hover:text-gray-500" href="#funcionalidades">Funcionalidades</a>
                            </li>
                            <li>
                                <a className="px-4 hover:text-gray-500" href="#sobrenos">Sobre nós</a>
                            </li>
                            <li>
                                <a className="px-4 hover:text-gray-500" href="#ferramentas">Ferramentas</a>
                            </li>
                            <li>
                                <Link to="/login" className="px-4 hover:text-gray-500" >Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div
                className={"py-20 xl:py-40 bg-homebg bg-center bg-cover"}
            >
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-2 text-white">
                        Precisa registrar as presenças do seu evento? Veio ao lugar certo!
                    </h2>
                    <h3 className="text-2xl mb-8 text-gray-200">
                        Eventos que nescessitam de presenças são o nosso alvo.
                    </h3>
                    <button
                        className="bg-primary-500 hover:bg-primary-700 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider" onClick={() => navigate("/login")}
                    >
                        Entrar
                    </button>
                </div>
            </div>
            <div className="bg-gray-50">
                <section className="container mx-auto px-6 p-10 xl:px-72" id="funcionalidades">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        Funcionalidades
                    </h2>
                    <div className="rounded-lg shadow-lg bg-[#F1F5F9] p-4 mb-4">
                        <div className="max-w-sm w-full lg:max-w-full lg:flex">
                            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug">
                                <img src={home_img_1} alt="" />
                            </div>
                            <div className=" p-4 flex flex-col justify-between leading-normal">
                                <div className="mb-8">

                                    <div className="text-gray-900 font-bold text-2xl mb-2">Criar seu Evento</div>
                                    <p className="text-gray-700 text-lg">Dê um título e uma capa ao seu evento, defina a data de início e término e escolha uma imagem para o banner. Você também pode incluir tags relacionadas ao seu evento. Em seguida, crie as atividades, defina os instrutores e o número de aulas para cada atividade.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg shadow-lg bg-[#F1F5F9] p-4 mb-4">
                        <div className="max-w-sm w-full lg:max-w-full lg:flex">
                            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug">
                                <img src={home_img_2} alt="" />
                            </div>
                            <div className=" p-4 flex flex-col justify-between leading-normal">
                                <div className="mb-8">

                                    <div className="text-gray-900 font-bold text-2xl mb-2">Adicionar seus inscritos</div>
                                    <p className="text-gray-700 text-lg">Inclua os nomes e e-mails das pessoas cadastradas no seu evento. Você pode adicionar vários participantes de uma vez importando uma lista com seus dados ou adicionar manualmente um participante por vez.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg shadow-lg bg-[#F1F5F9] p-4 mb-4">
                        <div className="max-w-sm w-full lg:max-w-full lg:flex">
                            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug">
                                <img src={home_img_3} alt="" />
                            </div>
                            <div className=" p-4 flex flex-col justify-between leading-normal">
                                <div className="mb-8">

                                    <div className="text-gray-900 font-bold text-2xl mb-2">Registrar as presenças</div>
                                    <p className="text-gray-700 text-lg">Para cada aula de uma atividade do seu evento, você pode registrar a presença dos participantes. Nós te ajudamos a verificar se o aluno está elegível para receber o certificado de participação, caso tenha participado de todas as aulas de uma atividade.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section className="bg-primary-500 to-gray-50" id="sobrenos">
                <div className="container mx-auto px-6 py-20">
                    <h2 className="text-4xl font-bold text-center text-gray-100 mb-8">
                        Sobre nós
                    </h2>
                    <div className="flex-wrap grid grid-cols-2 lg:grid-cols-5 gap-3 ">
                        <div className="bg-white shadow-xl rounded-lg py-3 col-span-1">
                            <div className="photo-wrapper p-2">
                                <img className="w-20 h-20 xl:h-40 xl:w-40 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe"></img>
                            </div>
                            <div className="p-2">
                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">Vitor Nascimento</h3>
                                <div className="text-center text-gray-400 text-xs font-semibold">
                                    <p>Designer</p>
                                </div>

                                <div className="w-full my-3 flex">
                                    <div className="flex mx-auto gap-x-2">
                                        <a href="#" className="rounded-full border p-2 bg-blue-600 hover:bg-blue-800 text-white">
                                            <Linkedin />
                                        </a>
                                        <a href="#" className="rounded-full border p-2 bg-slate-800 hover:bg-slate-950 text-white">
                                            <Github />
                                        </a>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="bg-white shadow-xl rounded-lg py-3 col-span-1">
                            <div className="photo-wrapper p-2">
                                <img className="w-20 h-20 xl:h-40 xl:w-40 rounded-full mx-auto" src="https://play-lh.googleusercontent.com/LeX880ebGwSM8Ai_zukSE83vLsyUEUePcPVsMJr2p8H3TUYwNg-2J_dVMdaVhfv1cHg=w240-h480-rw" alt="John Doe"></img>
                            </div>
                            <div className="p-2">
                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">Estefane Cavalcante</h3>
                                <div className="text-center text-gray-400 text-xs font-semibold">
                                    <p>Designer</p>
                                </div>

                                <div className="w-full my-3 flex">
                                    <div className="flex mx-auto gap-x-2">
                                        <a href="#" className="rounded-full border p-2 bg-blue-600 hover:bg-blue-800 text-white">
                                            <Linkedin />
                                        </a>
                                        <a href="#" className="rounded-full border p-2 bg-slate-800 hover:bg-slate-950 text-white">
                                            <Github />
                                        </a>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="bg-white shadow-xl rounded-lg py-3 col-span-1">
                            <div className="photo-wrapper p-2">
                                <img className="w-20 h-20 xl:h-40 xl:w-40 rounded-full mx-auto" src="https://wallpapers.com/images/featured-full/cool-profile-picture-87h46gcobjl5e4xu.jpg" alt="John Doe"></img>
                            </div>
                            <div className="p-2">
                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">Guilherme Gomes</h3>
                                <div className="text-center text-gray-400 text-xs font-semibold">
                                    <p>Programador</p>
                                </div>

                                <div className="w-full my-3 flex">
                                    <div className="flex mx-auto gap-x-2">
                                        <a href="#" className="rounded-full border p-2 bg-blue-600 hover:bg-blue-800 text-white">
                                            <Linkedin />
                                        </a>
                                        <a href="#" className="rounded-full border p-2 bg-slate-800 hover:bg-slate-950 text-white">
                                            <Github />
                                        </a>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="bg-white shadow-xl rounded-lg py-3 col-span-1">
                            <div className="photo-wrapper p-2">
                                <img className="w-20 h-20 xl:h-40 xl:w-40 rounded-full mx-auto" src="https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp" alt="John Doe"></img>
                            </div>
                            <div className="p-2">
                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">Emanuel Freitas</h3>
                                <div className="text-center text-gray-400 text-xs font-semibold">
                                    <p>UX</p>
                                </div>

                                <div className="w-full my-3 flex">
                                    <div className="flex mx-auto gap-x-2">
                                        <a href="#" className="rounded-full border p-2 bg-blue-600 hover:bg-blue-800 text-white">
                                            <Linkedin />
                                        </a>
                                        <a href="#" className="rounded-full border p-2 bg-slate-800 hover:bg-slate-950 text-white">
                                            <Github />
                                        </a>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="bg-white shadow-xl rounded-lg py-3 col-span-1">
                            <div className="photo-wrapper p-2">
                                <img className="w-20 h-20 xl:h-40 xl:w-40 rounded-full mx-auto" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="John Doe"></img>
                            </div>
                            <div className="p-2">
                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">Letícia Lourinho</h3>
                                <div className="text-center text-gray-400 text-xs font-semibold">
                                    <p>Gerente de Projeto</p>
                                </div>

                                <div className="w-full my-3 flex">
                                    <div className="flex mx-auto gap-x-2">
                                        <a href="#" className="rounded-full border p-2 bg-blue-600 hover:bg-blue-800 text-white">
                                            <Linkedin />
                                        </a>
                                        <a href="#" className="rounded-full border p-2 bg-slate-800 hover:bg-slate-950 text-white">
                                            <Github />
                                        </a>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-slate-800 " id="ferramentas">
                <section>
                    <div className="container mx-auto px-6 text-center py-20">
                        <h2 className="mb-6 text-4xl font-bold text-center text-white">
                            Ferramentas Utilizadas
                        </h2>
                        <div className="grid gap-3 grid-cols-6 my-20 px-4 md:px-12 lg:px-20">
                            <div className="col-span-1 mx-auto">
                                <img src={tool1}></img>
                            </div>
                            <div className="col-span-1 mx-auto">
                                <img src={tool2}></img>
                            </div>
                            <div className="col-span-1 mx-auto">
                                <img src={tool3}></img>
                            </div>
                            <div className="col-span-1 mx-auto">
                                <img src={tool4}></img>
                            </div>
                            <div className="col-span-1 mx-auto">
                                <img src={tool5}></img>
                            </div>
                            <div className="col-span-1 mx-auto">
                                <img src={tool6}></img>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <footer className="bg-primary-500 text-white">
                <div className="container mx-auto px-6 pt-10 pb-6">
                    <div className="flex flex-wrap gap-y-2">
                        <div className="w-full h-full flex items-center md:w-1/4 text-center ">
                            <a
                                className="font-bold text-2xl lg:text-4xl text-white flex gap-x-2 items-center mx-auto"
                                href="#"
                            >
                                <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
                                    <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
                                </svg>
                                FlowPass
                            </a>
                        </div>
                        <div className="w-full md:w-1/4 text-center items-center">

                            <img src={SMD} className="mx-auto w-2/5"></img>

                        </div>
                        <div className="w-full md:w-1/4 text-center ">
                            <h5 className="uppercase mb-6 font-bold">LINKS</h5>
                            <ul className="mb-4">
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="hover:underline 6hover:text-orange-500"
                                    >Facebook</a
                                    >
                                </li>
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="hover:underline 6hover:text-orange-500"
                                    >Linkedin</a
                                    >
                                </li>
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="hover:underline 6hover:text-orange-500"
                                    >Twitter</a
                                    >
                                </li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/4 text-center ">
                            <h5 className="uppercase mb-6 font-bold">CONTATOS</h5>
                            <ul className="mb-4">
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="hover:underline 6hover:text-orange-500"
                                    >About Us</a>
                                </li>
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="hover:underline 6hover:text-orange-500"
                                    >Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <br className="mt-2"></br>
                </div>
            </footer>
        </div>
    )
}

export default Home