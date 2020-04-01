import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card } from "react-bootstrap";

const Post = props => {
  const { id } = props;
  const [Posts, setPosts] = useState(null);

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

  return (
    <React.Fragment>
      {Posts !== null &&
        Posts?.map(item => {
          return (
            <Card style={{ marginBottom: 8 }}>
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
        })}
    </React.Fragment>
  );
};

export default Post;
