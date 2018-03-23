import React from 'react';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Component from '../dist/index';

const styles = theme => ({
  component: {
    marginTop: '30px',
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setTotal = this.setTotal.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
    this.state = {
      total: 20,
      display: 5,
      selectedPageNumber: 3,
    };
  }

  setTotal(event) {
    // eslint-disable-next-line no-param-reassign
    let total = parseInt(event.target.value, 10) || 0;
    
    this.setState({ total });
  }

  setDisplay(event) {
    // eslint-disable-next-line no-param-reassign
    let display = parseInt(event.target.value, 10) || 0;

    this.setState({ display });
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        style={{
          width: 500,
          margin: '0 auto',
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
        }}
      >
        <h3>
          Now you are at
          <em style={{color: 'red'}}>
            {` ${this.state.selectedPageNumber} `}
          </em>
          page!
        </h3>
        <TextField
          style={{width:340}}
          onChange={this.setTotal}
          value={this.state.total}
          label='How Many Pages Do You Have?'
        /><br />
        <TextField
          style={{width:340}}
          onChange={this.setDisplay}
          value={this.state.display}
          label='How Many Pages Do You Want to Display?'
        /><br />
        <Component
          className={classes.component}
          total={this.state.total}
          current={this.state.selectedPageNumber}
          display={this.state.display}
          onChange={(pageNumber, previouspageNumber) => this.setState({selectedPageNumber: pageNumber})}
          showFirstPageButton={true}
          showPreviousPageButton={true}
          showNextPageButton={true}
          showLastPageButton={true}
        />
        <Component
          total={this.state.total}
          current={this.state.selectedPageNumber}
          display={this.state.display}
          onChange={(pageNumber, previouspageNumber) => this.setState({selectedPageNumber: pageNumber})}
          style={{marginTop: '30px'}}
          styleButton = {
            {
              color: '#00bac7',
              fontWeight: '700',
              display: 'inline-block',
              verticalAlign: 'text-bottom',
              padding: '0 10px',
              cursor: 'pointer'
            }
          }
          stylePrimary = {
            {
              color: 'white',
              fontWeight: '400',
              backgroundColor: '#00bac7',
              display: 'inline-block',
              verticalAlign: 'text-bottom',
              padding: '0 10px',
              cursor: 'pointer',
              borderRadius: '3px',
            }
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
