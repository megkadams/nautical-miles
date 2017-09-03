import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const styles = css`
  border: none;
  font-family: "futura-pt",sans-serif;
  font-style: normal;
  font-weight: 600;
	cursor: pointer;
	padding: 12px;
	display: inline-block;
	text-transform: uppercase;
	letter-spacing: 1px;
	outline: none;
	position: relative;
	-webkit-transition: all 0.3s;
	-moz-transition: all 0.3s;
	transition: all 0.3s;
  background: #000029;
	color: white;
	font-size: 1rem;
	overflow: hidden;
	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	backface-visibility: hidden;
  z-index: 0;
  span {
    display: inline-block;
  	width: 100%;
  	height: 100%;
  	-webkit-transition: all 0.3s;
  	-webkit-backface-visibility: hidden;
  	-moz-transition: all 0.3s;
  	-moz-backface-visibility: hidden;
  	transition: all 0.3s;
  	backface-visibility: hidden;
  }
  &:hover {
    span {
      -webkit-transform: translateX(200%);
    	-moz-transform: translateX(200%);
    	-ms-transform: translateX(200%);
    	transform: translateX(200%);
    }
    &:before {
      left: 0;
    }
  }
  &:focus {
    outline: none
  }
  &:before {
    content: '[1+2x4-6]';
    font-style: italic;
    position: absolute;
    left: -100%;
  	top: 0;
  	height: 100%;
  	width: 100%;
  	line-height: 2.8;
  	-webkit-transition: all 0.3s;
  	-moz-transition: all 0.3s;
  	transition: all 0.3s;
  }
`
const StyledButton = styled.button`${styles}`

const Button = ({ type, ...props }) => {
  return <StyledButton {...props} type={type} />
}

Button.propTypes = {
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
}

Button.defaultProps = {
  type: 'button',
}

export default Button
