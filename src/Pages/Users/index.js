import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { Container, Row, Col, Card } from "react-bootstrap";
import { Navbar } from "../../Components";

const Users = () => {
  const [Userlist, setUserlist] = useState([]);

  const getUsers = async () => {
    const result = await Axios.get(
      "https://jsonplaceholder.typicode.com/users"
    ).then(res => setUserlist(res.data));
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
        <Row>
          <Col>
            <Suspense fallback={loadingImg}>
              {Userlist.map(item => {
                return (
                  <Card key={item.id} style={{ marginBottom: 8 }}>
                    <Link key={item.id} to={`/profile/${item.id}`}>
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Subtitle>{item.address.city}</Card.Subtitle>
                      </Card.Body>
                    </Link>
                  </Card>
                );
              })}
            </Suspense>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Users;
