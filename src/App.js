import React, { Component } from 'react'
import styled from 'styled-components'
import bgPic from './tablet.jpg'
import CalculationContainer from './containers/CalculationContainer'

const Wrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 4rem;
  border: 10px solid #000029;
  box-sizing: border-box;
  overflow: hidden;
  background-image: url(${bgPic});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`
const Header = styled.h2`
  display: block;
  color: white;
  margin: 0 auto 1rem;
  text-align: left;
  max-width: 800px;
  font-family: "futura-pt",sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 3rem;
  line-height: 1;
  strong {
    font-weight: 600;
    letter-spacing: 2px;
  }
`

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header>Let's <strong>JET</strong>SET.</Header>
        <CalculationContainer />
      </Wrapper>
    )
  }
}

export default App
