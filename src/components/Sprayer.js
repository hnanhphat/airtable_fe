import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sprayerAction } from "../redux/actions/sprayer.action";
import { Form, Row, Col, Button, Card, Modal } from "react-bootstrap";
import PaginationBar from "./PaginationBar";

const Sprayer = () => {
  const dispatch = useDispatch();
  const sprayers = useSelector((state) => state.sprayer.sprayers.data);
  const totalPage = useSelector((state) => state.sprayer.totalPage);
  const singleSprayer = useSelector(
    (state) => state.sprayer.singleSprayer.data
  );
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showCreate, setShowCreate] = useState(false);
  const [formCreate, setFormCreate] = useState({
    name: "",
    description: "",
  });

  const [showEdit, setShowEdit] = useState(false);
  const [target, setTarget] = useState("");
  const [formEdit, setFormEdit] = useState({
    name: "",
    description: "",
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
    const { name, description } = formCreate;
    dispatch(
      sprayerAction.createSprayer(
        { name, description },
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
      sprayerAction.updateSinlgeSprayer(
        id,
        { name, description },
        currentPage,
        `&name=${search}`
      )
    );
    setShowEdit(false);
  };

  useEffect(() => {
    dispatch(sprayerAction.getListOfSprayer(currentPage, `&name=${search}`));
  }, [dispatch, currentPage, search]);

  useEffect(() => {
    setFormEdit({
      name: singleSprayer && singleSprayer.data.name,
      description: singleSprayer && singleSprayer.data.description,
    });
  }, [singleSprayer]);

  return (
    <div id="sprayer" className="sprayer">
      <Row>
        <Col sm={1}>
          <Button variant="primary w-100" onClick={() => setShowCreate(true)}>
            +
          </Button>
        </Col>
        <Col sm={11}>
          <Form onSubmit={handleSearchSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                name="searching"
                placeholder="Search by name + Enter"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {sprayers && sprayers.data.sprayers.length ? (
        <div>
          <Row className="mb-3">
            {sprayers.data.sprayers.map((sprayer) => (
              <Col key={sprayer._id} className="col-3">
                <Card className="w-100">
                  <Card.Body>
                    <Card.Title>{sprayer.name}</Card.Title>
                    <Card.Text>{sprayer.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowEdit(true);
                        setTarget(sprayer._id);
                        dispatch(sprayerAction.getSingleSprayer(sprayer._id));
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
          <h4 className="text-center my-5">Sprayers not found!</h4>
        </Row>
      )}

      {/* CREATE SPRAYER */}
      <Modal centered show={showCreate} onHide={() => setShowCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Sprayer</Modal.Title>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCreateSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* EDIT SPRAYER */}
      <Modal centered show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Sprayer</Modal.Title>
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

export default Sprayer;
