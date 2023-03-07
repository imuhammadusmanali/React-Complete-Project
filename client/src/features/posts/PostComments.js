import { useDispatch, useSelector } from 'react-redux';
import {
  selectCommentsByPost,
  addNewComment,
  updateComment,
  deleteComment,
  getCommentsError,
} from '../comments/commentsSlice';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  IoPaperPlaneOutline,
  IoPencilOutline,
  IoCloseOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';
import { commentSchema } from '../validationSchemas/schemas';
import { Spinner } from '../../components/Spinner';
import { getAuth } from '../auth/authSlice';
import { toast } from 'react-toastify';

export const PostComments = (props) => {
  const { _id } = props;
  const dispatch = useDispatch();
  const postComments = useSelector((state) => selectCommentsByPost(state, _id));
  const commentErrors = useSelector(getCommentsError);

  const currentUser = useSelector(getAuth);
  const userId = currentUser.user._id;

  // useEffect(() => {
  //   dispatch(fetchComments());
  // }, [dispatch]);

  useEffect(() => {
    commentErrors &&
      toast.error(commentErrors, {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: 'dark',
      });
  }, [commentErrors]);

  const [showModal, setShowModal] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');
  const [initialValues, setInitialValues] = useState({
    content: '',
    buttonClicked: 'Add Comment',
    commentId: '',
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const { content, buttonClicked, commentId } = values;

    if (buttonClicked === 'Add Comment') {
      try {
        setRequestStatus('pending');
        dispatch(addNewComment({ postId: _id, content, toast })).unwrap();

        setSubmitting(false);
        // navigate(`/dashboard/myposts/${_id}`);
      } catch (err) {
        setSubmitting(false);
        console.error('Failed to save the post', err);
      } finally {
        setRequestStatus('idle');

        resetForm();
      }
    } else if (buttonClicked === 'Update Comment') {
      try {
        setRequestStatus('pending');
        dispatch(updateComment({ commentId, content, toast })).unwrap();

        setSubmitting(false);
        // navigate(`/dashboard/myposts/${_id}`);
      } catch (err) {
        setSubmitting(false);
        console.error('Failed to save the post', err);
      } finally {
        setRequestStatus('idle');

        setInitialValues({
          content: '',
          buttonClicked: 'Add Comment',
          commentId: '',
        });
      }
    }
  };

  const onDeleteComment = () => {
    const { commentId } = initialValues;

    try {
      setRequestStatus('pending');
      dispatch(deleteComment({ commentId, toast })).unwrap();

      setShowModal(false);
    } catch (err) {
      console.error('Failed to delete the post', err);
    } finally {
      setRequestStatus('idle');
    }
  };

  const DelModal = () => {
    return (
      <div className="overlay">
        <div className="del-conf">
          <h4 className="del-heading">Do you want to delete this comment?</h4>
          <div className="del-btn-cont">
            <button className="btn del-btn" onClick={onDeleteComment}>
              Delete
            </button>
            <button className="btn can-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
          <span className="icon-cont" title="Close">
            <IoCloseCircleOutline
              className="close-icon"
              onClick={() => setShowModal(false)}
            />
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="post-comments">
      {!postComments ? (
        <h3>No Comments Yet!</h3>
      ) : requestStatus !== 'idle' ? (
        <Spinner />
      ) : (
        <div className="comments-section">
          <p className="comments-section-heading">Comments:</p>
          {postComments?.map((comment) => (
            <div key={comment._id} className="comment">
              <h4 className="comment-heading">
                {comment.commentedBy.user.name}
              </h4>
              <p className="comment-email">{comment.commentedBy.user.email}</p>
              <p className="comment-content">{comment.content}</p>
              {comment.commentedBy.user._id === userId ? (
                <div className="comment-icon-cont">
                  <span title="Edit">
                    <IoPencilOutline
                      className="icon comment-edit-icon"
                      onClick={() => {
                        setInitialValues({
                          content: comment.content,
                          buttonClicked: 'Update Comment',
                          commentId: comment._id,
                        });
                      }}
                    />
                  </span>
                  <span
                    title="Delete"
                    onClick={() => {
                      setInitialValues({
                        content: '',
                        buttonClicked: 'Add Comment',
                        commentId: comment._id,
                      });

                      setShowModal(true);
                    }}
                  >
                    <IoCloseOutline className="icon comment-close comment-close-icon" />
                  </span>
                </div>
              ) : null}
            </div>
          ))}
          <div className="add-comment">
            <p className="add-comments-heading">Add a Comment:</p>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={commentSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, resetForm }) => (
                <Form className="comment-form">
                  <Field
                    as="textarea"
                    className="comment-area"
                    name="content"
                  />
                  <ErrorMessage
                    component={'p'}
                    className="form-errors"
                    name="content"
                  />

                  <button
                    className="comment-btn"
                    type="submit"
                    title={initialValues.buttonClicked}
                    disabled={isSubmitting}
                  >
                    <IoPaperPlaneOutline className="icon" />
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      {showModal && <DelModal />}
    </div>
  );
};
