import { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import Card from "../../components/containers/Card/Card";
import HttpService from "../../services/HttpService";
import { toast } from "react-toastify";
import { useAuth } from "../../services/AuthProvider";
import Logo_preto_sem_sombra from "../../assets/Logo_preto_sem_sombra.svg";
import "./style.css";

const spinnerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "inherit",
};


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);

    const params = {
      username: username,
      password: password,
    };

    const fetchData = async () => {
      await HttpService.post("/login", params, "multipart/form-data")
        .then((response) => {
          if (response.token) {
            login(response.token);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Credenciais inválidas!", {
            position: toast.POSITION.BOTTOM_CENTER,
            theme: "colored",
          });
          setLoading(false);
        });
    };

    fetchData();
  };

  return (
    <Container className="d-flex justify-content-md-center align-items-center">
      <Col xs={12} lg={6} className="justify-content-md-center">
        <div className="card-login m-5">
          <Row>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={Logo_preto_sem_sombra}
                className=""
                style={{
                  width: "230px",
                  height: "230px",
                  transition: "all 0.5s ease 0.0s",
                }}
              />
            </div>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} lg={8} className="mb-5">
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label style={{ color: "rgb(168, 168, 168)" }}>
                    User:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-2" controlId="formPassword">
                  <Form.Label style={{ color: "rgb(168, 168, 168)" }}>
                    Password:
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus-ring"
                  />
                </Form.Group>
                <Row>
                  <Col md={12} className="d-flex justify-content-center mt-4">
                    {loading ? (
                      <div style={spinnerStyle}>
                        {" "}
                        <Spinner animation="border" variant="info" />
                      </div>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleLogin}
                        className="btn-info col-4"
                      >
                        Login
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </Col>
    </Container>
  );
};

export default Login;
