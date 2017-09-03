import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import keyCodeTest from '../../helpers/keyCodeTest'
import Icon from '../atoms/icons'

const Wrapper = styled.div`
  position: relative;
  width: calc(50% - 1rem);
  font-family: "futura-pt",sans-serif;
  font-style: normal;
  font-weight: 400;
  z-index: 1;
  &:first-of-type {
    margin-right: 1rem;
  }
  &:focus {
    outline: none;
  }
`

const ResultsList = styled.ul`
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255,255,255,0.9);
  list-style: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  max-height: 400px;
  overflow-y: scroll;
`

const ResultsListItem = styled.li`
  display: block;
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid #000029;
  color: #000029;
  color: black;
  box-sizing: border-box;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  &.has-focus {
    background: white;
    font-weight: bold;
  }
`

const Input = styled.input`
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 0.75rem 3.75rem 0.75rem 0.75rem;
  color: #000029;
  background-color: white;
  border: 1px solid #000029;
  border-radius: 2px;
  font-family: "futura-pt",sans-serif;
  font-style: normal;
  font-weight: 400;
  &:last-child {
    margin-right: 0;
  }
  &::-webkit-input-placeholder {
    color: #8383a0;
  }
  &::-moz-placeholder{
    color: #8383a0;
  }
  &:-ms-input-placeholder {
    color: #8383a0;
  }
  &:-moz-placeholder {
    color: #8383a0;
  }
`

const ClearSelected = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

class AutocompleteInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    results: PropTypes.array,
    style: PropTypes.object,
    type: PropTypes.string,
  }

  static defaultProps = {
    type: 'text',
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      resultsList: [],
      searchValue: '',
      dropdownOpen: false,
      hasFocus: -1,
    }
  }

  activateAll = () => {
    this.setState({
      resultsList: this.props.dataList.slice(),
      dropdownOpen: true,
    }, this.excludeSelectedValues)
  }

  activateDropdown = () => {
    if (this.state.dropdownOpen) {
      this.searchSelectInput.value = ''
      this.clearDropdown()
    } else {
      this.searchSelectInput.value = ''
      this.searchSelectInput.focus()
      this.activateAll()
    }
  }

  addToSelected = (selectedValue) => {
    if (typeof selectedValue === 'object') {
      let updateSelectedValues
      updateSelectedValues = []
      updateSelectedValues.push(selectedValue)
      this.setState({
        searchValue: `${selectedValue.name} (${selectedValue.iata_code})`,
        selectedValues: updateSelectedValues,
      }, this.clearDropdown, this.props.updateFormData(this.props.name, updateSelectedValues))
    }
  }

  clearDropdown = () => {
    this.setState({
      resultsList: [],
      dropdownOpen: false,
    })
  }

  clearFromSelected = (whatToClear) => {
      this.setState({
        searchValue: '',
      }, this.clearDropdown, this.props.updateFormData(this.props.name, null))
  }

  handleClickOutside = (event) => {
    this.clearDropdown()
  }

  excludeSelectedValues = () => {
    if (this.props.selectedValues.length > 0) {
      // If has a selected value
      let currentResultsList = this.state.resultsList
      let indexOfSelected = this.state.resultsList.findIndex((listItem) => (listItem.key === this.props.selectedValues[0].key))
      currentResultsList.splice(indexOfSelected, 1)
      this.setState({
        resultsList: currentResultsList,
      })
    }
  }

  focusSearchableSelect = (event) => {
    if (event != null && keyCodeTest.isReturnKey(event.keyCode)) {
      if (this.state.resultsList.length > 0) {
        if (this.state.hasFocus > -1) {
          event.stopPropagation()
          this.addToSelected(this.state.resultsList[this.state.hasFocus])
          this.setState({
            hasFocus: -1,
          })
        } else {
          event.stopPropagation()
          this.addToSelected(this.state.resultsList[0])
          this.setState({
            hasFocus: -1,
          })
        }
      }
    } else if (event != null && keyCodeTest.isTab(event.keyCode)) {
      event.stopPropagation()
      this.addToSelected(this.state.resultsList[0])
      this.setState({
        hasFocus: -1,
      })
    } else if (event != null && keyCodeTest.isUpArrow(event.keyCode)) {
      if (this.state.resultsList.length > 0) {
        if (this.state.hasFocus > -1) {
          event.preventDefault()
          event.stopPropagation()
          this.setState({
            hasFocus: this.state.hasFocus - 1,
          })
        }
      }
    } else if (event != null && keyCodeTest.isDownArrow(event.keyCode)) {
      if (this.state.resultsList.length > 0) {
        if (this.state.hasFocus < (this.state.resultsList.length - 1)) {
          event.preventDefault()
          event.stopPropagation()
          this.setState({
            hasFocus: this.state.hasFocus + 1,
          })
        }
      }
    } else if (event != null && keyCodeTest.isDeleteKey(event.keyCode)) {
      if (this.state.searchValue.length === 0) {
        // If search value is empty
        event.stopPropagation();
        this.setState({
          selectedValues: [],
        }, this.props.updateFormData(this.props.name, null), this.activateAll)
      } else {
        // If search field has characters entered
        event.stopPropagation();
        this.setState({
          selectedValues: [],
        }, this.props.updateFormData(this.props.name, null), this.searchForMatchingResults)
      }
    }
  }

  searchForMatchingResults = (event) => {
    if (this.searchSelectInput.value && this.searchSelectInput.value.length === 0) {
      this.activateAll()
    } else {
      this.searchDataList(this.searchSelectInput.value)
    }
  }

  searchDataList = (searchValue) => {
    const searchedDataList = this.props.dataList.filter((inputValue) => {
      return (
        (inputValue.name && inputValue.name.toLowerCase().includes(searchValue.toLowerCase())) || (inputValue.iata_code && inputValue.iata_code.toLowerCase().includes(searchValue.toLowerCase())) ||
        (inputValue.name && inputValue.iata_code && (`${inputValue.name} (${inputValue.iata_code})`.includes(searchValue)))
      )
    })
    this.setState({
      resultsList: searchedDataList,
      dropdownOpen: true,
    }, this.excludeSelectedValues)
  }

  updateSearchValue = (event) => {
    this.setState({
      searchValue: event.target.value,
    }, this.searchDataList(event.target.value))
  }

  render() {
    const {
      name,
      placeholder,
      style,
    } = this.props

    const { resultsList, searchValue } = this.state

    const renderList = (
      this.state.dropdownOpen && resultsList.length === 0 ?
        <ResultsListItem>No results found.</ResultsListItem>
      :
      resultsList.map((result, i) => {
        const displayName = result.iata_code ? `${result.name} (${result.iata_code})` : `${result.name}`
        return (
          <ResultsListItem
            key={i}
            className={this.state.hasFocus === i ? 'has-focus' : null}
            onClick={() => this.addToSelected(result)}>
            {displayName}
          </ResultsListItem>
        )
      })
    )

    return (
      <Wrapper
        onKeyDown={this.focusSearchableSelect}
        style={style || null}
        tabIndex={0}>
        <ResultsList>{renderList}</ResultsList>
        <Input
          id={name}
          name={name}
          onChange={this.updateSearchValue}
          onFocus={resultsList.length === 0 ? this.activateAll : this.searchForMatchingResults}
          placeholder={placeholder ? placeholder : 'Type to search'}
          ref={(input) => { this.searchSelectInput = input; }}
          tabIndex={0}
          type="text"
          value={searchValue}
        />
        {searchValue.length > 0 &&
          <ClearSelected
            onClick={() => this.clearFromSelected(name)}>
            <Icon fill='#00029' icon="clear" size="1.25rem" />
          </ClearSelected>
        }
      </Wrapper>
    )
  }
}

export default onClickOutside(AutocompleteInput)
