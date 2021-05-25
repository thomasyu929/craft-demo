import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import PokeList from './PokeList';

const mockStore = configureStore([]);

describe('<PokeList.test />', () => {

  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });
 
    component = renderer.create(
      <Provider store={store}>
        <PokeList />
      </Provider>
    );
  });

  it('render', () => {
    expect(component.toJSON()).toMatchSnapshot()
  })
})
