import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavBar from "./NavBar";
import { Card } from "react-bootstrap";



function App() {
  const [num, setNum] = useState(0);
  const [pokList, setPokList] = useState([]);
  useEffect(() => {
    console.log("start ");
    async function fetchData() {
      const request = await getPokemonPage(num, 20);
      const json = await request.json();
      setPokList(await json.results);
      return request;
    }
    fetchData();
  }, [num]);

  let pokComponents = [];
  for (let i = 0; i < pokList.length; i++) {
    pokComponents.push(
      <Widget
        key={i}
        num={i + 1 + num}
        name={pokList[i].name}
        url={pokList[i].url}
      />
    );
  }

  function nextButtonHandler() {
    console.log(num);
    setNum(num + 20);
  }

  function previousButtonHandler() {
    console.log(num);
    if (num - 20 >= 0) setNum(num - 20);
  }

  return (
    <><NavBar/>
    <div className="container">
      <div className="row">{pokComponents}</div>
      <div className="row">
        <div className="col text-center">
          <button
            className="btn btn-dark"
            onClick={() => previousButtonHandler()}
          >
            Previous
          </button>
          <button
            className="btn btn-dark ms-4"
            onClick={() => nextButtonHandler()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </>
  );
}


function Widget({ num, name, url }) {
  const [pok, setPok] = useState({});
  const [image, setImage] = useState("");
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      setPok(data);
      setImage(data.sprites.front_default);
      setTypes(data.types.map(type => type.type.name));
      setStats(data.stats);
      setAbilities(data.abilities.map(ability => ability.ability.name));
    }
    fetchData();
  }, [url]);

  return (
    <div className="col-12 col-md-3 col-lg-2 p-2">
      <div className="bg-light rounded-5 shadow pt-4 pb-2">
        <div className="col">
          <span className="text-dark">#{num}</span>
          <p className="fw-bold fs-6">{name}</p>
        </div>
        <img className="col text-end align-bottom pe-3" src={image} width="100%" alt="" style={{objectFit: "cover"}} />
        <div className="card-footer text-center">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            View Details
          </Button>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <img className="col-12 col-md-4 mb-4 mb-md-0" src={image} width="100%" alt="" style={{objectFit: "cover"}} />
            <div className="col-12 col-md-8">
              <p className="fs-6">
                <span className="fw-bold text-uppercase">Type:</span>{" "}
                {types.join(" | ")}
              </p>
              <p className="fs-6">
                <span className="fw-bold text-uppercase">Stats:</span>
                {stats.map(stat => (
                  <p key={stat.stat.name}>
                    <span className="fw-bold text-capitalize">{stat.stat.name}:</span> {stat.base_stat}
                  </p>
                ))}
              </p>
              <p className="fs-6">
                <span className="fw-bold text-uppercase">Abilities:</span>{" "}
                {abilities.join(" | ")}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}









async function getPokemonPage(offset, limit) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );
  return response;
}


export default App;
