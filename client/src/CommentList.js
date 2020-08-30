import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';


export default ({ postId }) => {
  const URL = `http://localhost:4002/posts/${postId}/comments`;

  const [posts, setPosts] = useState([]);


  const fetchComments = async () => {
    try {
      const { data: { data } } = await axios.get(URL);
      setPosts(Object.values(data));
    } catch (error) {
      return error
    }
  }

  const fetchCommmentRef = useRef(fetchComments).current

  useEffect(() => {
    fetchCommmentRef();
  }, [fetchCommmentRef])

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {
        posts.map((comment, index) => (
          <div
            style={{ width: '100%', marginBottom: '20px', border: '1px rgba(0, 0, 0, 0.1) solid', padding: '10px 20px' }}
            key={comment.id}
            className="card"
          >
            <div className="card-body">
              <p className="card-text">{`${index + 1}.) ${comment.content}.`}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
