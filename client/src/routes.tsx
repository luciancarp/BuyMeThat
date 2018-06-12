import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
//import Dashboard from './screens/Dashboard';
import FourOhFour from './screens/FourOhFour';
import { Matt } from './screens/Matt';
import ProviderDashboard from './screens/ProviderDashboard';
import providernewrequest from './screens/providernewrequest';
import providerlogin from './screens/providerloginscreen';
import ProviderDeclinePage from './screens/ProviderDeclinePage';
import AdminDeclinePage from './screens/AdminDeclinePage';
import ProviderAdminRequestPage from './screens/ProviderAdminRequestScreen';
import NeederDashboard from './screens/NeederDashboard';
import neederlogin from './screens/neederloginscreen';
import LoginScreen from './screens/LoginScreen';
import needernewrequest from './screens/needernewrequest';
import adminnewrequest from './screens/adminnewrequest';
import AdminDashboard from './screens/AdminDashboard';
import Users from './screens/Users'
import GLogin from './screens/GLogin';
import {UsersAwaiting} from "./screens/UsersAwaiting";
import WaitApproval from './screens/WaitApproval';

export const routes: React.ReactNode = (
  <Switch>
    <Route path="/matt" component={Matt}/>
    <Route path="/ProviderDashboard" component={ProviderDashboard}/>
    <Route path="/providernewrequest" component={providernewrequest}/>
    <Route path="/needernewrequest" component={needernewrequest}/>
    <Route path="/adminnewrequest" component={adminnewrequest}/>
    <Route path="/providerloginscreen" exact={true} component={providerlogin}/>
    <Route path="/ProviderDeclinePage" exact={true} component={ProviderDeclinePage}/>
    <Route path="/AdminDeclinePage" exact={true} component={AdminDeclinePage}/>
    <Route path="/ProviderAdminRequestPage" exact={true} component={ProviderAdminRequestPage}/>
    <Route path="/UserList" exact={true} component={Users}/>
    <Route path="/UsersAwaiting" exact={true} component={UsersAwaiting}/>
    <Route path="/NeederDashboard" exact={true} component={NeederDashboard}/>
    <Route path="/neederloginscreen" exact={true} component={neederlogin}/>
    <Route path="/LoginScreen" exact={true} component={LoginScreen}/>
    <Route path="/AdminDashboard" exact={true} component={AdminDashboard}/>
    <Route path="/GLogin" exact={true} component={GLogin}/>
    <Route path="/WaitApproval" exact={true} component={WaitApproval}/>
    <Route path="/" exact={true} component={LoginScreen}/>
    <Route component={FourOhFour}/>
  </Switch>
);
