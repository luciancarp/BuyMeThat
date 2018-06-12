import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { materialUiTheme, palette } from '../style/theming';
import UserAwaitingList from '../shared/UsersAwaitingList';
import AdminNavBar from '../shared/AdminNavBar';

export const UsersAwaiting = () => (
    <MuiThemeProvider muiTheme={materialUiTheme}>
        <AdminNavBar/>
        <div style={{paddingTop: 64, backgroundColor: palette.backgroundColor, minHeight: '100%'}}>
            {<UserAwaitingList/>}
        </div>
    </MuiThemeProvider>
);
