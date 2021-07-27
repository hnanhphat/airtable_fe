import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarAction } from "../redux/actions/calendar.action";
import { Form, Row, Col, Badge, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const AddRequest = () => {
  const dispatch = useDispatch();
  const drones = useSelector((state) => state.drone.drones.data);
  const sprayers = useSelector((state) => state.sprayer.sprayers.data);
  const requester = useSelector((state) => state.requester.requester.data);
  const custom = useSelector((state) => state.calendar.custom.data);
  const [searched, setSearched] = useState(false);
  const [create, setCreate] = useState({
    requester: "",
    sprayer: "",
    drones: [],
    start: "",
    end: "",
    date: "",
  });

  // console.log(custom);

  const handleChange = (e) => {
    // console.log({ ...create, [e.target.name]: e.target.value });
    setCreate({ ...create, [e.target.name]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const { requester, sprayer, drones, start, end, date } = create;
    console.log({ requester, sprayer, drones, start, end, date });
    dispatch(
      calendarAction.createCalendar({
        requester,
        sprayer,
        drones,
        start: parseInt(start.replace(":", "")),
        end: parseInt(end.replace(":", "")),
        date,
      })
    );
  };

  useEffect(() => {
    if (create.date && create.start && create.end) {
      if (
        parseInt(create.start.replace(":", "")) <
        parseInt(create.end.replace(":", ""))
      ) {
        setSearched(true);
        const { date, start, end } = create;
        dispatch(
          calendarAction.getCustomList(
            `?date=${date}&start=${parseInt(
              start.replace(":", "")
            )}&end=${parseInt(end.replace(":", ""))}`
          )
        );
      } else {
        toast.error("Start time must less than end time!");
      }
    }
  }, [create, dispatch]);

  useEffect(() => {
    setCreate({
      requester: requester && requester._id,
      sprayer: sprayers && sprayers.data.sprayers[0]._id,
      drones: [],
      start: "",
      end: "",
      date: "",
    });
  }, [requester, sprayers]);

  return (
    <Form onSubmit={handleCreate}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          placeholder="Enter date"
          onChange={handleChange}
        />
      </Form.Group>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              name="start"
              placeholder="Enter date"
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              name="end"
              placeholder="Enter date"
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      {searched ? (
        custom && custom.customSprayer.length && custom.customDrone.length ? (
          <div>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Sprayers{" "}
                    <Badge bg="primary">
                      {custom.customSprayer.length} available
                    </Badge>
                  </Form.Label>
                  <Form.Select onChange={handleChange}>
                    {custom.customSprayer.map((sprayer) => (
                      <option key={sprayer._id} value={sprayer._id}>
                        {sprayer.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Drones{" "}
                    <Badge bg="primary">
                      {drones.data.drones.length} available
                    </Badge>
                  </Form.Label>
                  <div>
                    {custom.customDrone.map((drone, i) => (
                      <Form.Check
                        key={drone._id}
                        inline
                        label={i + 1}
                        name="drones"
                        type="checkbox"
                        id={`checkbox-${i + 1}`}
                        value={drone._id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCreate({
                              ...create,
                              [e.target.name]: [
                                ...create.drones,
                                e.target.value,
                              ],
                            });
                          } else {
                            setCreate({
                              ...create,
                              [e.target.name]: create.drones.filter(
                                (drone) => drone !== e.target.value
                              ),
                            });
                          }
                        }}
                      />
                    ))}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="primary"
              type="submit"
              className="d-block mt-3 ms-auto"
              disabled={
                create.requester &&
                create.sprayer &&
                create.drones.length &&
                create.start &&
                create.end &&
                create.date
                  ? ""
                  : "disabled"
              }
            >
              Create Request
            </Button>
          </div>
        ) : (
          <Row>
            <h4 className="text-center my-5">
              All Sprayers or Drones are busy!
            </h4>
          </Row>
        )
      ) : (
        ""
      )}
    </Form>
  );
};

export default AddRequest;
