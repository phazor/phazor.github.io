import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import NEOList from './NEOList';

let fakeStore;

beforeEach(function() {
  fakeStore = {
    getState: () => ({
      NEO: {
        NEOList: {
          near_earth_objects: [[]]
        },
        lastAction: ""
      },
    }),
    subscribe: () => ({}),
    dispatch: () => ({})
  };
})

it('component shallow renders with no errors', () => {
  const wrapper = shallow(
    <Provider store={fakeStore}>
      <NEOList />
    </Provider>
  );
});

it('component dom renders with no errors', () => {
  const wrapper = mount(
    <Provider store={fakeStore}>
      <NEOList />
    </Provider>
  );
});

it('component shows error message on failed request', () => {
  fakeStore.getState = () => ({
    NEO: {
      NEOList: {
        near_earth_objects: [[]]
      },
      lastAction: "FETCH_NEO_FAILURE"
    }
  })
  const wrapper = mount(
    <Provider store={fakeStore}>
      <NEOList />
    </Provider>
  );

  expect(wrapper.text()).toContain('Error');
});

it('component shows loading message when requesting', () => {
  fakeStore.getState = () => ({
    NEO: {
      NEOList: {
        near_earth_objects: [[]]
      },
      lastAction: "FETCH_NEO_REQUEST"
    }
  })
  const wrapper = mount(
    <Provider store={fakeStore}>
      <NEOList />
    </Provider>
  );

  expect(wrapper.text()).toContain('Loading');
});

it('component shows no message on first load', () => {
  const wrapper = mount(
    <Provider store={fakeStore}>
      <NEOList />
    </Provider>
  );

  expect(wrapper.text()).toContain('');
});

it('component renders provided list items', () => {
  fakeStore.getState = () => ({
    NEO: {
      NEOList: {
        near_earth_objects: {
          "2016-01-01": [
            {
              name: "test",
              close_approach_data: [{
                miss_distance: {
                  kilometers: 10
                },
              }],
              estimated_diameter: {
                kilometers: {
                  estimated_diameter_max: 0.08
                }
              }
            }
          ],
          "2016-01-02": [
            {
              name: "test",
              close_approach_data: [{
                miss_distance: {
                  kilometers: 20
                },
              }],
              estimated_diameter: {
                kilometers: {
                  estimated_diameter_max: 0.16
                }
              }
            }
          ],
        }
      },
      lastAction: "FETCH_NEO_SUCCESS"
    }
  });

  const wrapper = mount(
    <Provider store={fakeStore}>
      <NEOList />
    </Provider>
  );

  expect(wrapper.find('li').length).toEqual(2);
});
