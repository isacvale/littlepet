import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Landing, System } from './pages'

// import {Header} from './components/header'
// import {Hero} from './components/hero'
// import {Maincontent} from './components/maincontent'
// import {Footer} from './components/footer'

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
      <Router>
        <Route path="/" exact component={Landing} />
        <Route path="/clinic/" exact component={System} />
      </Router>
      // {/* <Header />
      // <Hero />
      // <Maincontent />
      // <Footer /> */}
  )}
}

export default App;
