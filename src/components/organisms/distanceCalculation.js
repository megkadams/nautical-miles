import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AutocompleteInput from '../molecules/autocompleteInput'
import Button from '../atoms/button'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`
const InnerWrapper = styled.div`
  flex: 1 0 100%;
  margin: 1.25rem 0;
`

const DistanceDisplay = styled.div`
  width: 100%;
  background: rgba(255,255,255,0.9);
  color: #000029;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2rem;
  box-sizing: border-box;
  margin-top: 1rem;
  span {
    padding-left: 1rem;
    margin-left: 1rem;
    width: 100%;
    text-align: center;
    display: block;
    &:first-of-type {
      border-right: 1px solid #000029;
      margin-right: 1rem;
      padding-right: 1rem;
      padding-left: 0;
      margin-left: 0;
    }
  }
  h5, h6 {
    font-family: "futura-pt",sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
    margin: 0;
  }
`

const DistanceCalculation = ({ airports, distance, from, getDistance, onChange, to }) => {
  return (
    <Wrapper>
      <AutocompleteInput
        dataList={airports}
        name="from"
        placeholder="From here"
        selectedValues={from}
        type="text"
        updateFormData={onChange}
        value={from}
      />
      <AutocompleteInput
        dataList={airports}
        name="to"
        placeholder="...to here"
        selectedValues={to}
        type="text"
        updateFormData={onChange}
        value={to}
      />
      <InnerWrapper>
        {from.length > 0 && to.length > 0 &&
          <Button onClick={getDistance}><span>Get distance</span></Button>
        }
        {from.length > 0 && to.length > 0 && Object.keys(distance).length > 0 &&
          <DistanceDisplay>
            <span>
              <h5>{distance.kilometers}</h5>
              <h6>Kilometers</h6>
            </span>
            <span>
              <h5>{distance.nauticalMiles}</h5>
              <h6>Nautical Miles</h6>
            </span>
          </DistanceDisplay>
        }
      </InnerWrapper>
    </Wrapper>
  )
}


DistanceCalculation.propTypes = {
  airports: PropTypes.array.isRequired,
  distance: PropTypes.object,
  from: PropTypes.array,
  getDistance: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  to: PropTypes.array,
}

export default DistanceCalculation
