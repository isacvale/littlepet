import React from 'react'
import '../style/hero.scss'
import {BusinessCard} from './business-card'

class Hero extends React.Component{
  constructor( props ){
    super( props )
    this.state = {
      ok: true
    }
  }

  render(){
    return(
      <section id="section-hero">
        <BusinessCard></BusinessCard>

          {/* <div className="hero-container">
            <p className="p-nome">Raquel Florentino</p>
            <p className="p-titulo">Médica veterinária</p>
            <p className="p-cmv">CMV 5620404</p>
import React from 'react'
          </div> */}
      </section>
    )
  }
}

export {Hero}
