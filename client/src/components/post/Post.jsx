export const Post = (props) => {
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {props.event.title}
            </th>
            <td className="px-6 py-4">
                {props.event.tag_link}
            </td>
            <td className="px-6 py-4">
                {props.event.desc}
            </td>
            <td className="px-6 py-4">
                <button onClick={() => { props.setShowModal(true); props.setEvidenceEvent(props.event.idevent) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ver</button>
            </td>
        </tr>
    )
}