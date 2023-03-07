import { useDispatch, useSelector } from 'react-redux';
import { selectUserDrafts, getDraftStatus } from '../drafts/draftSlice';
import { Link } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { useEffect } from 'react';
import { fetchUserDrafts } from '../drafts/draftSlice';

export const UserDrafts = () => {
  const dispatch = useDispatch();
  const drafts = useSelector(selectUserDrafts);
  const draftStatus = useSelector(getDraftStatus);

  useEffect(() => {
    dispatch(fetchUserDrafts());
  }, [dispatch]);
  // const orderedPosts = posts
  //   .slice()
  //   .sort((a, b) => b.date.localeCompare(a.date));

  let content;

  if ((!drafts && draftStatus === 'loading') || draftStatus === 'failed') {
    content = <Spinner />;
  } else if (draftStatus === 'succeeded' && drafts.length === 0) {
    content = <h4>No Drafts to Show!</h4>;
  } else if (draftStatus === 'succeeded' && drafts.length !== 0) {
    content = (
      <div className="posts-body">
        <div className="posts">
          {drafts?.map((draft) => (
            <div key={draft._id} className="post-container">
              <Link to={`${draft._id}`}>
                <h3 className="post-title">{draft.title}</h3>
                <p className="post-body">{`${draft.content}`}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
  //  else if (draftStatus === 'failed') {
  //   content = <p>Error: {draftError}</p>;
  // }

  return <div className="container">{content}</div>;
};
