import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ResgisterStudent from "../../components/home/RegisterStudent"

function NewStudent() {
    const { tag_link } = useParams()

    const request = {
        tag_link: tag_link
    }

    const [tag, setTag] = useState(null)

    const getTag = async () => {
        try {
            const res = await axios.post("http://localhost:8800/api/events/check", request);
            setTag(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTag();
    }, [setTag]);


    return (
        <div className="flex items-center h-screen">
            {tag == null ? "Tag não encontrada" :
               <ResgisterStudent tag={tag} />
            }
        </div>
    )
}

export default NewStudent