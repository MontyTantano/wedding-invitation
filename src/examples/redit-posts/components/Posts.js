import React from 'react';
import PropTypes from 'prop-types';

const Posts = (props = {}) => {
  const { posts } = props;
  return (
    <ul>
      {(posts || []).map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Posts;
