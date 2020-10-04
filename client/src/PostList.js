import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useInnerEyes } from 'react-inner-eyes';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';


export default () => {
  const URL = 'http://blog.com/posts';
  const { saveFunc } = useInnerEyes();

  const [posts, setPosts] = useState([]);

  const saveFuncRef = useRef(saveFunc).current;


  const fetchPosts = async () => {
    try {
      const { data: { data } } = await axios.get(URL);
      setPosts(Object.values(data));
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    fetchPosts();
    saveFuncRef('fetchPosts', fetchPosts);
  }, [saveFuncRef])

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      <h1>Posts</h1>
      {
        posts.map((post, index) => (
          <div
            style={{ width: '100%', marginBottom: '20px', border: '1px rgba(0, 0, 0, 0.1) solid', padding: '10px 20px' }}
            key={post.id}
            className="card"
          >
            <div className="card-body">
              <h4 className="card-title">{`${index + 1}.`}</h4>
              <p className="card-text">{post.title}</p>
              <CommentCreate postId={post.id} fetchPosts={fetchPosts} />
              {!!post.comments.length && (
              <CommentList comments={post.comments} />
                )}
            </div>
          </div>
        ))
      }
    </div>
  )
}
