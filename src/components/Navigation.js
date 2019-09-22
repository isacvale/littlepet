import React from 'react'

const NavigationOption = props => 
  <a
    style={{
      margin: '0 8px',
      ...props.style
    }}
    onClick={props.onClick}
  >{props.children}</a>
const NavigationDivider = props => 
  <p
    style={{
      margin: '0 8px',
      ...props.style
    }}
  >|</p>


class Navigation extends React.Component {
  static Option = NavigationOption
  static Divider = NavigationDivider

  render () {
    return (
      <nav
        style={{
          display: 'flex',
          fontSize: '1.2rem',
          width: '100%',
          justifyContent: 'flex-end',
          position: 'absolute',
          bottom: 12
        }}
      >
        { this.props.children }
      </nav>
    )
  }
}

export default Navigation