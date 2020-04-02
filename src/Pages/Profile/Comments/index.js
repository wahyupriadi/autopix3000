import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card, ListGroup } from "react-bootstrap";

const Comments = ({ data, ...props }) => {
  const { id } = data;
  const [comments, setComments] = useState(null);

  const getComments = async idPost => {
    const result = await axios
      .get(`https://jsonplaceholder.typicode.com/posts/${idPost}/comments`)
      .then(res => {
        return res.data;
      })
      .catch(e => console.log(e));
    return setComments(result);
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
        {comments !== null ? (
          <ListGroup>
            {comments?.map(item => {
              return <ListGroup.Item key={item.id}>{item.body}</ListGroup.Item>;
            })}
          </ListGroup>
        ) : (
          <p>Loading comments...</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default Comments;
