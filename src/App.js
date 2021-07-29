import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useSelector } from "react-redux";
import { Container, Tabs, Tab } from "react-bootstrap";

// COMPONENTS
import AddRequest from "./components/AddRequest";
import AlertMsg from "./components/AlertMsg";
import Drone from "./components/Drone";
import FindRequest from "./components/FindRequest";
import Header from "./components/Header";
import Requester from "./components/Requester";
import Sprayer from "./components/Sprayer";

function App() {
  const requester = useSelector((state) => state.requester.requester.data);
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <div className="App">
      <Header />
      <AlertMsg />
      <div id="home">
        <Container>
          <h2 className="text-center my-5">Request Management</h2>
          {isAuth && requester && requester.role === "Admin" ? (
            <Tabs
              defaultActiveKey="add"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="add" title="Add Request">
                <h3 className="text-center my-4">Add Request</h3>
                <AddRequest />
              </Tab>
              <Tab eventKey="find" title="Find Request">
                <h3 className="text-center my-4">Find Request</h3>
                <FindRequest />
              </Tab>
              <Tab eventKey="requesters" title="Requester">
                <h3 className="text-center my-4">Requester</h3>
                <Requester />
              </Tab>
              <Tab eventKey="sprayers" title="Sprayers">
                <h3 className="text-center my-4">Sprayers</h3>
                <Sprayer />
              </Tab>
              <Tab eventKey="drones" title="Drones">
                <h3 className="text-center my-4">Drones</h3>
                <Drone />
              </Tab>
            </Tabs>
          ) : !isAuth ? (
            <Tabs
              defaultActiveKey="find"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="find" title="Find Request">
                <h3 className="text-center my-4">Find Request</h3>
                <FindRequest />
              </Tab>
            </Tabs>
          ) : requester && requester.role !== "Admin" ? (
            <Tabs
              defaultActiveKey="add"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="add" title="Add Request">
                <h3 className="text-center my-4">Add Request</h3>
                <AddRequest />
              </Tab>
              <Tab eventKey="find" title="Find Request">
                <h3 className="text-center my-4">Find Request</h3>
                <FindRequest />
              </Tab>
            </Tabs>
          ) : (
            ""
          )}
        </Container>
      </div>
    </div>
  );
}

export default App;
