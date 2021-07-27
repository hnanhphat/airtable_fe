import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarAction } from "../redux/actions/calendar.action";
import { Form, Row, Col, Table, Button } from "react-bootstrap";
import PaginationBar from "./PaginationBar";

const FindRequest = () => {
  const dispatch = useDispatch();
  const calendars = useSelector((state) => state.calendar.calendars.data);
  const totalPage = useSelector((state) => state.calendar.totalPage);
  const [search, setSearch] = useState({ date: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searched, setSearched] = useState(false);

  // console.log(calendars);

  const handleChange = (e) => {
    // console.log({ ...search, [e.target.name]: e.target.value });
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const { date } = search;
    dispatch(calendarAction.getListOfCalendar(currentPage, `&date=${date}`));
    setSearched(true);
  };

  const changeTime = (str, time) => {
    switch (str.length) {
      case 4:
        time = str[0] + str[1] + ":" + str[2] + str[3];
        break;
      case 3:
        time = "0" + str[0] + ":" + str[1] + str[2];
        break;
      case 2:
        time = "00:" + str[0] + str[1];
        break;
      default:
        time = "00:0" + str[0];
        break;
    }
    return time;
  };

  return (
    <Row>
      <Col xs={4}>
        <Form onSubmit={handleSearch}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              placeholder="Enter date"
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="d-block mt-3 ms-auto"
            disabled={search.date ? "" : "disabled"}
          >
            Find Request
          </Button>
        </Form>
      </Col>
      {searched ? (
        calendars && calendars.data.calendars.length ? (
          <Col xs={8}>
            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Requester</th>
                  <th>Sprayer</th>
                  <th>Drones</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {calendars.data.calendars.map((calendar, i) => (
                  <tr className="text-center" key={calendar._id}>
                    <td>{i + 1}</td>
                    <td>{`${calendar.requester.firstname} ${calendar.requester.lastname}`}</td>
                    <td>{calendar.sprayer.name}</td>
                    <td>{calendar.drones.length}</td>
                    <td>{`${changeTime(
                      calendar.start.toString()
                    )} - ${changeTime(calendar.end.toString())}`}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <PaginationBar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          </Col>
        ) : (
          <Col xs={8}>
            <h4 className="text-center">No products found</h4>
          </Col>
        )
      ) : (
        ""
      )}
    </Row>
  );
};

export default FindRequest;
