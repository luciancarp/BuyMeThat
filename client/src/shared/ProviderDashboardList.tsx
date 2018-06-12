import * as React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { materialUiTheme, spaces } from '../style/theming';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List';
import styled from 'styled-components';
import ListElAwaiting from './ListElementAwaiting';
import ListElPurchased from './ListElementPurchased';
import ListElManaged from './ListElementManaged';
import { map } from 'lodash';

class ProviderDashboardList extends React.Component<any,any>{

  componentDidMount() {

  }

  render() {

  var listPropsHistory = [];
  for (var i=(this.props.myOrders.length-1); i > -1; i--) {
    var elementProps: ListElProp = {
      id: this.props.myOrders[i].id,
      nameUser: '',
      itemName: this.props.myOrders[i].name,
      itemDescription: this.props.myOrders[i].description,
      itemStatus: this.props.myOrders[i].status,
      itemTime: this.props.myOrders[i].time,
      provider: this.props.myOrders[i].providername,
      url: this.props.myOrders[i].url
    };

    var elPropsContainer: ListElPropContainer = {
    elProps: elementProps
    };
    listPropsHistory.push(elPropsContainer);
  }

  var listPropsManaged = [];
  for (var i=(this.props.managedOrders.length-1); i > -1; i--) {
    var elementProps: ListElProp = {
      id: this.props.managedOrders[i].id,
      nameUser: this.props.managedOrders[i].firstname + " " + this.props.managedOrders[i].lastname,
      itemName: this.props.managedOrders[i].name,
      itemDescription: this.props.managedOrders[i].description,
      itemStatus: this.props.managedOrders[i].status,
      itemTime: this.props.managedOrders[i].time,
      provider: this.props.managedOrders[i].providername,
      url: this.props.managedOrders[i].url
    };

    var elPropsContainer: ListElPropContainer = {
    elProps: elementProps
    };
    listPropsManaged.push(elPropsContainer);
  }

  var listPropsAwaiting = [];
    for (var i=0; i < this.props.openOrders.length; i++) {
    var elementProps: ListElProp = {
      id: this.props.openOrders[i].id,
      nameUser: this.props.openOrders[i].firstname + " " + this.props.openOrders[i].lastname,
      itemName: this.props.openOrders[i].name,
      itemDescription: this.props.openOrders[i].description,
      itemStatus: this.props.openOrders[i].status,
      itemTime: this.props.openOrders[i].time,
      provider: this.props.openOrders[i].providername,
      url: this.props.openOrders[i].url
    };

    var elPropsContainer: ListElPropContainer = {
    elProps: elementProps
    };
    listPropsAwaiting.push(elPropsContainer);
  };

    return(
      <MuiThemeProvider muiTheme={materialUiTheme}>
        <WrappedList>
          <div className={'ListItems'}>
            <List>
              <RaisedButton label="New Request" secondary={true} href={'/needernewrequest'}/>
              <Subheader inset={true}>Orders awaiting your approval</Subheader>
              <div className={'ListEl'}>
              {map(listPropsAwaiting, (id: ListElPropContainer) => <ListElAwaiting key={id.elProps.id} elProps={id.elProps} onUpdateStatus={this.props.onUpdateStatus} accept={this.props.onAccept} onFlag={this.props.onFlag} onSubmitNote={this.props.onSubmitNote} getNotes={this.props.getNotes}/>)}
              </div>
              <br/>
              <Subheader inset={true}>Managed Orders</Subheader>
              <div className={'ListEl'}>
              {map(listPropsManaged, (id: ListElPropContainer) => <ListElManaged key={id.elProps.id} elProps={id.elProps} onUpdateStatus={this.props.onUpdateStatus} accept={this.props.onAccept} onFlag={this.props.onFlag} onSubmitNote={this.props.onSubmitNote} getNotes={this.props.getNotes}/>)}
              </div>
              <br/>
              <Subheader inset={true}>My Orders</Subheader>
              <div className={'ListEl'}>
              {map(listPropsHistory, (id: ListElPropContainer) => <ListElPurchased key={id.elProps.id} elProps={id.elProps} onSubmitNote={this.props.onSubmitNote} getNotes={this.props.getNotes}/>)}
              </div>
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
    nameUser: string;
    itemName: string;
    itemDescription: string;
    itemStatus: string;
    itemTime: string;
    provider: string;
    url: string;
  };

  type ListElPropContainer = {
    elProps: ListElProp;
  };

export default ProviderDashboardList;