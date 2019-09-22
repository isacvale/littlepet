import raven from '@dvo/raven/raven.mjs'
import store from './store'

raven.load(store)
window.raven = raven
window.store = store

/*
  Setup variables, observers and the lot
*/
const getScreenSize = () => {
  raven.set({
    screen: {
      x: window.innerWidth
        || document.documentElement.clientWidth
        || document.querySelector('body').clientWidth,
      y: 
      window.innerHeight
        || document.documentElement.clientHeight
        || document.querySelector('body').clientHeight
    }
  })
}

window.addEventListener('resize', getScreenSize)

getScreenSize()