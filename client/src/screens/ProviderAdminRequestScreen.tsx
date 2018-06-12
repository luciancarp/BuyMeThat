import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { materialUiTheme, spaces, palette } from '../style/theming';
import DashboardNavBar from '../shared/ProviderNavBar';
import styled from 'styled-components';

const WrappedText = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spaces.wide}px; 
`;

const openNewRequest = () => location.href = '/ProviderDashboard';

const SendButtons = () => (

    <RaisedButton label="Send" />

);

const CancelButtons = () => (

    <FlatButton label="Cancel" onClick={openNewRequest} />

);

const ProviderAdminRequestPage = () => (
    <MuiThemeProvider muiTheme={materialUiTheme}>
        <WrappedText>
            <DashboardNavBar/>

            <div style={{paddingTop: 64, backgroundColor: palette.backgroundColor, minHeight: '100%'}}>
                <TextField
                    floatingLabelText="Enter a message"
                    multiLine={true}
                    rows={5}
                /><br />
                <SendButtons/>
                <CancelButtons/>
            </div>
        </WrappedText>
    </MuiThemeProvider>

);

export default ProviderAdminRequestPage;