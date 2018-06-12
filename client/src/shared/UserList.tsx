import * as React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { materialUiTheme, spaces } from '../style/theming';
import Subheader from 'material-ui/Subheader';
import List from 'material-ui/List';
import styled from 'styled-components';
import ListElUser from './ListElUser';
import ListElUserAwait from './ListElUserAwait';
import { map } from 'lodash';

class UserList extends React.Component<any,any>{

  componentDidMount() {

  }

  render() {

  var listPropsApprovedUsers = [];
  for (var i=(this.props.approvedUsers.length-1); i > -1; i--) {
    var elementProps: ListElProp = {
      id: this.props.approvedUsers[i].id,
      userName: this.props.approvedUsers[i].firstname + " " + this.props.approvedUsers[i].lastname,
      userEmail: this.props.approvedUsers[i].email,
      userType: this.props.approvedUsers[i].usertype
    };

    var elPropsContainer: ListElPropContainer = {
    elProps: elementProps
    };
    listPropsApprovedUsers.push(elPropsContainer);
  };

  var listPropsUnapprovedUsers = [];
  for (var i=(this.props.unapprovedUsers.length-1); i > -1; i--) {
    var elementProps: ListElProp = {
      id: this.props.unapprovedUsers[i].id,
      userName: this.props.unapprovedUsers[i].firstname + " " + this.props.unapprovedUsers[i].lastname,
      userEmail: this.props.unapprovedUsers[i].email,
      userType: this.props.unapprovedUsers[i].usertype
    };

    var elPropsContainer: ListElPropContainer = {
    elProps: elementProps
    };
    listPropsUnapprovedUsers.push(elPropsContainer);
  };  

    return(
      <MuiThemeProvider muiTheme={materialUiTheme}>
        <WrappedList>
          <div className={'ListItems'}>
            <List>
              <Subheader inset={true}>Users</Subheader>
              <div className={'ListEl'}>
              {map(listPropsApprovedUsers, (id: ListElPropContainer) => <ListElUser key={id.elProps.id} elProps={id.elProps} onChangeUser={this.props.onChangeUser} onDelete={this.props.onDelete}/>)}
              </div>
              <br/>
              <Subheader inset={true}>Users awaiting approval</Subheader>
              <div className={'ListEl'}>
              {map(listPropsUnapprovedUsers, (id: ListElPropContainer) => <ListElUserAwait key={id.elProps.id} elProps={id.elProps} onChangeUser={this.props.onChangeUser} onDelete={this.props.onDelete}/>)}
              </div>
              <br/>
            </List>
          </div>
        </WrappedList>
    </MuiThemeProvider>
      )
  }
}

  const WrappedList = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spaces.wide}px;
  .ListItems {
    flex: 1;
    min-width: 30%;
    max-width: 900px;
  }
  .ListEl {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
    background-color: white;
  }
`;

  type ListElProp = {
    id: number;
    userName: String;
    userEmail: String;
    userType: String;
  };

  type ListElPropContainer = {
    elProps: ListElProp;
  };

export default UserList;