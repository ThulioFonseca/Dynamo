import { useEffect, useState } from "react";
import EditableTable from "../../components/tables/EditableTable/EditableTable";
import HttpService from "../../services/HttpService";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "./styles.css";

const style = {
  margin: "2%",
};

const spinnerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "inherit",
};

export default function Device() {
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEntradas, setLoadingEntradas] = useState(false);
  const [loadingSaidas, setLoadingSaidas] = useState(false);

  const handleLoadingEntrada = () => {
    setLoadingEntradas(!loadingEntradas);
  };

  const handleLoadingSaidas = () => {
    setLoadingSaidas(!loadingSaidas);
  };

  const loadData = async () => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await HttpService.get("/device");
        const { inputs, outputs } = response;

        const sortedInput = inputs.sort((A, B) => A.pin - B.pin);
        const sortedOutput = outputs.sort((A, B) => A.pin - B.pin);

        setInputs(sortedInput);
        setOutputs(sortedOutput);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  };

  const editData = (payload) => {
    const fetchData = async () => {
      try {
        const response = await HttpService.post("/device/edit", payload);
        const { inputs, outputs } = response;
        setInputs(inputs);
        setOutputs(outputs);
        setLoadingEntradas(false);
        setLoadingSaidas(false);
        toast.success(" Dados atualizados", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
        });
      } catch (error) {
        console.error(error);
        setLoadingEntradas(false);
        setLoadingSaidas(false);
        toast.error("Falha na Operação", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
        });
      }
    };

    fetchData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return loading ? (
    <div style={spinnerStyle}>
      {" "}
      <Spinner animation="border" variant="info" />
    </div>
  ) : (
    <div style={style}>
      {inputs && (
        <div>
          <div className="tables-labels">
            <span style={{ margin: "1%" }}>Entradas</span>
            {loadingEntradas && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </div>
          <EditableTable
            nodes={inputs}
            onSave={editData}
            loading={handleLoadingEntrada}
          />
        </div>
      )}
      <br />
      {outputs && (
        <div>
          <div className="tables-labels">
            <span style={{ margin: "1%" }}>Saídas</span>
            {loadingSaidas && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </div>
          <EditableTable
            nodes={outputs}
            onSave={editData}
            loading={handleLoadingSaidas}
          />
        </div>
      )}
    </div>
  );
}
