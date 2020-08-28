import React, { useState } from 'react';
import axios from 'axios';
import { useInnerEyes } from 'react-inner-eyes';


export default () => {
  const URL = 'http://localhost:4000/posts';

  const { getFuncs } = useInnerEyes();

  const [title, setTitle] = useState('');

  const { fetchPosts } = getFuncs();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data: { data } } = await axios.post(URL, { title });
      setTitle('');
      fetchPosts();
      console.log(data)
    } catch (error) {
      return error;
    }
  }

  return (
    <section>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} className="form-control" onChange={({ target: { value }}) => setTitle(value)}  />
          <br />
          <button type="submit" className="btn btn-primary">POST</button>
        </div>
      </form>
    </section>
  )
}
