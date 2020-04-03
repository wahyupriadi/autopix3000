import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";
import { Card, Button, Modal, Form } from "react-bootstrap";

const Comments = lazy(() => import("../Comments"));

const PostModal = ({ data, type, onSubmit, ...props }) => {
  const [input, setInput] = useState(null);
  console.log(input);

  useEffect(() => {
    setInput(data);
  }, [data]);

  return (
    <Modal {...props} centered>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Add/Edit Title</Form.Label>
            <Form.Control
              defaultValue={data?.title}
              onChange={e => setInput({ ...input, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Add/Edit Content</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              defaultValue={data?.body}
              onChange={e => setInput({ ...input, body: e.target.value })}
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

const Post = props => {
  const { id } = props;
  const [Posts, setPosts] = useState(null);
  const [showComments, toggleComments] = useState(false);
  const [showPostModal, togglePostModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const getProfilePost = async idUser => {
    const result = await axios
      .get(`http://localhost:3004/posts?userId=${idUser}`)
      .then(res => {
        return res.data;
      })
      .catch(e => console.log(e));
    return setPosts(result);
  };

  useEffect(() => {
    getProfilePost(id);
  }, [id]);

  const handleDelete = async idPost => {
    await axios
      .delete(`http://localhost:3004/posts/${idPost}`)
      .then(() => getProfilePost(id));
  };

  const processInput = async (type, payload) => {
    if (type === "PUT_POST") {
      await axios
        .put(`http://localhost:3004/posts/${payload.userId}`, payload)
        .then(() => getProfilePost(id));

      setSelected(null);
      togglePostModal(false);
    }

    if (type === "POST_POST") {
      await axios
        .post(`http://localhost:3004/posts`, payload)
        .then(() => getProfilePost(id));
      setSelected(null);
      togglePostModal(false);
    }
  };

  const handleModal = data => {
    togglePostModal(true);
    setSelected(data);
  };

  const handleToggleComments = (isShow, data) => {
    if (isShow === "true") {
      toggleComments(true);
      setSelected(data);
    } else {
      toggleComments(false);
      setSelected(null);
    }
  };

  return (
    <React.Fragment>
      {showComments === true ? (
        <>
          <Button
            style={{ marginBottom: 16 }}
            onClick={() => handleToggleComments("false")}
          >
            Back to Posts
          </Button>
          <Suspense fallback={<p>loading comments</p>}>
            <Comments data={selected} />
          </Suspense>
        </>
      ) : Posts !== null ? (
        <>
          <Button
            variant="primary"
            size="sm"
            className="mb-2"
            onClick={() =>
              handleModal({
                userId: id
              })
            }
          >
            Add Post
          </Button>
          {Posts?.map(item => {
            return (
              <Card key={item.id} style={{ marginBottom: 8 }}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text className="text-secondary">{item.body}</Card.Text>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="light"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleToggleComments("true", item)}
                    >
                      Comments
                    </Button>
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
                </Card.Body>
              </Card>
            );
          })}
        </>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>Loading posts...</Card.Title>
          </Card.Body>
        </Card>
      )}
      {showPostModal && (
        <PostModal
          show={selected !== null ? true : false}
          onHide={() => setSelected(null)}
          data={selected}
          type={selected?.id ? "PUT_POST" : "POST_POST"}
          onSubmit={(type, payload) => processInput(type, payload)}
        />
      )}
    </React.Fragment>
  );
};

export default Post;
