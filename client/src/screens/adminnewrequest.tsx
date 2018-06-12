import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { materialUiTheme, palette } from '../style/theming';
import AdminNavBar from '../shared/AdminNavBar';
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

const openNewRequest = () => location.href = '/AdminDashboard';

const SubmitButtons = () => (

    <RaisedButton label="Submit" />

);

const CancelButtons = () => (

    <FlatButton label="Cancel" onClick={openNewRequest} />

);

const TextFieldExampleSimple = () => (
    <MuiThemeProvider muiTheme={materialUiTheme}>
        <WrappedText>
            <AdminNavBar/>

            <div className={'textfield'}>
                <TextField
                    floatingLabelText="Item Name"
                /><br />
                <br />
                <TextField
                    floatingLabelText="Description of the item."
                    multiLine={true}
                    rows={5}
                /><br />
                <SubmitButtons/>
                <CancelButtons/>
            </div>
        </WrappedText>
    </MuiThemeProvider>

);

export default TextFieldExampleSimple;