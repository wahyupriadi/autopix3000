import React, { useState, useEffect } from "react";
import axios from "axios";

import { Row, Col, Card, Modal, Figure } from "react-bootstrap";

const PhotoGrid = props => {
  const { id } = props;
  const [Photos, setPhotos] = useState(null);
  const [show, setShow] = useState(false);
  const [photoData, setPhotoData] = useState(null);

  const getPhotos = async idAlbum => {
    console.log(idAlbum);
    const result = await axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=${idAlbum}`)
      .then(res => {
        return res.data;
      })
      .catch(e => console.log(e));
    console.log(result);
    return setPhotos(result);
  };

  const handleModal = (isShow, item) => {
    if (isShow === "true") {
      setShow(true);
      setPhotoData(item);
    } else {
      setShow(false);
      setPhotoData(null);
    }
  };

  const PhotoModal = ({ data, ...props }) => {
    return (
      <Modal {...props} centered>
        <Modal.Body>
          <Figure>
            <Figure.Image
              width={"100%"}
              height={"100%"}
              alt="171x180"
              src={data?.url}
            />
            <Figure.Caption>{data?.title}</Figure.Caption>
          </Figure>
        </Modal.Body>
      </Modal>
    );
  };

  useEffect(() => {
    getPhotos(id);
  }, [id]);

  return (
    <React.Fragment>
      <PhotoModal
        show={show}
        data={photoData}
        onHide={() => handleModal("false")}
      />
      {Photos !== null ? (
        Photos?.map(item => {
          return (
            <>
              <Col key={item.id} md={4} style={{ marginBottom: 30 }}>
                <Card style={{ height: "100%" }}>
                  <Card.Img
                    src={`${item.thumbnailUrl}`}
                    alt=""
                    onClick={() => handleModal("true", item)}
                  ></Card.Img>
                </Card>
              </Col>
            </>
          );
        })
      ) : (
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Loading photos...</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      )}
    </React.Fragment>
  );
};

export default PhotoGrid;
