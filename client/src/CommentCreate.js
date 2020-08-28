import React, { useState } from 'react';
import axios from 'axios';
// import { useInnerEyes } from 'react-inner-eyes';


export default ({ postId }) => {
  const URL = `http://localhost:4001/posts/${postId}/comments`;

  // const { getFuncs } = useInnerEyes();

  const [content, setContent] = useState('');

  // const { fetchComments } = getFuncs();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data: { data } } = await axios.post(URL, { content });
      setContent('');
      // fetchComments();
      console.log(data)
    } catch (error) {
      return error;
    }
  }

  return (
    <section>
      <h4>Create Comment</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={content} className="form-control" onChange={({ target: { value }}) => setContent(value)}  />
          <br />
          <button type="submit" className="btn btn-primary">SUBMIT</button>
        </div>
      </form>
    </section>
  )
}
