import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Button({ title, handleClick }) {
  return (
    <Fragment>
      <button type='button' onClick={handleClick}>{title}</button>
    </Fragment>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  title: "Press me",
  handleClick: () => alert("You've just pressed me")
}

export default Button;