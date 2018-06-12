import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import { Router } from 'react-router';
import { browserHistory } from './browserHistory';
import { routes } from './routes';
import { materialUiTheme } from './style/theming';

const rootElement = document.getElementById('root') as HTMLElement;

const renderApp = (appRoutes: React.ReactNode) => ReactDOM.render(
  <MuiThemeProvider muiTheme={materialUiTheme}>
    <Router history={browserHistory}>
      {appRoutes}
    </Router>
  </MuiThemeProvider>,
  rootElement
);

renderApp(routes);

// Workaround to guarantee dynamic routing and return only one node for router
declare const module: { hot?: { accept: (file: string, callback: () => void) => void } };
if (module.hot) {
  module.hot.accept('./routes', () => renderApp(require('./routes').routes));
}
