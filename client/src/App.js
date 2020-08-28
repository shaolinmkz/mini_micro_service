import React from 'react';
import { InnerEyesProvider } from 'react-inner-eyes';
import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => {
  return (
    <InnerEyesProvider>
      <div className="container">
        <PostCreate />
        <PostList />
      </div>
    </InnerEyesProvider>
  );
}

export default App;
