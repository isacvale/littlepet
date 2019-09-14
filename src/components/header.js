import React from 'react'
import '../style/header.scss'

import scrollback from 'scrollback/scrollback.mjs'
// import vars from '../my-vars'

let vars = window.g.config

function UpperBar( props ){
  return (
    <div className="upperbar">
      <img id="logo-main" className={props.showLogo? "show" : "hidden"} src={vars.path+"/images/logo-simple.svg"} alt="Logo da littlePet: um cão e um gato se abraçando." />
    </div>
  )
}

function LowerBar( props ){
  return (
    <div className="lowerbar">
      <p className="brand"><span>little</span> <span>Pet</span></p>
      <p>Consultório veterinário</p>
      <div id="hamburguer" onClick={props.toggleNav}>
        <div></div><div></div><div></div>
      </div>
      <img id="logo-faint" className={props.showLogo? "show" : "hidden"} src={vars.path+"/images/logo-lines.svg"} alt="Logo da littlePet: um cão e um gato se abraçando." />

      <MenuItems id="menu-nav" />
    </div>
  )
}

function LowerNavBar( props ){
  return (
    <MenuItems id="main-nav" className={props.showNav ? "" : "hidden"} />
  )}

function MenuItems( props ){
  return (
    <nav id={props.id} className={props.className}>
      <div>
        <a href="#anchor-servicos">Serviços</a>
        <a href="#anchor-fotos">Fotos</a>
        <a href="#anchor-localizacao">Contato</a>
        <a href="#">Login</a>
      </div>
    </nav>
  )
}

class Header extends React.Component{
  constructor( props ){
    super( props )
    this.state = {
      showLogo: "main",
      showNav: false
    }

    scrollback.register({
      callback: function(){
        this.swapLogo.apply(this,["main"])
        document.querySelector('body').classList.remove("collapsed")
      }.bind(this),
      position: 50,
      direction: "up"
    })
    scrollback.register({
      callback: function(){
        this.swapLogo.apply(this,["faint"])
        document.querySelector('body').classList.add("collapsed")
      }.bind(this),
      position: 50,
      direction: "down"
    })
  }
  toggleNav(){
    this.setState({showNav: !this.state.showNav})
  }
  swapLogo( state ){
    this.setState({showLogo: state})
  }

  render(){
    return (
      <header>
        <UpperBar showLogo={this.state.showLogo=="main"}/>
        <LowerBar showLogo={this.state.showLogo=="faint"} toggleNav={this.toggleNav.bind(this)}/>
        <LowerNavBar showNav={this.state.showNav}/>
      </header>
    )
  }
}

export {Header}
