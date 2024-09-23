import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "flowbite-react";

function ResgisterStudentsListAdmin(props) {

  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  // onchange event
  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        }
      }
      else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else {
      console.log('Please select your file');
    }
  }

  // submit event
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data)

    }
  }

  //change event

  const [currentEvent2, setCurrentEvent2] = useState(props.event != undefined ? props.event : null)

  const { isLoading, error, data: events2 } = useQuery({
    queryKey: ["events2"],
    queryFn: async () => {
      return makeRequest.get("/events").then((res) => {
        return res.data
      })
    }
  })

  const changeSelect2 = async (e) => {
    const res = await makeRequest.get("/events/event/" + e.target.value).then((res) => {
      return res.data
    })
    setCurrentEvent2(res)
  }

  //submit list

  const handleSend = async () => {
    const res = await makeRequest.post("/students/addstudents", { excelData, eventid: currentEvent2.idevent }).then((data) => {
      toast.success(data.data)
    }).catch((err) => {
      toast.error(err.response.data)
    })

    if (props.event == undefined) {
      document.getElementById("select_event_2").value = 0
      setCurrentEvent2(null)
    }
  }

  const [showModal, setShowModal] = useState(false);

  return (

    <div className="wrapper mt-2 sm:mx-auto sm:w-full p-1 md:p-3">

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Aviso!</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 text-bold">
            Clique no botão "Cadastrar Participantes" para concluir a importação.
          </div>
        </Modal.Body>
        <Modal.Footer className=" justify-end">
          <button color="gray" className="font-bold text-gray-50 bg-primary-500 rounded-xl px-4 py-2" onClick={() => setShowModal(false)}>
            OK
          </button>
        </Modal.Footer>
      </Modal>

      <h3 className="font-bold p-2 text-2xl">Upload de Planilha de alunos</h3>


      {
        error
          ? console.log("Something is wrong")
          : isLoading
            ? <div>Loading</div>
            : <div>
              <div className="flex items-center gap-y-2">
                <label className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 mr-2">Selecione o evento:</label>
                <select id="select_event_2" defaultValue={props.event != undefined ? props.event.idevent : 0} name="eventid" onChange={changeSelect2} className="flex-1 rounded-md border-0 py-1.5 px-1.5 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" disabled={props.event != undefined ? "disabled" : ""}>
                  <option key="0" value="0" disabled>Selecione</option>
                  {events2.map((event) => (
                    <option key={event.idevent} value={event.idevent}>{event.title}</option>
                  ))}
                </select>
              </div>
            </div>
      }

      {currentEvent2 != null ?
        <div>
          <form className="p-3 md:p-1 mt-2 md:mt-4 gap-1 md:gap-3 flex flex-col md:flex-row" onSubmit={handleFileSubmit}>
            <input type="file" className="md:w-1/2 file:bg-secondary-500 hover:file:bg-primary-400 bg-white dark:bg-neutral-900 appearance-none  border border-gray-200 dark:border-gray-700  rounded-lg w-full py-2 px-4 text-gray-600 dark:text-gray-200 leading-tight focus:outline-none focus:bg-white" required onChange={handleFile} />
            <button type="submit" onClick={()=>setShowModal(true)} className="rounded-lg text-white p-2 shadow-slate-700 bg-secondary-500 hover:bg-secondary-700">Vizualizar Planilha</button>
            {excelData ? <button onClick={handleSend} type="button" className="rounded-lg text-white p-2 shadow-slate-700 bg-primary-500 hover:bg-primary-700">Cadastrar Participantes</button> : <button type="button" className="rounded-lg text-white p-2 shadow-slate-700 bg-gray-400 hover:cursor-default">Cadastrar Participantes</button>}
            {typeError && (
              <div className="alert alert-danger" role="alert">{typeError}</div>
            )}
          </form>


          <div className="p-3 md:p-1 mt-2 md:mt-4">
            {excelData ? (
              <div className="card overflow-hidden rounded-sm border p-3 md:p-1">
                <table className="mx-auto min-w-full divide-y">

                  <thead>
                    <tr>
                      {Object.keys(excelData[0]).map((key) => (
                        <th key={key} scope="col" className="px-6 py-3 text-start text-sm">{key}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {excelData.map((individualExcelData, index) => (
                      <tr key={index}>
                        {Object.keys(individualExcelData).map((key) => (
                          <td key={key} className="px-6 py-4 whitespace-nowrap text-sm font-medium">{individualExcelData[key]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            ) : (
              <div className="mx-auto md:visible">Nenhum Arquivo Enviado Ainda</div>
            )}
          </div>
        </div>
        : ""}

    </div>
  );
}

export default ResgisterStudentsListAdmin;