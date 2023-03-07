import { useSelector } from 'react-redux';
import { selectAllPosts, getPostStatus } from './postSlice';
import { Link } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';

export const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);

  // useEffect(() => {
  //   dispatch(fetchPosts());
  // }, [dispatch]);
  // const orderedPosts = posts
  //   .slice()
  //   .sort((a, b) => b.date.localeCompare(a.date));

  let content;

  if (postStatus === 'loading' || postStatus === 'failed') {
    content = <Spinner />;
  } else if (postStatus === 'succeeded') {
    content = (
      <div className="posts-body">
        <div className="posts">
          {posts?.map((post) => (
            <div key={post._id} className="post-container">
              <Link to={`posts/${post._id}`}>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{`${post.content}`}</p>
                {/* <Link to={`posts/${post._id}`}>Read More</Link> */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // } else if (postStatus === 'failed') {
  //   content = <p>Error: {postError}</p>;
  // }

  // const renderedPosts =
  return <div className="container">{content}</div>;
};
