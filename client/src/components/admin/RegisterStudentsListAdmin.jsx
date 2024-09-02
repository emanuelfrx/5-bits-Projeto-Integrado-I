import { useState } from "react";
import * as XLSX from 'xlsx';
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

function ResgisterStudentsListAdmin() {

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

  const [currentEvent2, setCurrentEvent2] = useState(null)

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
    const res = await makeRequest.post("/students/addstudents", { excelData, eventid: currentEvent2.idevent }).then((res) => {
      return res.data
    })

    document.getElementById("select_event_2").value = 0
    setCurrentEvent2(null)
  }

  return (
    <div className="wrapper mt-10 sm:mx-auto sm:w-full p-3 shadow-lg">

      <h3 className="font-bold p-2 mt-1 text-2xl">Upload de Planilha de alunos</h3>


      {
        error
          ? console.log("Something is wrong")
          : isLoading
            ? <div>Loading</div>
            : <div>
              <div className="flex items-center gap-y-2">
                <label className="text-sm font-medium leading-6 text-gray-900 mr-2">Selecione o evento:</label>
                <select id="select_event_2" defaultValue={0} name="eventid" onChange={changeSelect2} className="flex-1 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
          <form className="gap-1 flex" onSubmit={handleFileSubmit}>
            <input type="file" className="" required onChange={handleFile} />
            <button type="submit" className="rounded-sm p-2 shadow-slate-700 bg-amber-500">UPLOAD</button>
            {excelData ? <button onClick={handleSend} type="button" className="rounded-sm p-2 shadow-slate-700 bg-sky-500">ENVIAR</button> : ""}
            {typeError && (
              <div className="alert alert-danger" role="alert">{typeError}</div>
            )}
          </form>


          <div className="p-3">
            {excelData ? (
              <div className="card overflow-hidden rounded-sm border">
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
              <div className="mx-auto">No File is uploaded yet!</div>
            )}
          </div>
        </div>
        : ""}

    </div>
  );
}

export default ResgisterStudentsListAdmin;