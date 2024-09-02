import { useContext, useState } from "react"
import Logo from "../../assets/svg-path.svg"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"

function Login() {

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })

  const [err, setErr] = useState(null)

  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  const { login } = useContext(AuthContext)
  const {currentUser} = useContext(AuthContext)
  const {currentMonitor} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const resp = await login(inputs)
      console.log(resp)
      if(resp){
        navigate("/home/dashboard")
      }
      else{
        navigate("/monitor/dashboard")
      }
    }catch(err){
      setErr(err.reponse)
      console.log(err)
    }
  }

  return (
    <div className="flex h-screen items-center flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm min-w-80">
        <img className="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login de Administradores</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
            </div>
            <div className="mt-2">
              <input onChange={handleChange} name="username" type="username" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
            </div>
            <div className="mt-2">
              <input onChange={handleChange} name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button onClick={handleLogin} className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Entrar</button>
          </div>

          <hr></hr>

          <div>
          <button type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Entrar com Google<div></div></button>
          </div>
        </form>
        {/*}
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
  </p>{*/}
      </div>
    </div>
  )
}

export default Login
