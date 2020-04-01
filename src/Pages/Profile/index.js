import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Container, Row, Col, Card, Tab, Nav } from "react-bootstrap";
import { Navbar } from "../../Components";
import Post from "./Post";
import Album from "./Album";

const Profile = () => {
  let { id } = useParams();

  const [Profile, setProfile] = useState(null);

  const getProfile = async idUser => {
    const result = await axios
      .get(`https://jsonplaceholder.typicode.com/users/${idUser}`)
      .then(res => {
        return res.data;
      })
      .catch(e => console.log(e));
    return setProfile(result);
  };

  useEffect(() => {
    getProfile(id);
  }, [id]);

  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                {Profile !== null ? (
                  <>
                    <Card.Title>{Profile?.name}</Card.Title>
                    <Card.Subtitle>{Profile?.address.city}</Card.Subtitle>
                    <Card.Text>Phone: {Profile?.phone}</Card.Text>
                  </>
                ) : (
                  <Card.Text>Loading...</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 32 }}>
          <Col>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Posts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Albums</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Post id={Profile?.id} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Album id={Profile?.id} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
            <div></div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
