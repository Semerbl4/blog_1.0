import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import * as actions from '../../redux/actions';

import ava from '../../imgs/Ava.png';

import headerRSStyle from './HeaderRightSide.module.scss';

const HeaderRightSide = ({ user, deleteLoggedUser }) => {
  const SIClasses = cn(headerRSStyle.button, headerRSStyle.buttonSI);
  const SUClasses = cn(headerRSStyle.button, headerRSStyle.buttonSU);
  const buttonLOClasses = cn(headerRSStyle.button, headerRSStyle.buttonLO);

  if (Object.keys(user).length === 0) {
    return (
      <div className={headerRSStyle.buttonsContainer}>
        <Link to="/sign-in" className={headerRSStyle.linkToSignIn}>
          <div type="button" className={SIClasses}>
            Sign in
          </div>
        </Link>
        <Link to="/sign-up" className={headerRSStyle.linkToSignUp}>
          <div type="button" className={SUClasses}>
            Sign Up
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className={headerRSStyle.buttonsContainer}>
      <Link to="/new-article" className={headerRSStyle.linkToCreateArtc}>
        <div className={headerRSStyle.createArtc}>Create Article</div>
      </Link>
      <Link to="/profile" className={headerRSStyle.profileLink}>
        <div className={headerRSStyle.userContainer}>
          <span className={headerRSStyle.username}>{user.username}</span>
          <img src={user.image || ava} alt="avatar" className={headerRSStyle.avatar} />
        </div>
      </Link>
      <button
        type="button"
        className={buttonLOClasses}
        onClick={() => {
          deleteLoggedUser();
          localStorage.clear();
        }}
      >
        Log Out
      </button>
    </div>
  );
};

HeaderRightSide.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  deleteLoggedUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.logedUserReducer.user,
});

export default connect(mapStateToProps, actions)(HeaderRightSide);
