import { useContext, useState } from "react"
import LogoVite from "../../assets/vite.svg"
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
        <img className="mx-auto h-10 w-auto" src={LogoVite} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login for Admin</h2>
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
              <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div className="mt-2">
              <input onChange={handleChange} name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button onClick={handleLogin} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
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
