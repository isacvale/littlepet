import React from 'react'
import { Header } from '../components'
import { CeilToList } from '../utils'

class Landing extends React.Component {
  retrieverSizes = [320, 480, 576, 768, 992, 1200]

  state={
    heroSize: CeilToList(window.store.screen.x, this.retrieverSizes),
    largeSize: 0
  }

  componentDidMount () {
    window.raven.subscribe(
      {screen: 'x'},
      () => {
        const size = CeilToList(window.store.screen.x, this.retrieverSizes)
        if (size > this.state.heroSize)
          this.setState({
            heroSize: size
          })
      }
    )
  }
  
  render () {
    const heroImageSize = this.state.heroSize
    console.log('image Size', heroImageSize)

    return (
      <>
        <Header />
        <div
          style={{
            width: '100%',
            minHeight: 2000,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${require(`../images/retriever-${heroImageSize}.png`)})`,
          }}
        >
        </div>
      </>
    )
  }
}
  

export default Landing