import React from 'react'
import { Link } from 'react-router-dom'
import './PokeItem.scss'

function PokeItem({ poke }) {
  return (
    <Link to={ `/detail/${ poke.name }` }>
      <div className="poke-container">
        <div className="img-container">
          <img alt="poke" src={ poke.sprites.front_default }></img>
        </div>
        { poke.name }
      </div>
    </Link>
  )
}

export default PokeItem
