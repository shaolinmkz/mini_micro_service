import React, { useState } from 'react';
import axios from 'axios';


export default ({ postId }) => {
  const URL = `http://localhost:4002/posts/${postId}/comments`;

  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(URL, { content });
      setContent('');
    } catch (error) {
      return error;
    }
  }

  return (
    <section>
      <h5><strong>Comment</strong></h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={content} className="form-control" onChange={({ target: { value }}) => setContent(value)}  />
          <br />
          <button type="submit" className="btn btn-primary">COMMENT</button>
        </div>
      </form>
    </section>
  )
}
