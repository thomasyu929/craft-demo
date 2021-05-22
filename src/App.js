import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PokeList from './components/PokeList/PokeList';
import PokeDetail from './components/PokeDetail/PokeDetail';
import { useEffect } from 'react';
import { setCheckList } from './state/pokeAction';
import { connect } from 'react-redux';

function App({ setCheckList }) {

  useEffect(() => {
    const bag = localStorage.getItem('bag') ? JSON.parse(localStorage.getItem('bag')) : [];
    setCheckList([...bag.map(p => p.name)])
    console.log([...bag.map(p => p.name)])
  }, [])

  return (
    <div className="App">
      <Router>
        <Route path='/' exact component={ PokeList }></Route>
        <Route path='/detail/:name' component={ PokeDetail }></Route>
      </Router>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCheckList: (bag) => dispatch(setCheckList(bag)),
  };
};

export default connect(null, mapDispatchToProps)(App);
