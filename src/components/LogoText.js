import React from 'react'

const LogoText = props => <span
    style={{
      color: 'var(--color-primary)',
      ...props.style
    }}
  >
    <span
      style={{
        fontFamily: 'var(--font-curs)',
        fontSize: `calc(${ props.size || 1 } * 0.8rem)`,
        fontWeight: 500,
        transition: 'font-size 0.5s',
        // color: 'var(--color-primary)'
      }}
    >little</span>
    <span
      style={{
        fontFamily: 'var(--font-curs)',
        fontSize: `calc(${ props.size || 1 } * 1.2rem)`,
        fontWeight: 400,
        letterSpacing: `${-2 * props.size || 1}px`,
        transition: 'font-size 0.5s',
        // color: 'var(--color-primary)'
      }}
    >Pet</span>
  </span>

export default LogoText