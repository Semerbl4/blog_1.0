/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Alert } from 'antd';

import { postSignUp } from '../../services/api';

import * as actions from '../../redux/actions';

import SignUpStyle from './SignUp.module.scss';

const SignUp = ({
  setSignUpUsername,
  setSignUpEmail,
  setSignUpPassword,
  setSignUpRepeatPassword,
  toogleAgreement,
  clearSignUpReducer,
  username,
  email,
  password,
  repeatPassword,
  agreement,
  history,
  errors,
  unexpectedError,
  user,
  setLogedUser,
  setEditProfileSucces,
  setUnexpectedError,
  setSignUpErrors,
}) => {
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      clearSignUpReducer();
      history.push('/');
    }
  }, [clearSignUpReducer, history, user]);

  const customCheckbox = (agree) => cn(SignUpStyle.customCheckbox, { [SignUpStyle.customCheckboxChecked]: agree });

  const submitForm = (ev) => {
    ev.preventDefault();
    if (repeatPassword === password && agreement) {
      postSignUp(username, email, password)
        .then((resolve) => {
          setLogedUser(resolve);
          setEditProfileSucces();
        })
        .catch((err) => {
          const error = JSON.parse(err.message);
          if (typeof error === 'object') {
            setSignUpErrors(error);
          } else {
            setUnexpectedError(error);
          }
        });
    }
  };

  const debounceTime = 500;

  return (
    <div className={SignUpStyle.container}>
      {!!unexpectedError && (
        <Alert
          message={`Ошибка ${unexpectedError}`}
          description="Unable to recive data"
          type="error"
          className={SignUpStyle.unexpectedError}
        />
      )}
      <h1 className={SignUpStyle.title}>Create new account</h1>
      <form
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
        onSubmit={(event) => submitForm(event)}
      >
        <label>
          <span className={SignUpStyle.inputTitle}>Username</span>
          <input
            className={SignUpStyle.input}
            type="text"
            placeholder="Username"
            required
            minLength="3"
            maxLength="20"
            onChange={debounce((event) => {
              setSignUpUsername(event.target.value);
            }, debounceTime)}
          />
          {errors.username && <p className={SignUpStyle.inputValidError}>{errors.username}</p>}
        </label>
        <label>
          <span className={SignUpStyle.inputTitle}>Email adress</span>
          <input
            className={SignUpStyle.input}
            type="email"
            placeholder="Email adress"
            required
            onChange={debounce((event) => {
              setSignUpEmail(event.target.value);
            }, debounceTime)}
          />
          {errors.email && <p className={SignUpStyle.inputValidError}>{errors.email}</p>}
        </label>
        <label>
          <span className={SignUpStyle.inputTitle}>Password</span>
          <input
            className={SignUpStyle.input}
            type="password"
            placeholder="Password"
            required
            minLength="8"
            maxLength="40"
            onChange={debounce((event) => {
              setSignUpPassword(event.target.value);
            }, debounceTime)}
          />
          {password.length <= 8 && password !== '' && (
            <p className={SignUpStyle.inputValidError}>Your password needs to be at least 8 characters.</p>
          )}
        </label>
        <label>
          <span className={SignUpStyle.inputTitle}>Repeat password</span>
          <input
            className={SignUpStyle.input}
            type="password"
            placeholder="Repeat password"
            required
            minLength="8"
            maxLength="40"
            onChange={debounce((event) => {
              setSignUpRepeatPassword(event.target.value);
            }, debounceTime)}
          />
          {password !== repeatPassword && repeatPassword !== '' && (
            <p className={SignUpStyle.inputValidError}>Passwords must match</p>
          )}
        </label>
        <div className={SignUpStyle.line} />
        <label>
          <input
            className={SignUpStyle.checkBoxhidden}
            type="checkbox"
            required
            onClick={() => {
              toogleAgreement();
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                toogleAgreement();
              }
            }}
          />
          <span className={customCheckbox(agreement)} />
          <p className={SignUpStyle.agreement}>I agree to the processing of my personal information</p>
        </label>
        <input className={SignUpStyle.login} type="submit" value="Create" disabled={!agreement} />
        <p className={SignUpStyle.signInOffer}>
          Already have an account?
          <Link to="/sign-in" className={SignUpStyle.redirect}>
            {' '}
            Sign In.
          </Link>
        </p>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  repeatPassword: PropTypes.string.isRequired,
  agreement: PropTypes.bool.isRequired,
  toogleAgreement: PropTypes.func.isRequired,
  setSignUpUsername: PropTypes.func.isRequired,
  setSignUpEmail: PropTypes.func.isRequired,
  setSignUpPassword: PropTypes.func.isRequired,
  setSignUpRepeatPassword: PropTypes.func.isRequired,
  clearSignUpReducer: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  unexpectedError: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  setLogedUser: PropTypes.func.isRequired,
  setEditProfileSucces: PropTypes.func.isRequired,
  setUnexpectedError: PropTypes.func.isRequired,
  setSignUpErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.signUpReducer.username,
  email: state.signUpReducer.email,
  password: state.signUpReducer.password,
  repeatPassword: state.signUpReducer.repeatPassword,
  agreement: state.signUpReducer.agreement,
  signUpSucces: state.signUpReducer.signUpSucces,
  errors: state.signUpReducer.errors,
  unexpectedError: state.signUpReducer.unexpectedError,
  user: state.logedUserReducer.user,
});

export default withRouter(connect(mapStateToProps, actions)(SignUp));
