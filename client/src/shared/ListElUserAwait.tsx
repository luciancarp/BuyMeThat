import * as React from 'react';
import { palette } from '../style/theming';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';

class ListElUserAwait extends React.Component<any,any>{

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
                        label={'Approve/Reject'}
                        secondary={true}
                    />
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText={'Approve'} onClick={() => {this.props.onChangeUser(1, this.props.elProps.userEmail)}}/>
                <MenuItem primaryText={'Reject'} onClick={() => {this.props.onDelete(this.props.elProps.userEmail)}}/>
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

export default ListElUserAwait;