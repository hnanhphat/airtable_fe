import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { droneAction } from "../redux/actions/drone.action";
import { Form, Row, Col, Button, Card, Modal } from "react-bootstrap";
import PaginationBar from "./PaginationBar";

const Drone = () => {
  const dispatch = useDispatch();
  const drones = useSelector((state) => state.drone.drones.data);
  const totalPage = useSelector((state) => state.drone.totalPage);
  const singleDrone = useSelector((state) => state.drone.singleDrone.data);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showCreate, setShowCreate] = useState(false);
  const [formCreate, setFormCreate] = useState({
    name: "",
    description: "",
    category: "",
  });

  const [showEdit, setShowEdit] = useState(false);
  const [target, setTarget] = useState("");
  const [formEdit, setFormEdit] = useState({
    name: "",
    description: "",
    category: "",
  });

  // SEARCH
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.searching.value);
  };

  // CREATE
  const handleCreateChange = (e) => {
    setFormCreate({ ...formCreate, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = () => {
    const { name, description, category } = formCreate;
    dispatch(
      droneAction.createDrone(
        { name, description, category },
        currentPage,
        `&name=${search}`
      )
    );
    setShowCreate(false);
  };

  // EDIT
  const handleEditChange = (e) => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (id) => {
    const { name, description } = formEdit;
    dispatch(
      droneAction.updateSinlgeDrone(
        id,
        { name, description },
        currentPage,
        `&name=${search}`
      )
    );
    setShowEdit(false);
  };

  useEffect(() => {
    dispatch(droneAction.getListOfDrone(currentPage, `&name=${search}`));
  }, [dispatch, currentPage, search]);

  useEffect(() => {
    setFormEdit({
      name: singleDrone && singleDrone.data.name,
      description: singleDrone && singleDrone.data.description,
      category: singleDrone && singleDrone.data.category,
    });
  }, [singleDrone]);

  return (
    <div id="drone" className="drone">
      <Row>
        <Col sm={1}>
          <Button variant="primary w-100" onClick={() => setShowCreate(true)}>
            +
          </Button>
        </Col>
        <Col sm={11}>
          <Form onSubmit={handleSearchSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {drones && drones.data.drones.length ? (
        <div>
          <Row className="mb-3">
            {drones.data.drones.map((drone) => (
              <Col key={drone._id} className="col-3">
                <Card className="w-100">
                  <Card.Body>
                    <Card.Title>{drone.name}</Card.Title>
                    <Card.Text>{drone.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowEdit(true);
                        setTarget(drone._id);
                        dispatch(droneAction.getSingleDrone(drone._id));
                      }}
                    >
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <PaginationBar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        </div>
      ) : (
        <Row>
          <h4 className="text-center my-5">Drones not found!</h4>
        </Row>
      )}

      {/* CREATE DRONE */}
      <Modal centered show={showCreate} onHide={() => setShowCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Drone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleCreateChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                onChange={handleCreateChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Category"
                onChange={handleCreateChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCreateSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* EDIT DRONE */}
      <Modal centered show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Drone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={formEdit.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                value={formEdit.description}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Category"
                value={formEdit.category}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleEditSubmit(target)}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Drone;
