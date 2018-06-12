import * as React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import { colors } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ProviderDrawerMenu from './providerdrawer';
import { palette } from '../style/theming';

const logout = () => location.href = '/providerloginscreen';

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
        <MenuItem primaryText={'Sign out'} onClick={logout}/>
    </IconMenu>
);

const ProviderNavBar = () => (
    <AppBar
        style={{ position: 'fixed', top: 0}}
        title={<img src={require('../logo.png')} height={'60px'} width={'auto'}/>}
        iconElementLeft={<IconButton><ProviderDrawerMenu/></IconButton>}
        iconElementRight={<MenuLogged/>}
        showMenuIconButton={false}
    />
);

export default ProviderNavBar;