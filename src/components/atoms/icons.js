import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Icon extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    fill: PropTypes.string,
    background: PropTypes.string,
  };

  render() {
    const _mergeStyles = (...args) => Object.assign({}, ...args)
    const renderGraphic = () => {
      switch (this.props.icon) {
        case 'clear':
          return (
            <g><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z" /></g>
          )
        default:
          return ('')
      }
    }

    const styles = {
      background: this.props.background,
      fill: this.props.fill,
      verticalAlign: 'middle',
      width: this.props.size,
      height: this.props.size,
    }

    const icon = renderGraphic()
    let svg
    let viewBox
    if (icon.hasOwnProperty('viewBox')) {
      svg = icon.svg
      viewBox = icon.viewBox.join(' ')
    } else {
      svg = icon
      viewBox = '0 0 24 24'
    }

    return (
      <svg
        className={this.props.className ? this.props.className : 'f-icon'}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={_mergeStyles(styles, this.props.style)}
      >
        {svg}
      </svg>
    )
  }
}

export default Icon
