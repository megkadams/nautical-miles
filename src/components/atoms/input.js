import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const styles = css`
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 0 1rem;
  box-sizing: border-box;
  font-size: 0.875rem;
  padding: 12px;
  color: black;
  background-color: white;
  border: 1px solid black;
  border-radius: 2px;
  &::-webkit-input-placeholder {
    color: gray;
  }
  &::-moz-placeholder{
    color: gray;
  }
  &:-ms-input-placeholder {
    color: gray;
  }
  &:-moz-placeholder {
    color: gray;
  }
  &:focus {
    outline: none;
  }
`

const StyledInput = styled.input`${styles}`

const Input = ({ ...props }) => {
  return <StyledInput {...props} />
}

Input.propTypes = {
  type: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
}

export default Input
