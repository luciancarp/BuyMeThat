import * as React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import { colors } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AdminDrawerMenu from '../shared/admindrawer';
import { palette } from '../style/theming';
import { LOGINPAGE } from '../constants';

declare var gapi: any

class AdminNavBar extends React.Component {

    signOut() {
        var loadGapiClient = new Promise(function(resolve, reject) {
            gapi.load('client:auth2', resolve);
        })
        loadGapiClient.then(() => {
            gapi.auth2.init().then(() => {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
                location.href = LOGINPAGE;                                
            });
        });      
    }

    render() {
        return(
            <AppBar
                style={{ position: 'fixed', top: 0}}
                title={<img src={require('../logo.png')} height={'60px'} width={'auto'}/>}
                iconElementLeft={<IconButton><AdminDrawerMenu/></IconButton>}
                iconElementRight={MenuLogged(this)}/>
        )
    }
}


const MenuLogged = (context: any) => (
    <IconMenu
        iconButtonElement={
            <IconButton>
                <MoreVertIcon
                    hoverColor={palette.accent1Color}
                    color={colors.white}/>
            </IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText={'Refresh'}/>
        <MenuItem primaryText={'Help'}/>
        <MenuItem primaryText={'Sign out'} onClick={context.signOut}/>
    </IconMenu>
);
export default AdminNavBar;