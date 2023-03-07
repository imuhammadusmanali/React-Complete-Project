import { useSelector } from 'react-redux';
import { selectPostById } from './postSlice';
import { selectDraftById } from '../drafts/draftSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoPencilOutline, IoArrowUndo } from 'react-icons/io5';
import { Spinner } from '../../components/Spinner';
import { PostComments } from './PostComments';
import { useEffect } from 'react';
import { getAuth } from '../auth/authSlice';

export const SinglePost = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector(getAuth);
  const userId = currentUser.user._id;

  const post = useSelector((state) => selectPostById(state, _id));
  const draft = useSelector((state) => selectDraftById(state, _id));

  useEffect(() => {}, [post, draft]);

  if (!post && !draft) {
    return <Spinner />;
  }

  let single;
  let editUrl;

  if (post) {
    single = post;
    editUrl = '/dashboard/myposts/edit';
  } else {
    single = draft;
    editUrl = '/dashboard/drafts/edit';
  }
  const canEditPost = single.postedBy.user._id === userId;

  return (
    <div className="posts-body">
      <div className="posts">
        <div key={single._id} className="single-post-container">
          <h3>{single.title}</h3>
          <p>{single.content}</p>
          {canEditPost && (
            <Link
              className="icon-cont"
              title="Edit"
              to={`${editUrl}/${single._id}`}
            >
              <IoPencilOutline className="icon" />
            </Link>
          )}

          <span
            className="back-icon-cont"
            title="Go Back"
            onClick={() => navigate(-1)}
          >
            <IoArrowUndo className="icon" />
          </span>
          {post ? <PostComments _id={_id} /> : null}
        </div>
      </div>
    </div>
  );
};
