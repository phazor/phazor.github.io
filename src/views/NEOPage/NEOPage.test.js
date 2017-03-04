import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import NEOPage from './NEOPage';
import FetchNEO from '../../components/NEOList/FetchNEO';
import NEOList from '../../components/NEOList/NEOList';
import NEOListContainer from '../../containers/NEOListContainer';

const createFakeStore = fakeData => ({
  getState() {
    return {
      NEO: {
        NEOList: {
          elementCount: 0,
          near_earth_objects: [[]]
        },
        lastAction: "FETCH_NEO_REQUEST"
      }
    };
  },

  subscribe() {
    return 'blah';
  },

  dispatch() {
    return 'blah';
  }
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <Provider store={createFakeStore()}>
    <NEOPage />
  </Provider>, div);
});

it('NEOPage renders a section', () => {
  const wrapper = shallow(<NEOPage />);
  expect(wrapper.find('section')).toHaveLength(1);
});

it('NEOPage renders the FetchNEO Component', () => {
  const wrapper = shallow(<NEOPage />);
  expect(wrapper.find(FetchNEO)).toHaveLength(1);
});

it('NEOPage renders the NEOList Container', () => {
  const wrapper = shallow(<NEOPage />);
  expect(wrapper.find(NEOListContainer)).toHaveLength(1);
});
