import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";

import { Row, Col, Card, Button } from "react-bootstrap";
const PhotoGrid = lazy(() => import("../PhotoGrid"));

const Album = props => {
  const { id } = props;
  const [Albums, setAlbums] = useState(null);
  const [GridActive, setGridActive] = useState(false);
  const [idAlbum, setIdAlbum] = useState(null);

  const getAlbums = async idUser => {
    const result = await axios
      .get(`http://localhost:3004/albums?userId=${idUser}`)
      .then(res => {
        return res.data;
      })
      .catch(e => console.log(e));
    return setAlbums(result);
  };

  const handleAlbumClick = (isActive, id) => {
    if (isActive === true) {
      setGridActive(true);
      setIdAlbum(id);
    } else {
      setGridActive(false);
      setIdAlbum(null);
    }
  };

  useEffect(() => {
    getAlbums(id);
  }, [id]);

  return (
    <React.Fragment>
      {GridActive && (
        <Row style={{ marginBottom: 16 }}>
          <Col>
            <Button onClick={() => handleAlbumClick(false)}>
              Back to Album List
            </Button>
          </Col>
        </Row>
      )}
      <Row>
        {GridActive ? (
          <Suspense fallback={<div>Loading...</div>}>
            <PhotoGrid id={idAlbum} />
          </Suspense>
        ) : Albums !== null ? (
          Albums?.map(item => {
            return (
              <Col
                key={item.id}
                md={4}
                style={{ height: 150, marginBottom: 30 }}
              >
                <Card
                  style={{ height: "100%" }}
                  onClick={() => handleAlbumClick(true, item.id)}
                >
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Loading albums...</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
};

export default Album;
