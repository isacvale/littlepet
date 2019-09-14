import React from 'react'
import '../style/business-card.scss'

class BusinessCard extends React.Component{
    constructor( props ){
        super( props )
        this.state = {
            ok: true
        }
    }
    render(){
        return(
            <div className="business-card">
                <p className="p-nome">Raquel Florentino</p>
                <p className="p-titulo">Médica veterinária</p>
                <p className="p-cmv">CRMV 5620404</p>
            </div>
        )
    }
}

export {BusinessCard}