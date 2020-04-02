import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const Comments = lazy(() => import("../Comments"));

const Post = props => {
  const { id } = props;
  const [Posts, setPosts] = useState(null);
  const [showComments, toggleComments] = useState(false);
  const [selected, setSelected] = useState(null);

  const getProfilePost = async idUser => {
    const result = await axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${idUser}`)
      .then(res => {
        return res.data;
      })
      .catch(e => console.log(e));
    return setPosts(result);
  };

  useEffect(() => {
    getProfilePost(id);
  }, [id]);

  const handleToggleComments = (isShow, data) => {
    if (isShow === "true") {
      console.log(data)
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
            <Comments data={selected}/>
          </Suspense>
        </>
      ) : Posts !== null ? (
        Posts?.map(item => {
          return (
            <Card
              key={item.id}
              style={{ marginBottom: 8 }}
              onClick={() => handleToggleComments("true", item)}
            >
              <Card.Body>
                <Card.Title>
                  <span>{item.title}</span>
                </Card.Title>
                <Card.Text>
                  <span>{item.body}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>Loading posts...</Card.Title>
          </Card.Body>
        </Card>
      )}
    </React.Fragment>
  );
};

export default Post;
