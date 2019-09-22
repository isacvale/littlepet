import React from 'react'

class Container extends React.Component {
  render () {
    return <div style={this.props.style}>
      {this.props.children.map( child =>
        React.cloneElement(child, {containerX: 10})  
      )}
    </div>
  }
}

export default Container