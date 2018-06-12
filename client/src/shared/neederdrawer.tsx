import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import { colors } from 'material-ui/styles';
import { materialUiTheme, palette } from '../style/theming';
import MenuItem from 'material-ui/MenuItem';

class NeederDrawerMenu extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  openNewRequest = () => location.href = '/needernewrequest';


    render() {
    return (
      <MuiThemeProvider muiTheme={materialUiTheme}>
        <NavigationMenu
          color={colors.white}
          hoverColor={palette.accent1Color}
          onClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open => this.setState({open}))}
        >
          <MenuItem onClick={this.openNewRequest}>New Request</MenuItem>
          {/*<MenuItem onClick={this.handleClose}>Users</MenuItem>*/}
        </Drawer>
      </MuiThemeProvider>
    );
  }
}

export default NeederDrawerMenu;