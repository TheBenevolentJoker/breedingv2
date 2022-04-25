import React from 'react'
import './style.css'

const Button = ({ size = 'max-content', children, className, ...props }) => {
  return (
    <button className={`button ${size} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
