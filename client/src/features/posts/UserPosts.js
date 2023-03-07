import { useDispatch, useSelector } from 'react-redux';
import { selectUserPosts, getPostStatus } from './postSlice';
import { Link } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { useEffect } from 'react';

import { fetchUserPosts } from '../posts/postSlice';

export const UserPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectUserPosts);
  const postStatus = useSelector(getPostStatus);

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, [dispatch]);
  // const orderedPosts = posts
  //   .slice()
  //   .sort((a, b) => b.date.localeCompare(a.date));

  let content;

  if ((!posts && postStatus === 'loading') || postStatus === 'failed') {
    content = <Spinner />;
  } else if (postStatus === 'succeeded' && posts.length === 0) {
    content = <h4>No Posts to Show!</h4>;
  } else if (postStatus === 'succeeded') {
    content = (
      <div className="posts-body">
        <div className="posts">
          {posts?.map((post) => (
            <div key={post._id} className="post-container">
              <Link to={`${post._id}`}>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{`${post.content}`}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // else if (postStatus === 'failed') {
  //   content = <p>Error: {postError}</p>;
  // }

  return <div className="container">{content}</div>;
};
