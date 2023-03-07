import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPostById,
  addNewPost,
  updatePost,
  deletePost,
} from './postSlice';
import {
  selectDraftById,
  updateDraft,
  deleteDraft,
} from '../drafts/draftSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { postSchema } from '../validationSchemas/schemas';
import { IoCloseCircleOutline, IoArrowUndo } from 'react-icons/io5';
import { toast } from 'react-toastify';

export const EditPostForm = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');

  const post = useSelector((state) => selectPostById(state, _id));
  const draft = useSelector((state) => selectDraftById(state, _id));

  const showSpinner = [post, draft].every(Boolean) && requestStatus !== 'idle';

  if (showSpinner) {
    return <Spinner />;
  }

  let single;

  if (post) {
    single = post;
  } else {
    single = draft;
  }

  const initialValues = {
    title: single?.title,
    content: single?.content,
    buttonClicked: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const { title, content, buttonClicked } = values;

    if (post && buttonClicked === 'update') {
      try {
        setRequestStatus('pending');
        dispatch(updatePost({ _id, title, content, toast })).unwrap();

        setSubmitting(false);
        navigate('/dashboard/myposts');
      } catch (err) {
        setSubmitting(false);
        console.error('Failed to save the post', err);
      } finally {
        setRequestStatus('idle');
      }
    } else if (draft && buttonClicked === 'update') {
      try {
        setRequestStatus('pending');
        dispatch(updateDraft({ _id, title, content, toast })).unwrap();

        setSubmitting(false);
        navigate('/dashboard/drafts');
      } catch (err) {
        setSubmitting(false);
        console.error('Failed to save the post', err);
      } finally {
        setRequestStatus('idle');
      }
    } else if (draft && buttonClicked === 'postNow') {
      try {
        setRequestStatus('pending');
        dispatch(addNewPost({ title, content, toast })).unwrap();

        dispatch(deleteDraft({ _id: single._id, toast })).unwrap();

        // window.location.reload();
        // window.location.href = '/';
        setSubmitting(false);
        navigate('/dashboard/myposts');
      } catch (err) {
        setSubmitting(false);
        console.error('Failed to save the post', err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const onDelete = () => {
    if (post) {
      try {
        setRequestStatus('pending');
        dispatch(deletePost({ _id: single._id, toast })).unwrap();

        navigate('/dashboard/myposts');
      } catch (err) {
        console.error('Failed to delete the post', err);
      } finally {
        setRequestStatus('idle');
      }
    } else if (draft) {
      try {
        setRequestStatus('pending');
        dispatch(deleteDraft({ _id: single._id, toast })).unwrap();

        navigate('/dashboard/drafts');
      } catch (err) {
        console.error('Failed to delete the post', err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  // const editTextarea = document.querySelector('textarea');
  // editTextarea.addEventListener('keyup', (e) => {
  //   editTextarea.style.height = '45px';
  //   let scHeight = e.target.scrollHeight;
  //   editTextarea.style.height = `${scHeight}px`;
  // });

  const DelModal = () => {
    return (
      <div className="overlay">
        <div className="del-conf">
          <h4 className="del-heading">Do you want to delete this post?</h4>
          <div className="del-btn-cont">
            <button className="btn del-btn" onClick={onDelete}>
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
    <div className="editpost-body">
      <div className="edit-post-container">
        <h2>Tweak a Li'l</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={postSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="editpost-form">
              <label>Title:</label>
              <Field type="text" id="postTitle" name="title" />
              <ErrorMessage
                name="title"
                component={'p'}
                className="form-errors"
              />

              <label>Content:</label>
              <Field as="textarea" id="postContent" name="content" />
              <ErrorMessage
                name="content"
                component={'p'}
                className="form-errors"
              />

              <div className="btn-container">
                {!post ? (
                  <button
                    className="postbtn btn"
                    type="submit"
                    onClick={() => setFieldValue('buttonClicked', 'postNow')}
                    disabled={isSubmitting}
                  >
                    Post Now
                  </button>
                ) : null}

                <button
                  className="postbtn btn"
                  type="submit"
                  onClick={() => setFieldValue('buttonClicked', 'update')}
                  disabled={isSubmitting}
                >
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <span className="icon-cont" title="Delete">
          <IoCloseCircleOutline
            className="close-icon"
            onClick={() => setShowModal(true)}
          />
        </span>
        <span
          className="back-icon-cont"
          title="Go Back"
          onClick={() => navigate(-1)}
        >
          <IoArrowUndo className="icon" />
        </span>
      </div>
      {showModal && <DelModal />}
    </div>
  );
};
