import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { Container, Row, Col, Card } from "react-bootstrap";
import { Navbar } from "../../Components";

const currentUser = {
  name: "account_0",
  email: "account.0@mail.com"
};

const Users = () => {
  const [Userlist, setUserlist] = useState([]);

  const getUsers = async () => {
    const result = await Axios.get("http://localhost:3004/users").then(res =>
      setUserlist(res.data)
    );
    return result;
  };

  useEffect(() => {
    getUsers();
  }, []);

  const loadingImg = (
    <div className="album-img">
      <img
        alt="loading"
        src="https://media.giphy.com/media/y1ZBcOGOOtlpC/200.gif"
      />
    </div>
  );

  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Row className="mt-4">
          <Col>
            <h3>User List</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            {Userlist !== null ? (
              Userlist?.map(item => {
                return (
                  <Card key={item.id} className="mt-2">
                    <Link key={item.id} to={`/profile/${item.id}`}>
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Subtitle>{item.address.city}</Card.Subtitle>
                      </Card.Body>
                    </Link>
                  </Card>
                );
              })
            ) : (
              <Card>
                <Card.Body>
                  <Card.Title>loading users....</Card.Title>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export { currentUser };
export default Users;
