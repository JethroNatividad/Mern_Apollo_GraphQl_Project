import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Post from '../../Components/Post';
import './index.css';
function Home() {
  const { loading, data } = useQuery(fetchPostsQuery);
  const LoadPosts = () =>
    data?.getPosts?.map((post) => <Post key={post.id} post={post} />);

  return (
    <div className='home'>
      <h2 className='home__title'>Posts</h2>
      <div className='home__posts'>{LoadPosts()}</div>
    </div>
  );
}
const fetchPostsQuery = gql`
  {
    getPosts {
      username
      title
      body
      createdAt
      id
      likesCount
      commentsCount
      comments {
        body
        username
        id
      }
    }
  }
`;

export default Home;
