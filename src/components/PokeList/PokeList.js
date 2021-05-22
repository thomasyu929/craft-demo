import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { fetchPokeList } from '../../services/pokeService'
import { setCheckList } from '../../state/pokeAction';
import PokeItem from './PokeItem/PokeItem';

import './PokeList.scss'

function PokeList({ pokes, fetchPokeList }) {

  const [nav, setNav] = useState('all');
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    if (pokes.length === 0) {
      fetchPokeList();
    }
    setPokeList(pokes);
  }, [fetchPokeList, pokes])

  const handleSwitch = (curr) => {
    setNav(curr);
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      setPokeList(() => {
        return pokes.filter(poke => poke.name.includes(e.target.value));
      })
    }
  }

  return (
    <div className="list-container">
      <header className="header-container">
        <button className={`left-btn btn ${nav === 'all' ? 'active' : null}`} onClick={() => handleSwitch('all')}>All</button>
        <button className={`right-btn btn ${nav === 'all' ? null : 'active'}`} onClick={() => handleSwitch('bag')}>Bag</button>
      </header>
      <div className="search-container">
        <input type="text" placeholder="search pokemon..." onKeyUp={e => handleSearch(e)}></input>
      </div>
      {
        nav === 'all' ? 
          <div className="list-wrap">
            {
              pokeList && pokeList.map((item, id) => <PokeItem key={id} poke={item}></PokeItem>)
            }
          </div>
          :
          <div className="list-wrap">
            {
              localStorage.getItem('bag') ? JSON.parse(localStorage.getItem('bag')).map((item, id) => <PokeItem key={id} poke={item}></PokeItem>)
                : <h3>No Pokemon in Bag</h3>
            }
          </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    pokes: state.pokeList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPokeList: () => dispatch(fetchPokeList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokeList);