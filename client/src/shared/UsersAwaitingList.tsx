import * as React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { materialUiTheme, spaces } from '../style/theming';
import Subheader from 'material-ui/Subheader';
import List from 'material-ui/List';
import styled from 'styled-components';
import { map } from 'lodash';
import ListElUserAwait from './ListElUserAwait';

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
    role: string;
};

type ListElPropContainer = {
    elProps: ListElProp;
};

const elementProps1: ListElProp = {
    id: 1,
    nameUser: 'Name User1',
    role: 'Role',
};

const elementProps2: ListElProp = {
    id: 2,
    nameUser: 'Name User2',
    role: 'Role',
};

const elementProps3: ListElProp = {
    id: 3,
    nameUser: 'Name User3',
    role: 'Role',
};

const elPropsContainer1: ListElPropContainer = {
    elProps: elementProps1
};

const elPropsContainer2: ListElPropContainer = {
    elProps: elementProps2
};

const elPropsContainer3: ListElPropContainer = {
    elProps: elementProps3
};

const listProps = [elPropsContainer1, elPropsContainer2, elPropsContainer3];

const UsersAwaitingList = () => (
    <MuiThemeProvider muiTheme={materialUiTheme}>
        <WrappedList>
            <div className={'ListItems'}>
                <List>
                    <Subheader inset={true}>Users awaiting approval</Subheader>
                    <div className={'ListEl'}>
                    {map(listProps, (id: ListElPropContainer) => <ListElUserAwait key={id.elProps.id} elProps={id.elProps}/>)}
                    </div>
                    <br/>
                </List>
            </div>
        </WrappedList>
    </MuiThemeProvider>
);

export default UsersAwaitingList;