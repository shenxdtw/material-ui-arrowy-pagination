import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';

// eslint-disable-next-line import/no-named-as-default
import App from './app';

injectTapEventPlugin();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00bac7',
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NewApp = require('./app').default;
    ReactDOM.render(
      <MuiThemeProvider theme={theme}>
        <NewApp />
      </MuiThemeProvider>,
      document.getElementById('root')
    );
  });
}
