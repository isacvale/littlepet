import React from 'react';
import './App.css';
import {Header} from './components/header'
import {Hero} from './components/hero'
import {Maincontent} from './components/maincontent'
import {Footer} from './components/footer'
// import setUpEV from './event-listeners'



class App extends React.Component{
  constructor( props ){
    super( props )
    this.state = {
      ok: true
    }
    
  }
  render(){
    return (
    <div>
      <Header />
      <Hero />
      <Maincontent />
      <Footer />
    </div>
  )}
}

export default App;
