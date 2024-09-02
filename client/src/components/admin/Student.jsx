import { useState } from "react"

export default function Student(props) {

    const idS = props.idstudent

    const [iniValue, setIniValue] = useState(props.inivalue)

    return (
        <div className="flex gap-3 items-center">
            <div><b>Nome:</b> {props.name}</div>
            <div><b>Email:</b> {props.email}</div>
            <input type="checkbox" onChange={() => { props.checkPresence(idS); setIniValue( iniValue == 1 ? 0 : 1 ) } } checked={iniValue == 1 ? "checked" : ""}></input>
        </div>
    )
}