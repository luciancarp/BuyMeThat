import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { materialUiTheme, palette } from '../style/theming';
import UserList from '../shared/UserList';
import NeederNavBar from '../shared/NeederNavBar';
import Dialog from 'material-ui/Dialog';
import { RaisedButton } from 'material-ui';
import { DOMAIN } from '../constants';
import { LOGINPAGE } from '../constants';
declare var gapi: any

class Users extends React.Component<{},any>{

	constructor(props: any){
        super(props);
        this.state = {
        	approvedUsers: [],
        	unapprovedUsers: [],
        	onChangeUser: this.postNewUserType,
			onDelete: this.deleteUserWarning,
			warningOpen: false,
			deletedUserId: ''
        };

	}
	
	handleOpenWarning = () => {
		this.setState({ warningOpen: true });
	};
  
	handleCloseWarning = () => {
		this.setState({ warningOpen: false });
	};

    componentDidMount() {
   		this.updateUsers();
    }

    postNewUserType = (newUserType: number, userEmail: String) => {
    	var id = this.getId();
	  	id.then(id => {
			var request = DOMAIN + "setUserType" + "?newUserType=" + newUserType + "&userEmail=" + userEmail;
		    fetch(request, {
		      method: 'POST',
		      body: id
	    	})
	    	.then(() => {
	    		this.updateUsers();
	    	});    	
		});
    };

	deleteUserWarning = (UserId: String) => {
		this.setState({deletedUserId: UserId});
		this.handleOpenWarning();
	};

    deleteUser = () => {
    	var id = this.getId();
	  	id.then(id => {
			var request = DOMAIN + "deleteUser" + "?userId=" + this.state.deletedUserId;
		    fetch(request, {
		      method: 'POST',
		      body: id
	    	})
	    	.then(() => {
	    		this.updateUsers();
	    	});    	
		});
		this.setState({deleteUserId: ''});
		this.handleCloseWarning();
    };          

    getId() {
		var loadGapiClient = new Promise(function(resolve, reject) {
      		gapi.load('client:auth2', resolve);
      	})
      	var id = loadGapiClient.then(() => {
      		return gapi.auth2.init().then(() => {
				var auth2 = gapi.auth2.getAuthInstance();
				if(auth2.isSignedIn.get() == false) {
					location.href = LOGINPAGE;
				}
				var idToken = auth2.currentUser.get().getAuthResponse().id_token;
				console.log(idToken);
				return idToken;
			})
      	})
      	return id;
    }

    updateUsers() {
     	var id = this.getId();

    	var approvedUsers = id.then(id => {
    		return this.getApprovedUsers(id);
    	});

    	approvedUsers.then(response => {
    		this.setState({
                approvedUsers: response
            });
    	});

    	var unapprovedUsers = id.then(id => {
    		return this.getUnapprovedUsers(id);
    	});

    	unapprovedUsers.then(response => {
    		this.setState({
                unapprovedUsers: response
            });
    	});    	    	
    }

	getApprovedUsers(idToken: String) {
		var request = DOMAIN + "getApprovedUsers";
		return fetch(request, {
			method: 'POST',
			body: idToken
		}).then(response => response.json())
		.then(responseJson => {
			return responseJson;
		});
	}

	getUnapprovedUsers(idToken: String) {
		var request = DOMAIN + "getUnapprovedUsers";
		return fetch(request, {
			method: 'POST',
			body: idToken
		}).then(response => response.json())
		.then(responseJson => {
			return responseJson;
		});
	}	

	render() {
		return(
		    <MuiThemeProvider muiTheme={materialUiTheme}>
		        <NeederNavBar/>
		        <div style={{paddingTop: 64, backgroundColor: palette.backgroundColor, minHeight: '100%'}}>
		            <UserList {...this.state}/>
		        </div>
				<Dialog
					 modal={true}
					 open={this.state.warningOpen}
					 onRequestClose={this.handleCloseWarning}
					 title="Warning"
				>
					<p><b>Are you sure you want to close the order?</b></p>					
					<RaisedButton 
						label="Yes"
						primary={true}
						style={{margin:10}}
						onClick={() => this.deleteUser()}/>
					<RaisedButton 
						label="No"
						primary={false}
						style={{margin:10}}
						onClick={this.handleCloseWarning}/>
				</Dialog>
		    </MuiThemeProvider>
    	)
	}
}

export default Users;
