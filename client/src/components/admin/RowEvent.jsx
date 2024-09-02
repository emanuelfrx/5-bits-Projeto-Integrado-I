import { useNavigate } from "react-router-dom";

export const RowEvent = (props) => {

    const navigate = useNavigate()

    const getStatus = (date_ini, date_end) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        if( date_ini > today ){
            return "Pendente"
        } else if( date_ini <= today && today <= date_end ){
            return "Ativo"
        } else{
            return "Finalizado"
        }
    }

    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {props.event.title}
            </th>
            <td className="px-6 py-4">
                {props.event.tag_link}
            </td>
            <td className="px-6 py-4">
                {getStatus(props.event.date_ini, props.event.date_end)}
            </td>
            <td className="px-6 py-4">
                <button onClick={() => { props.setShowModal(true); props.setEvidenceEvent(props.event.idevent); props.setEvidenceEventName(props.event.title) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Atividades</button>
                <button onClick={() => { props.setShowModalMonitor(true); props.setEvidenceEvent(props.event.idevent); props.setEvidenceEventName(props.event.title) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Monitores</button>
                <button onClick={() => { navigate("../updateevent/" + props.eventid) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</button>
            </td>
        </tr>
    )
}