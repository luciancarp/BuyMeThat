import * as React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { materialUiTheme, spaces } from '../style/theming';
import Subheader from 'material-ui/Subheader';
import List from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import ListElPending from './ListElementPending';
import ListElPurchased from './ListElementPurchased';
import { map } from 'lodash';

class NeederDashboardList extends React.Component<any,any>{

  componentDidMount() {

  }

  render() {

  var listPropsPending = [];
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
      url: this.props.myOrders[i].url,
      notes: this.props.myOrders[i].notes
    };

    var elPropsContainer: ListElPropContainer = {
    elProps: elementProps
    };
    if(this.props.myOrders[i].status != 'Closed' && this.props.myOrders[i].status != 'Declined') {
      listPropsPending.push(elPropsContainer);
    }
    else {
      listPropsHistory.push(elPropsContainer);
    }
  };

    return(
      <MuiThemeProvider muiTheme={materialUiTheme}>
        <WrappedList>
          <div className={'ListItems'}>
            <List>
              <RaisedButton label="New Request" secondary={true} href={'/needernewrequest'}/>
              <Subheader inset={true}>Open Orders</Subheader>
              <div className={'ListEl'}>
              {map(listPropsPending, (id: ListElPropContainer) => <ListElPending key={id.elProps.id} elProps={id.elProps} onSubmitNote={this.props.onSubmitNote} getNotes={this.props.getNotes}/>)}
              </div>
              <br/>
              <Subheader inset={true}>Order History</Subheader>
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
    notes: string;
  };

  type ListElPropContainer = {
    elProps: ListElProp;
  };

export default NeederDashboardList;