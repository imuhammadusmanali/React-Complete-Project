import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from './postSlice';
import { addNewDraft } from '../drafts/draftSlice';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { postSchema } from '../validationSchemas/schemas';
import { Spinner } from '../../components/Spinner';
import { toast } from 'react-toastify';

export const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addPostRequest, setAddPostRequest] = useState('idle');

  const showSpinner = addPostRequest !== 'idle';

  if (showSpinner) {
    return <Spinner />;
  }

  const initialValues = {
    title: '',
    content: '',
    buttonClicked: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const { title, content, buttonClicked } = values;

    if (buttonClicked === 'postNow') {
      try {
        setAddPostRequest('pending');
        dispatch(addNewPost({ title, content, toast })).unwrap();

        // window.location.reload();
        // window.location.href = '/';
        setSubmitting(false);
        navigate('/dashboard/myposts');
      } catch (err) {
        setSubmitting(false);
        console.error('Failed to save the post', err);
      } finally {
        setAddPostRequest('idle');
      }
    } else if (buttonClicked === 'saveDraft') {
      try {
        setAddPostRequest('pending');
        dispatch(addNewDraft({ title, content, toast })).unwrap();

        // window.location.reload();
        // window.location.href = '/';
        setSubmitting(false);
        navigate('/dashboard/drafts');
      } catch (err) {
        setSubmitting(false);
        console.error('Failed to save the post', err);
      } finally {
        setAddPostRequest('idle');
      }
    }
  };

  return (
    <div className="editpost-body">
      <div className="edit-post-container">
        <h2>How You Doin!</h2>
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
                component={'p'}
                name="title"
                className="form-errors"
              />

              <label>Content:</label>
              <Field as="textarea" id="postContent" name="content" />
              <ErrorMessage
                component={'p'}
                name="content"
                className="form-errors"
              />

              <div className="btn-container">
                <button
                  className="postbtn btn"
                  type="submit"
                  onClick={() => setFieldValue('buttonClicked', 'postNow')}
                  disabled={isSubmitting}
                >
                  Post Now
                </button>
                <button
                  className="postbtn btn"
                  type="submit"
                  onClick={() => setFieldValue('buttonClicked', 'saveDraft')}
                  disabled={isSubmitting}
                >
                  Save as Draft
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
