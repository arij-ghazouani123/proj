import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useNavigate, useParams } from "react-router-dom";
import InputGroup from "../components/InputGroupEvent";
import Modal from "react-modal";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    height: "600px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  },
};
function Details() {
  const [testeur, setTesteur] = useState([]);

  const [form, setForm] = useState({});
  const { id } = useParams();
  const navigate = useHistory();
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [modalIsOpenedit, setModalIsOpenedit] = useState(true);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleTesteurChange = (event) => {
    const { value } = event.target;
    console.log(event);
    setForm({
      ...form,
      Testeur: value,
    });
  };

  const loadTesteur = async () => {
    try {
      const response = await axios.get("/api/releaseTesteur");
      const testeur = response.data.map(({ user: { userName } }) => ({
        userName,
      }));
      setTesteur(testeur);
      console.log("ttttttttt", testeur);
      return testeur;
    } catch (error) {
      console.log(error.message);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formDataF = new FormData();

    formDataF.append("Testeur", formData.Testeur);

    axios
      .put(`/api/release/releaseER/${id}`, form)
      .then((res) => {
        //rederction
        navigate.push("/dashboard");
        loadRelease();
      })
      .catch((err) => setErrors(err.response.data));
  };
  const loadRelease = async () => {
    await axios.get("/api/release").then((res) => {
      setUsers(res.data);
    });
  };
  useEffect(async () => {
    await axios.get(`/api/release/${id}`).then((res) => {
      setForm(res.data);
      loadTesteur();
    });
  }, []);

  const [formData, setFormData] = useState({
    Notes: "",
    Testeur: "",
    Version: "",
    Date: "",
    errordescription: "",
  });

  return (
    <div className="container mt-4 col-12 col-lg-4">
      <Modal isOpen={modalIsOpenedit} style={customStyles}>
        <div>
          <div
            className="col-12 col-lg-8 "
            style={{ marginLeft: 140, justifyContent: "center" }}
          >
            <form onSubmit={onSubmitHandler}>
              {/* <InputGroup
                label="Notes"
                type="text"
                name="Notesdd"
                onChangeHandler={onChangeHandler}
                errors={errors.Notes}
                value={form.Notes}

              />
              <InputGroup
                label="Daten"
                type="text"
                name="Datedd"
                onChangeHandler={onChangeHandler}
                errors={errors.Date}
                value={form.Date}
                

              /> */}
              <h5>Testeur</h5>

              <InputGroup
                label="Testeur"
                type="text"
                name="Testeurdd"
                onChangeHandler={onChangeHandler}
                errors={errors.Testeur}
                value={form.Testeur}
                

              />

              <h5>Error</h5>

              <InputGroup
               style={{ width: 100, height:100 }}
                label="errordescription"
                type="text"
                name="errordescription"
                onChangeHandler={onChangeHandler}
                errors={errors.errordescription}
                value={form.errordescription}
               

              />
              <div>
                <button className="btn btn-primary" type="submit">
                  ADD ERROR
                </button>{" "}
                <button
                  onClick={() => setModalIsOpenedit(false)}
                  class="btn btn-primary"
                >
                  close{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Details;
