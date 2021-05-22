import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { locations } from '../../assets/mock-location.json'

import './PokeDetail.scss';
import { setCheckList } from '../../state/pokeAction';

const Marker = () => <div className="marker"><i className="fas fa-map-marker-alt"></i></div>;

function PokeDetail({ pokes, checkList, setCheckList }) {
  const [poke, setPoke] = useState(null);

  const defaultProps = {
    center: { lat: 32.734778, lng: -117.152630 },
    zoom: 10
  };

  useEffect(() => {
    const path = window.location.pathname;
    const name = path.substring(path.lastIndexOf('/') + 1);

    setPoke(() => pokes.filter(poke => poke.name === name)[0]);
  }, [pokes])

  const handleCheck = (e) => {
    let bag = localStorage.getItem('bag') ? JSON.parse(localStorage.getItem('bag')) : [];

    if (e.target.checked) {
      bag.push(poke);
      console.log([...checkList, poke.name])
      setCheckList([...checkList, poke.name])
    } 
    else {
      bag = bag.filter(p => p.name !== poke.name);
      setCheckList(checkList.filter(p => p !== poke.name))
    }
    localStorage.setItem('bag', JSON.stringify(bag))
  }

  return poke && (
    <div className="details-container">
      <Link to='/'><button>Go Back</button></Link>
      <div className="info-contianer">
        <div className="details">
          <div className="basic-info">
            <img alt="poke" src={ poke.sprites.front_default }></img>
            { poke.name }
          </div>
          <div className="other-info">
            <div>Height: { poke.height }</div>
            <div>Weight: { poke.weight }</div>
            <div className="inBag"><input type="checkbox" onChange={handleCheck} defaultChecked={checkList.find(p => p === poke.name)}></input> In Bag</div>
            <div className="types">
              {
                poke.types && poke.types.map(obj => <div>{obj.type.name}</div>)
              }
            </div>
          </div>
        </div>
        <div className="map-container">
          <div id="map">
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyD4Snui6ZviMKwOjbin7ikNjIv5x64IZ30' }}
              defaultZoom={defaultProps.zoom}
              defaultCenter={defaultProps.center}
            >
              {
                locations.map(val => val.split(',')).map((loc, i) => <Marker key={i} lat={loc[0]} lng={loc[1]}></Marker>)
              }
            </GoogleMapReact>
          </div>
        </div>
      </div>
      <div className="ability-container">
        <h2>Abilities</h2>
        {
          poke.abilities && poke.abilities.map(obj => <div><Link to="">{obj.ability.name}</Link></div>)
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    pokes: state.pokeList,
    checkList: state.checkList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCheckList: (name) => dispatch(setCheckList(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokeDetail);
