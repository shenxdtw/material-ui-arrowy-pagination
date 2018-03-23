import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TestUtils from 'react-addons-test-utils'; // ES6
import { shallow, mount } from 'enzyme';
import { createMuiTheme } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Index from '../dist/index';

const theme = createMuiTheme();

const click = wrapper => {
  // eslint-disable-next-line react/no-find-dom-node
  TestUtils.Simulate.click(ReactDOM.findDOMNode(wrapper.node));
};

describe('props and state related test', () => {
  it('correspondance between props and state', () => {
    const index = shallow(
      <Index
        total={100}
        current={20}
        display={10}
        onChange={() => {}}
      />,
    );
    expect(index.state('total')).toEqual(100);
    expect(index.state('current')).toEqual(20);
    expect(index.state('display')).toEqual(10);
  });

  it('total, current and display should be at least 1', () => {
    const index = shallow(
      <Index
        total={-1}
        current={-1}
        display={-1}
        onChange={() => {}}
      />,
    );
    expect(index.state('total')).toEqual(1);
    expect(index.state('current')).toEqual(1);
    expect(index.state('display')).toEqual(1);
  });

  it('display and current should never be greater than total', () => {
    const index = shallow(
      <Index
        total={10}
        current={20}
        display={30}
        onChange={() => {}}
      />,
    );
    expect(index.state('current')).toEqual(10);
    expect(index.state('display')).toEqual(10);
  });
});

describe('range calculation', () => {
  const index = mount(
    <Index
      total={10}
      current={1}
      display={30}
      onChange={() => {}}
    />);

  it('start should be 1 and end shoulbe be total when display === total', () => {
    expect(index.state('start')).toEqual(1);
    expect(index.state('end')).toEqual(10);
  });
  it('recalculate should happen when chaning props', () => {
    // Start shoud be 1
    index.setProps({
      current: 1,
      display: 5,
      total: 10,
    });
    expect(index.state('start')).toEqual(1);
    expect(index.state('end')).toEqual(5);

    index.setProps({
      current: 3,
      display: 5,
      total: 10,
    });
    expect(index.state('start')).toEqual(1);
    expect(index.state('end')).toEqual(5);

    // Start should not be 1 and end should not be total
    index.setProps({
      current: 4,
      display: 5,
      total: 10,
    });
    expect(index.state('start')).toEqual(2);
    expect(index.state('end')).toEqual(6);

    index.setProps({
      current: 7,
      display: 5,
      total: 10,
    });
    expect(index.state('start')).toEqual(5);
    expect(index.state('end')).toEqual(9);

    // end should be total
    index.setProps({
      current: 8,
      display: 5,
      total: 10,
    });
    expect(index.state('start')).toEqual(6);
    expect(index.state('end')).toEqual(10);

    index.setProps({
      current: 10,
      display: 5,
      total: 10,
    });
    expect(index.state('start')).toEqual(6);
    expect(index.state('end')).toEqual(10);
  });
  it('edge cases', () => {
    index.setProps({
      current: 3,
      display: 10,
      total: 2,
    });
    expect(index.state('start')).toEqual(1);
    expect(index.state('end')).toEqual(2);
  });
});

describe('check if renders in the right way', () => {
  const index = mount(
    <Index
      total={10}
      current={1}
      display={30}
      onChange={() => {}}
      showFirstPageButton={true}
      showPreviousPageButton={true}
      showNextPageButton={true}
      showLastPageButton={true}
    />, {
      context: {
        muiTheme: theme,
      },
      childContextTypes: {
        muiTheme: PropTypes.object.isRequired,
      },
    }
  );
  const btns = index.find(IconButton);
  it('render proper number of pages', () => {
    expect(btns).toHaveLength(14);
  });
  it('the page number should be right', () => {
    let i = 1;
    btns.forEach((p, offset) => {
      if (offset > 1 && offset < 12) {
        expect(parseInt(p.text(), 10)).toEqual(i);
        i += 1;
      }
    });
    index.unmount();
  });
});

describe('click behavior', () => {
  const index = mount(
    <Index
      total={30}
      current={5}
      display={7}
      onChange={() => {}}
      showFirstPageButton={true}
      showPreviousPageButton={true}
      showNextPageButton={true}
      showLastPageButton={true}
    />, {
      context: {
        muiTheme: theme,
      },
      childContextTypes: {
        muiTheme: PropTypes.object.isRequired,
      },
    }
  );
  const btns = index.find(IconButton);
  it('nextpage btn', () => {
    click(btns.at(9));
    click(btns.at(9));
    expect(index.state('current')).toEqual(7);
    expect(index.state('start')).toEqual(4);
    expect(index.state('end')).toEqual(10);
  });
  it('previouspage btn', () => {
    click(btns.at(1));
    expect(index.state('current')).toEqual(6);
    expect(index.state('start')).toEqual(3);
    expect(index.state('end')).toEqual(9);
  });
  it('firstpage btn', () => {
    click(btns.first());
    expect(index.state('current')).toEqual(1);
    expect(index.state('start')).toEqual(1);
    expect(index.state('end')).toEqual(7);
  });
  it('lastpage btn', () => {
    click(btns.last());
    expect(index.state('current')).toEqual(30);
    expect(index.state('start')).toEqual(24);
    expect(index.state('end')).toEqual(30);
  });
  it('other btn', () => {
    click(btns.at(2));
    expect(index.state('current')).toEqual(24);
    expect(index.state('start')).toEqual(21);
    expect(index.state('end')).toEqual(27);
    click(btns.at(4));
    expect(index.state('current')).toEqual(23);
    expect(index.state('start')).toEqual(20);
    expect(index.state('end')).toEqual(26);
  });
});

describe('onChange handler', () => {
  let current = 5;
  const handler = (pageNumber, previousPageNumber) => {
    current = pageNumber;
  };

  const index = mount(
    <Index
      total={30}
      current={5}
      display={7}
      onChange={handler}
      showFirstPageButton={true}
      showPreviousPageButton={true}
      showNextPageButton={true}
      showLastPageButton={true}
    />, {
      context: {
        muiTheme: theme,
      },
      childContextTypes: {
        muiTheme: PropTypes.object.isRequired,
      },
    }
  );
  const btns = index.find(IconButton);
  it('firstpage btn', () => {
    click(btns.first());
    expect(current).toEqual(1);
  });
  it('lastpage btn', () => {
    click(btns.last());
    expect(current).toEqual(30);
  });
  it('other btn', () => {
    click(btns.at(2));
    expect(current).toEqual(24);
    click(btns.at(1));
    expect(current).toEqual(23);
    click(btns.at(9));
    expect(current).toEqual(24);
    click(btns.at(8));
    expect(current).toEqual(27);
  });
});