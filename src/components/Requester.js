import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requesterAction } from "../redux/actions/requester.action";
import { Form, Row, Col, Button, Card, Modal } from "react-bootstrap";
import PaginationBar from "./PaginationBar";

const Requester = () => {
  const dispatch = useDispatch();
  const requesters = useSelector((state) => state.requester.requesters.data);
  const totalPage = useSelector((state) => state.requester.totalPage);
  const singleRequester = useSelector(
    (state) => state.requester.singleRequester.data
  );
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showEdit, setShowEdit] = useState(false);
  const [target, setTarget] = useState("");
  const [formEdit, setFormEdit] = useState({
    firstname: "",
    lastname: "",
  });

  const handleEditChange = (e) => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (id) => {
    const { firstname, lastname } = formEdit;
    dispatch(
      requesterAction.updateSinlgeUser(
        id,
        { firstname, lastname },
        currentPage,
        `&email=${search}`
      )
    );
    setShowEdit(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.searching.value);
  };

  useEffect(() => {
    dispatch(
      requesterAction.getListOfRequester(currentPage, `&email=${search}`)
    );
  }, [dispatch, currentPage, search]);

  useEffect(() => {
    setFormEdit({
      firstname: singleRequester && singleRequester.data.firstname,
      lastname: singleRequester && singleRequester.data.lastname,
    });
  }, [singleRequester]);

  return (
    <div id="requester" className="requester">
      <Row>
        <Form onSubmit={handleSearchSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              name="searching"
              placeholder="Search by email + Enter"
            />
          </Form.Group>
        </Form>
      </Row>
      {requesters && requesters.data.requesters.length ? (
        <div>
          <Row className="mb-3">
            {requesters.data.requesters.map((requester) => (
              <Col key={requester._id} className="col-3">
                <Card className="w-100">
                  <Card.Body>
                    <Card.Title>
                      {requester.firstname + " " + requester.lastname}
                    </Card.Title>
                    <Card.Text>{requester.email}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowEdit(true);
                        setTarget(requester._id);
                        dispatch(
                          requesterAction.getSingleRequester(requester._id)
                        );
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
          <h4 className="text-center my-5">Requesters not found!</h4>
        </Row>
      )}

      {/* EDIT MODAL */}
      <Modal centered show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Requester</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formEdit.firstname}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formEdit.lastname}
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

export default Requester;
