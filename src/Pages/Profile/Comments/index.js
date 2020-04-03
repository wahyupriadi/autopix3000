import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card, Form, ListGroup, Button, Modal } from "react-bootstrap";
import { currentUser } from "../../Users";

const CommentModal = ({ data, type, onSubmit, ...props }) => {
  const [input, setInput] = useState(null);

  useEffect(() => {
    setInput(data);
  }, [data]);

  return (
    <Modal {...props} centered>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Add/Edit Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              defaultValue={data?.body}
              onChange={e => setInput({ ...data, body: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" onClick={() => onSubmit(type, input)}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const ConfirmModal = props => {
  return (
    <Modal {...props} centered>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="danger" size="sm" className="mr-2">
          No
        </Button>
        <Button variant="success" size="sm">
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Comments = ({ data, ...props }) => {
  const { id } = data;
  const [comments, setComments] = useState(null);
  const [selected, setSelected] = useState(null);

  const getComments = async idPost => {
    const result = await axios
      .get(`http://localhost:3004/posts/${idPost}/comments`)
      .then(res => {
        return res.data;
      })
      .catch(e => console.log(e));
    return setComments(result);
  };

  const handleDelete = async idComment => {
    await axios
      .delete(`http://localhost:3004/comments/${idComment}`)
      .then(() => getComments(id));
  };

  const processInput = async (type, payload) => {
    if (type === "PUT_COMMENT") {
      await axios
        .put(`http://localhost:3004/comments/${payload.id}`, payload)
        .then(() => getComments(id));
      setSelected(null);
    }

    if (type === "POST_COMMENT") {
      await axios
        .post(`http://localhost:3004/comments`, payload)
        .then(() => getComments(id));
      setSelected(null);
    }
  };

  const handleModal = data => {
    setSelected(data);
  };

  useEffect(() => {
    getComments(id);
  }, [id]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>{data.body}</Card.Text>
        <Card.Subtitle style={{ marginBottom: 8 }}>Comments</Card.Subtitle>
        <Button
          variant="primary"
          size="sm"
          className="mb-2"
          onClick={() =>
            handleModal({
              postId: id,
              ...currentUser
            })
          }
        >
          Add Comment
        </Button>
        {comments !== null ? (
          <ListGroup>
            {comments?.map(item => {
              return (
                <ListGroup.Item key={item.id}>
                  <p className={"font-weight-bold"}>
                    {item.name} <span className="font-weight-normal">by</span> [
                    {item.email}]{" "}
                  </p>
                  <p>{item.body}</p>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleModal(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        ) : (
          <p>Loading comments...</p>
        )}
      </Card.Body>
      {selected !== null && (
        <CommentModal
          show={selected !== null ? true : false}
          onHide={() => setSelected(null)}
          data={selected}
          type={selected?.id ? "PUT_COMMENT" : "POST_COMMENT"}
          onSubmit={(type, payload) => processInput(type, payload)}
        />
      )}
    </Card>
  );
};

export default Comments;
