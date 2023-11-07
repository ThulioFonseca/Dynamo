import { useEffect, useState } from "react";
import EditableTable from "../../components/tables/EditableTable/EditableTable";
import HttpService from "../../services/HttpService";
import "./styles.css";

const style = {
  margin: "2%",
};

export default function Device() {
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);

  const loadData = async () => {
    const fetchData = async () => {
      try {
        const response = await HttpService.get("/device");
        const { inputs, outputs } = response;

        const sortedInput = inputs.sort((A,B) => A.pin - B.pin);
        const sortedOutput= outputs.sort((A,B) => A.pin - B.pin);

        setInputs(sortedInput);
        setOutputs(sortedOutput);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  };

  const editData = (payload) => {
    console.log(payload)
    const fetchData = async () => {
      try {
        const response = await HttpService.post("/device/edit", payload);
        const { inputs, outputs } = response;
        setInputs(inputs);
        setOutputs(outputs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={style}>
      {inputs && (
        <div>
          <div className="tables-labels">
            <span>Entradas</span>
          </div>
          <EditableTable nodes={inputs} onSave={editData}/>
        </div>
      )}
      <br />
      {outputs && (
        <div>
          <div className="tables-labels">
            <span>Saídas</span>
          </div>
          <EditableTable nodes={outputs} onSave={editData}/>
        </div>
      )}
    </div>
  );
}
