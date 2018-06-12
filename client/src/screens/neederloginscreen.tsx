import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { materialUiTheme, spaces } from '../style/theming';
import LoginNavBar from '../shared/loginNavBar';
import styled from 'styled-components';

const WrappedText = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spaces.wide}px;
  .ListItems {
    flex: 1;
    min-width: 30%;
    max-width: 900px;
  }
`;

const openNewRequest = () => location.href = '/NeederDashboard';

const LoginButtons = () => (

    <WrappedText>
    <FlatButton label="Login" onClick={openNewRequest} />
    </WrappedText>

);

const neederlogin = () => (
    <MuiThemeProvider muiTheme={materialUiTheme}>
        <WrappedText>
            <LoginNavBar/>

            <div style={{paddingTop: 64}}>
                <TextField
                    floatingLabelText="User Name"
                /><br />
                <br />
                <TextField
                    floatingLabelText="Password"
                    type="password"
                /><br />
                <LoginButtons/>
            </div>
        </WrappedText>
    </MuiThemeProvider>

);

export default neederlogin;