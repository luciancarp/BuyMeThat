import * as React from 'react';
import { palette } from '../style/theming';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';

class ListElUser extends React.Component<any,any>{

    getUserTypeString=() => {
        const userType = this.props.elProps.userType;
        let userTypeString = '';
        if (userType == 2) {
            userTypeString = 'Provider';
        }
        else if(userType == 3) {
            userTypeString = 'Admin';
        }
        else {
            userTypeString = 'Needer';
        }
        return userTypeString;
    }
    render() {
        const ButtonMenu = () => (
            <IconMenu
                iconButtonElement={
                    <FlatButton
                        label={this.getUserTypeString()}
                        labelStyle={{color: palette.primary2Color}}
                        secondary={true}
                    />
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText={'Needer'} onClick={() => {this.props.onChangeUser(1, this.props.elProps.userEmail)}}/>
                <MenuItem primaryText={'Provider'} onClick={() => {this.props.onChangeUser(2, this.props.elProps.userEmail)}}/>
                <MenuItem primaryText={'Admin'} onClick={() => {this.props.onChangeUser(3, this.props.elProps.userEmail)}}/>
                <MenuItem primaryText={'Remove User'} onClick={() => {this.props.onDelete(this.props.elProps.id)}}/>
            </IconMenu>
        );        
                return(
            <ListItem
                rightIconButton={<FlatButton><ButtonMenu/></FlatButton>}
                primaryText={this.props.elProps.userName}
                secondaryText={
                    <p>
                        <span style={{color: palette.textColor}}>{this.props.elProps.userEmail}</span>
                    </p>
                }
                secondaryTextLines={2}
            />            
        )
    }
}

export default ListElUser;