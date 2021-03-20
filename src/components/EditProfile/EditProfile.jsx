import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Alert } from 'antd';

import * as actions from '../../redux/actions';

import { putUpdateUser } from '../../services/api';

import EditProfileStyle from './EditProfile.module.scss';

const EditProfile = ({
  token,
  clearEditProfileReducer,
  hasBeenTakenError,
  unexpectedError,
  editProfileSucces,
  setLogedUser,
  setEditProfileSucces,
  setEditProfileErrors,
  setEditProfileUnexpectedError,
  email,
  username,
}) => {
  useEffect(() => () => clearEditProfileReducer(), [clearEditProfileReducer]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    putUpdateUser(data.username, data.email, data.newPassword, data.avatar, token)
      .then((resolve) => {
        setLogedUser(resolve);
        setEditProfileSucces();
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        if (typeof error === 'object') {
          setEditProfileErrors(error);
        } else {
          setEditProfileUnexpectedError(error);
        }
      });
  };

  return (
    <div className={EditProfileStyle.container}>
      {editProfileSucces && (
        <Alert message="Profile succesfuly edited" type="success" className={EditProfileStyle.succes} />
      )}
      {!!unexpectedError && (
        <Alert
          message={`Ошибка ${unexpectedError}`}
          description="Unable to get data"
          type="error"
          className="unexpectedErrorGlobal"
        />
      )}
      <h1 className={EditProfileStyle.title}>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className={EditProfileStyle.inputTitle}>Username</span>
          <input
            className={EditProfileStyle.input}
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={username}
            ref={register({ required: true })}
          />
          {errors.username && <p className={EditProfileStyle.inputValidError}>Username is required</p>}
          {hasBeenTakenError.username && (
            <p className={EditProfileStyle.inputValidError}>{`Username ${hasBeenTakenError.username}`}</p>
          )}
        </label>
        <label>
          <span className={EditProfileStyle.inputTitle}>Email adress</span>
          <input
            className={EditProfileStyle.input}
            type="email"
            name="email"
            placeholder="Email adress"
            defaultValue={email}
            ref={register({ pattern: { value: /^\S+@\S+$/i, message: 'Type in email adress' } })}
          />
          {hasBeenTakenError.email && (
            <p className={EditProfileStyle.inputValidError}>{`Email ${hasBeenTakenError.email}`}</p>
          )}
        </label>
        <label className={EditProfileStyle.inputContainer}>
          <span className={EditProfileStyle.inputTitle}>New Password</span>
          <input
            className={EditProfileStyle.input}
            type="password"
            name="newPassword"
            placeholder="New password"
            ref={register({ minLength: 8, maxLength: 40 })}
          />
        </label>
        <label className={EditProfileStyle.inputContainer}>
          <span className={EditProfileStyle.inputTitle}>Avatar image (url)</span>
          <input
            className={EditProfileStyle.input}
            type="url"
            name="avatar"
            placeholder="Avatar image"
            ref={register({
              pattern: {
                value: /[-a-zA-Z0-9@:%_.~#?&=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&=]*)?/gi,
                message: 'Have to be URL',
              },
            })}
          />
          {errors.password && <p className={EditProfileStyle.inputValidError}>Password is required</p>}
        </label>
        <input className={EditProfileStyle.submit} type="submit" value="Save" />
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  token: PropTypes.string.isRequired,
  clearEditProfileReducer: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  hasBeenTakenError: PropTypes.object.isRequired,
  unexpectedError: PropTypes.number.isRequired,
  editProfileSucces: PropTypes.bool.isRequired,
  setLogedUser: PropTypes.func.isRequired,
  setEditProfileSucces: PropTypes.func.isRequired,
  setEditProfileErrors: PropTypes.func.isRequired,
  setEditProfileUnexpectedError: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.logedUserReducer.user.username,
  email: state.logedUserReducer.user.email,
  token: state.logedUserReducer.user.token,
  hasBeenTakenError: state.editProfileReducer.errors,
  unexpectedError: state.editProfileReducer.unexpectedError,
  editProfileSucces: state.editProfileReducer.editProfileSucces,
});

export default connect(mapStateToProps, actions)(EditProfile);
