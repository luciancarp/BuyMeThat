import * as React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import { colors } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { palette } from '../style/theming';

const MenuLogged = () => (
    <IconMenu
        iconButtonElement={
            <IconButton>
                <MoreVertIcon
                    hoverColor={palette.accent1Color}
                    color={colors.white}
                />
            </IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText={'Refresh'}/>
        <MenuItem primaryText={'Help'}/>
    </IconMenu>
);

const LoginNavBar = () => (
    <AppBar
        style={{ position: 'fixed', top: 0}}
        title={<img src={require('../logo.png')} height={'60px'} width={'auto'}/>}
        showMenuIconButton={false}
        iconElementRight={<MenuLogged/>}
    />
);

export default LoginNavBar;