import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import { Screen } from '../shared/Screen';
import { palette, spaces } from '../style/theming';
import { LinkedRaisedButton } from '../shared/buttons';

injectGlobal`
  @import url(//fonts.googleapis.com/css?family=Open+Sans:400|Raleway:300);
  
  * {
    box-sizing: border-box;
  }
  
  body, html, #root {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    height: 100%;
    width: 100%;
  }
  
  h1, h2, h3, h4 {
    font-family: 'Raleway', 'Open Sans', sans-serif;
    margin-bottom: ${spaces.medium}px;
    margin-top: 0;
  }
`;

const ExampleStyledComponent = styled.div`
  color: ${palette.accent1Color};
`;

const Dashboard = () => (
  <Screen>
    <h1>Buy Me That</h1>
    <ExampleStyledComponent>Example Dashboard</ExampleStyledComponent>
    <h3>Here is a linked button:</h3>
    <LinkedRaisedButton to="/matt">Get Started</LinkedRaisedButton>
    <LinkedRaisedButton to="/providerloginscreen">Provider</LinkedRaisedButton>
    <LinkedRaisedButton to="/GLogin">Needer</LinkedRaisedButton>
    <LinkedRaisedButton to="/AdminDashboard">Admin</LinkedRaisedButton>
    <LinkedRaisedButton to="/LoginScreen">Login</LinkedRaisedButton>
  </Screen>
);

export default Dashboard;
