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

import { Github, Linkedin } from "lucide-react";

function Home() {
    return (
        <div className="bg-gray-50">
            <nav>
                <div
                    className="container mx-auto px-6 py-2 flex justify-between items-center"
                >
                    <a
                        className="font-bold text-2xl lg:text-4xl text-green-500 flex gap-x-2 items-center"
                        href="#"
                    >
                        <svg className="fill-green-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
                            <path d="m 96.678337,68.804586 a 59.196552,59.196548 0 0 0 -59.196387,59.196384 59.196552,59.196548 0 0 0 0.01499,0.20929 c 15.525014,4.7794 32.653724,12.52594 42.340568,24.91889 2.626209,3.35987 5.085038,7.34818 7.379395,11.74502 l 23.291597,-60.35135 -7.50445,-2.85306 26.18083,-23.130368 A 59.196552,59.196548 0 0 0 96.678337,68.804586 Z m 34.107483,10.835514 4.50721,34.30488 -7.82329,-2.97398 -29.37857,76.12559 a 59.196552,59.196548 0 0 0 57.78355,-59.09562 59.196552,59.196548 0 0 0 -25.0889,-48.36087 z m -90.546932,66.00062 a 59.196552,59.196548 0 0 0 37.233903,38.21627 c -3.421821,-7.27307 -7.334153,-14.00261 -11.865943,-19.4448 -6.546403,-8.18983 -15.69926,-14.26191 -25.36796,-18.77147 z" />
                        </svg>
                        FlowPass
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
                                <a className="px-4 hover:text-gray-100" href="#funcionalidades">Funcionalidades</a>
                            </li>
                            <li>
                                <a className="px-4 hover:text-gray-100" href="#sobrenos">Sobre nós</a>
                            </li>
                            <li>
                                <a className="px-4 hover:text-gray-100" href="#ferramentas">Ferramentas</a>
                            </li>
                            <li>
                                <Link to="/login" className="px-4 hover:text-gray-100" >Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div
                className={"py-20 xl:py-40 bg-homebg bg-center bg-cover"}
            >
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-2 text-white">
                        Uma Maneira Simples de Administrar Eventos!
                    </h2>
                    <h3 className="text-2xl mb-8 text-gray-200">
                        Eventos que nescessitam de presenças são o nosso alvo.
                    </h3>
                    <button
                        className="bg-green-400 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider"
                    >
                        Entrar
                    </button>
                </div>
            </div>
            <div className="bg-gray-50">
                <section className="container mx-auto px-6 p-10" id="funcionalidades">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        Funcionalidades
                    </h2>
                    <div className="flex items-center flex-wrap mb-20">
                        <div className="w-full md:w-1/3">
                            <img src={People} className="w-1/2 ml-auto" alt="Monitoring" />
                        </div>
                        <div className="w-full md:w-2/3">
                            <h4 className="text-3xl text-gray-800 font-bold mb-3">
                                Adicionar Eventos Personalizaveis
                            </h4>
                            <p className="6mb-8">
                                Our Smart Health Monitoring Wristwatch is able to capture you vitals
                                while you exercise. You can create different category of exercises
                                and can track your vitals on the go.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center flex-wrap mb-20">
                        <div className="w-full md:w-1/3">
                            <img src={Lectures} className="w-1/2 ml-auto" alt="Reporting" />
                        </div>
                        <div className="w-full md:w-2/3">
                            <h4 className="text-3xl text-gray-800 font-bold mb-3">
                                Criar aulas e atividades
                            </h4>
                            <p className="6mb-8">
                                Our Smart Health Monitoring Wristwatch can generate a comprehensive
                                report on your vitals depending on your settings either daily,
                                weekly, monthly, quarterly or yearly.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center flex-wrap mb-20">
                        <div className="w-full md:w-1/3">
                            <img src={Presences} className="w-2/5 ml-auto mr-2" />
                        </div>
                        <div className="w-full md:w-2/3">
                            <h4 className="text-3xl  text-gray-800 font-bold mb-3">
                                Marcar presenças
                            </h4>
                            <p className="6mb-8">
                                Our Smart Health Monitoring Wristwatch allows you to sync data
                                across all your mobile devices whether iOS, Android or Windows OS
                                and also to your laptop whether MacOS, GNU/Linux or Windows OS.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <section className="bg-gradient-to-b from-green-500 to-gray-50" id="sobrenos">
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
                                    <p>nao sei</p>
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
            <footer className="bg-green-500 text-white">
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