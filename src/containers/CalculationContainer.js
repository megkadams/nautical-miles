import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/actions'
import DistanceCalculation from '../components/organisms/distanceCalculation'

class CalculationContainer extends Component {
  static propTypes = {
    places: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  getDistance = () => {
    if (!this.props.places.to.length > 0 && !this.props.places.from.length > 0) {
      return null
    }
    this.props.actions.calculateDistance(this.props.places.from[0].coordinates, this.props.places.to[0].coordinates)
  }

  onChange = (name, value) => {
    if (value === null) {
      this.props.actions.selectLocation(name, null)
    } else {
      const updatedArray = []
      updatedArray.push(value[0])
      this.props.actions.selectLocation(name, updatedArray)
    }
  }

  render() {
    const airports = this.props.places.airports.sort((a, b) => a.name > b.name ? 1 : -1)
    const { distance, from, to } = this.props.places

    return (
      <DistanceCalculation
        airports={airports}
        distance={distance}
        from={from}
        getDistance={this.getDistance}
        onChange={this.onChange}
        to={to}
      />
    )
  }
}

function mapStateToProps(state, props) {
  return {
    places: state.places,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalculationContainer)
