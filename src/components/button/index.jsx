import React from 'react';

function Button(props) {
  return <button disabled={props.disabled}>{props.title}</button>
}

export default Button;
