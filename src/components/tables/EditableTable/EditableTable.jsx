import { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { ICONS, SELECT_SIGNAL_TYPE } from "../../../util/const";
import "./style.css";

const cellStyle = {
  color: "rgb(168, 168, 168)",
  fontWeight: 200,
  borderColor: "#505458",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
};

const tableHeadStyle = {
  color: "#64696f",
};

export default function EditableTable(props) {
  const { nodes } = props;
  const [nodesData, setNodesData] = useState([...nodes]);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    setNodesData(nodes);
  }, [nodes]);

  // Função para ativar o modo de edição para uma linha
  const activateEditMode = (itemId) => {
    setEditItemId(itemId);
  };

  // Função para desativar o modo de edição
  const deactivateEditMode = () => {
    setEditItemId(null);
  };

  // Função para salvar as alterações na linha
  const saveChanges = (idItemToSave) => {
    props.loading();
    const itemToSave = nodesData.find((node) => node.id === idItemToSave);
    props.onSave(itemToSave);
    deactivateEditMode();
  };

  const handleValueChange = (id, key, value) => {
    const updatedNodesData = [...nodesData];

    const nodeIndex = updatedNodesData.findIndex((node) => node.id === id);

    if (nodeIndex !== -1) {
      updatedNodesData[nodeIndex][key] = value;

      setNodesData(updatedNodesData);
    }
  };

  return (
    <Table
      size={"sm"}
      striped
      bordered
      hover
      variant="dark"
      className="table-output"
    >
      <thead>
        <tr>
          <th style={tableHeadStyle}>Label</th>
          <th style={tableHeadStyle}>Pin</th>
          <th style={tableHeadStyle}>Low scale limit</th>
          <th style={tableHeadStyle}>High scale limit</th>
          <th style={tableHeadStyle}>Units</th>
          <th style={tableHeadStyle}>Type</th>
          <th style={tableHeadStyle}>Signal Type</th>
          <th style={tableHeadStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {nodesData.map((item, _key) => (
          <tr key={item.id}>
            <td
              style={{
                ...cellStyle,
                width: "15%",
              }}
            >
              <div
                style={{
                  ...cellStyle,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {editItemId === item.id ? (
                  <Form.Control
                    type="text"
                    size={"sm"}
                    value={item.label}
                    className="bg-dark"
                    onChange={(e) =>
                      handleValueChange(item.id, "label", e.target.value)
                    }
                    style={{ ...cellStyle, width: "60%" }}
                  />
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
            </td>
            <td style={{ ...cellStyle, width: "8%" }}>{item.pin}</td>
            <td
              style={{
                ...cellStyle,
                width: "15%",
              }}
            >
              <div
                style={{
                  ...cellStyle,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {editItemId === item.id ? (
                  <Form.Control
                    type="text"
                    size={"sm"}
                    value={item.minValue}
                    className="bg-dark"
                    onChange={(e) =>
                      handleValueChange(
                        item.id,
                        "minValue",
                        parseInt(e.target.value)
                      )
                    }
                    style={{ ...cellStyle, width: "60%" }}
                  />
                ) : (
                  <span>{item.minValue}</span>
                )}
              </div>
            </td>
            <td style={{ ...cellStyle, width: "15%" }}>
              <div
                style={{
                  ...cellStyle,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {editItemId === item.id ? (
                  <Form.Control
                    type="text"
                    value={item.maxValue}
                    size={"sm"}
                    className="bg-dark"
                    onChange={(e) =>
                      handleValueChange(
                        item.id,
                        "maxValue",
                        parseInt(e.target.value)
                      )
                    }
                    style={{ ...cellStyle, width: "60%" }}
                  />
                ) : (
                  <span>{item.maxValue}</span>
                )}
              </div>
            </td>
            <td
              style={{
                ...cellStyle,
                width: "15%",
              }}
            >
              <div
                style={{
                  ...cellStyle,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {editItemId === item.id ? (
                  <Form.Control
                    type="text"
                    size={"sm"}
                    value={item.unit}
                    className="bg-dark"
                    onChange={(e) =>
                      handleValueChange(item.id, "unit", e.target.value)
                    }
                    style={{ ...cellStyle, width: "60%" }}
                  />
                ) : (
                  <span>{item.unit}</span>
                )}
              </div>
            </td>
            <td style={{ ...cellStyle, width: "15%" }}>{item.type}</td>
            <td
              style={{
                ...cellStyle,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {editItemId === item.id ? (
                  <Form.Select
                    value={item.signalType}
                    className="bg-dark"
                    size={"sm"}
                    onChange={(e) =>
                      handleValueChange(item.id, "signalType", e.target.value)
                    }
                    style={{
                      ...cellStyle,
                      width: "80%",
                      textAlign: "initial",
                    }}
                  >
                    {SELECT_SIGNAL_TYPE.map((item, _key) => (
                      <option key={item.label} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                ) : (
                  <span>{item.signalType}</span>
                )}
              </div>
            </td>
            <td
              style={{
                ...cellStyle,
              }}
            >
              {editItemId === item.id ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    className="material-icons"
                    style={{
                      fontSize: "1vw",
                      cursor: "pointer",
                      color: "rgba(163, 42, 255, 1)",
                    }}
                    onClick={() => {saveChanges(item.id)}}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveChanges(item.id);
                      }
                    }}
                    tabIndex={0}
                  >
                    {ICONS.SAVE}
                  </span>
                </div>
              ) : (
                <div
                  className="row-cols-2"
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="col-4">
                    <span
                      className="material-icons-outlined"
                      style={{
                        fontSize: "1vw",
                        cursor: "pointer",
                        color: "rgba(29, 185, 255, 1)",
                      }}
                      onClick={() => activateEditMode(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          activateEditMode(item.id);
                        }
                      }}
                      tabIndex={0}
                    >
                      {ICONS.EDIT}
                    </span>
                  </div>
                  {/* <div className="col-4">
                    <span
                      className="material-icons-outlined"
                      style={{
                        fontSize: "1vw",
                        cursor: "pointer",
                        color: "rgba(255, 42, 97, 1)",
                      }}
                      onClick={{}}
                    >
                      {ICONS.DELETE}
                    </span>
                  </div> */}
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

EditableTable.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      pin: PropTypes.number.isRequired,
      minValue: PropTypes.number.isRequired,
      maxValue: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      signalType: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSave: PropTypes.func.isRequired,
};
