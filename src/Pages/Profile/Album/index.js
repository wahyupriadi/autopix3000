import React, { useState, useEffect } from "react";
import axios from "axios";

import { Row, Col, Card } from "react-bootstrap";

const Album = props => {
  const { id } = props;
  const [Albums, setAlbums] = useState(null);

  const getAlbums = async idUser => {
    const result = await axios
      .get(`https://jsonplaceholder.typicode.com/albums?userId=${idUser}`)
      .then(res => {
        return res.data;
      })
      .catch(e => console.log(e));
    return setAlbums(result);
  };

  useEffect(() => {
    getAlbums(id);
  }, [id]);

  return (
    <Row>
      {Albums !== null &&
        Albums.map(item => {
          return (
            <Col key={item.id} md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
};

export default Album;
