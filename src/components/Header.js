import React from 'react'

import { LogoText, Navigation } from './'

import scrollback from 'scrollback/scrollback.mjs'
import { relative } from 'path';

class Header extends React.Component{
  state = {
    size: 'max'
  }

  setHeaderSize = (size) => {
    console.log(size)
    this.setState({ size })
  }

  componentDidMount = () => {
    scrollback.register({
      position: 50,
      direction: "up",
      callback: () => this.setHeaderSize('max')
    })
    scrollback.register({
      position: 50,
      direction: "down",
      callback: () => this.setHeaderSize('min')
    })
  }

  toggleNav = () => this.setState({showNav: !this.state.showNav})
  
  render(){
    const headerSize = this.state.size

    return (
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: headerSize == 'max' ? 120 : 42,
          background: 'hsla(47, 36%, 74%, 1)',
          transition: 'height 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        <img
          src={"../images/logo-simple.svg"}
          alt="Logo: um cão e um gato se abraçando."
          style={{
            position: 'absolute',
            top: headerSize == 'max' ? 18 : -148,
            left: 28,
            opacity: headerSize == 'max' ? 1 : 0,
            zIndex: 1,
            transition: ['top 1s cubic-bezier(0.23, 1, 0.32, 1)', 'opacity 1.4s'],
            animation: 'beatHeart 1s 1s 3'
          }}
        />
        <img
          aria-hidden="true"
          src={"../images/logo-lines.svg"}
          alt="Logo: um cão e um gato se abraçando."
          style={{
            position: 'absolute',
            top: headerSize == 'max' ? -148 : -4,
            left: 8,
            opacity: headerSize == 'max' ? 0 : 0.4,
            height: 42,
            transition: ['top 1s cubic-bezier(0.23, 1, 0.32, 1)', 'opacity 1.4s']
          }}
        />
        <LogoText
          size={headerSize == 'max' ? 2.3 : 1.4}
          style={{
            position: 'absolute',
            left: headerSize == 'max' ? 180 : 60,
            bottom: 0,
            opacity: headerSize == 'max' ? 1 : 0.6,
            transition: headerSize == 'max'
              ? ['left 0.5s', 'opacity 0.5s']
              : ['left 0.5s 0.5s', 'opacity 0.5s']
          }}
        />
        <Navigation>
          <Navigation.Option>home</Navigation.Option>
          <Navigation.Option>contato</Navigation.Option>
          <Navigation.Option>serviços</Navigation.Option>
          <Navigation.Option>fotos</Navigation.Option>
          <Navigation.Divider />
          <Navigation.Option>login</Navigation.Option>
          <Navigation.Option>acesse o sistema</Navigation.Option>
        </Navigation>
      </header>
    )
  }
}

export default Header