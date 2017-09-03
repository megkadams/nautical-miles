export default class {
  static isDeleteKey(keyCode) {
    return parseInt(keyCode, 10) === 8 && true
  }
  static isEsc(keyCode) {
    return parseInt(keyCode, 10) === 27 && true
  }
  static isDownArrow(keyCode) {
    return parseInt(keyCode, 10) === 40 && true
  }
  static isReturnKey(keyCode) {
    return parseInt(keyCode, 10) === 13 && true
  }
  static isTab(keyCode) {
    return parseInt(keyCode, 10) === 9 && true
  }
  static isUpArrow(keyCode) {
    return parseInt(keyCode, 10) === 38 && true
  }
}
