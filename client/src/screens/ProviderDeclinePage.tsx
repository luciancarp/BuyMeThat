import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { materialUiTheme, palette } from '../style/theming';
import DashboardNavBar from '../shared/ProviderNavBar';
import styled from 'styled-components';

const WrappedText = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${palette.backgroundColor};
  min-height: 100%;
  .textfield {
      padding-top: 64px;
  }
`;

const openNewRequest = () => location.href = '/ProviderDashboard';

const ConfirmButtons = () => (

    <RaisedButton label="Confirm" />

);

const CancelButtons = () => (

    <FlatButton label="Cancel" onClick={openNewRequest} />

);

const ProviderDeclinePage = () => (
    <MuiThemeProvider muiTheme={materialUiTheme}>
        <WrappedText>
            <DashboardNavBar/>

            <div className={'textfield'}>
                <TextField
                    floatingLabelText="Enter a message"
                    multiLine={true}
                    rows={5}
                /><br />
                <ConfirmButtons/>
                <CancelButtons/>
            </div>
        </WrappedText>
    </MuiThemeProvider>

);

export default ProviderDeclinePage;