import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { materialUiTheme, palette } from '../style/theming';
import AdminDashboardList from '../shared/AdminDashboardList';
import NeederNavBar from '../shared/NeederNavBar';
import Dialog from 'material-ui/Dialog';
import { RaisedButton } from 'material-ui';
import { DOMAIN } from '../constants';
import { LOGINPAGE } from '../constants';

declare var gapi: any

class AdminDashboard extends React.Component<{},any>{

	constructor(props: any){
        super(props);
        this.state = {
             myOrders: [],
             openOrders: [],
             managedOrders: [],
             flaggedOrders: [],
             onAccept: this.postClaimOrder,
             onFlag: this.postFlagOrder,
			 onUpdateStatus: this.updateOrderStatus,
			 getNotes: this.getNotes,
			 onSubmitNote: this.postNote,
			 orderIdUpdated: -1
        };

    }

	handleOpenWarning = () => {
		this.setState({ warningOpen: true });
	};
  
	handleCloseWarning = () => {
		this.setState({ warningOpen: false });
	};

    updateOrderStatus = (orderId: number, newStatusId: number) => {
    	if( newStatusId == 4 ) { 
			this.setState({orderIdUpdated: orderId});
			this.handleOpenWarning();
		} else 
		{
    	var id = this.getId();
	  	id.then(id => {
			var request = DOMAIN + "updateOrderStatus" + "?orderId=" + orderId + "&statusId=" + newStatusId;
		    fetch(request, {
		      method: 'POST',
		      body: id
	    	})
	    	.then(() => {
	    		this.updateOrders();
	    	});    	
		});
		}
	}
	
	closeOrder = () => {
		var id = this.getId();
	  	id.then(id => {
			var request = DOMAIN + "updateOrderStatus" + "?orderId=" + this.state.orderIdUpdated + "&statusId=" + 4;
		    fetch(request, {
		      method: 'POST',
		      body: id
	    	})
	    	.then(() => {
	    		this.updateOrders();
	    	});    	
		});
		this.handleCloseWarning();
	}

    componentDidMount() {
    	const id = this.getId();
        const userType = id.then((res) => {
          return this.getUserType(res);
        });
        userType.then((res) => {
          if(res != 3) {
            this.signOut();
          }
        }); 
   		this.updateOrders();
    }


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

    updateOrders() {
     	var id = this.getId();


    	var newOrders = id.then(id => {
    		return this.getUserOrders(id);
    	});
    	var openOrders = id.then(id => {
    		return this.getOpenOrders(id);
    	});
     	var managedOrders = id.then(id => {
    		return this.getManagedOrders(id);
    	});
    	var flaggedOrders = id.then(id => {
    		return this.getFlaggedOrders(id);
    	});   	

    	newOrders.then(response => {
    		this.setState({
                myOrders: response
            });
    	});

    	openOrders.then(response => {
    		this.setState({
                openOrders: response
            });
    	});

    	managedOrders.then(response => {
    		this.setState({
                managedOrders: response
            });
    	});
    	flaggedOrders.then(response => {
    		this.setState({
                flaggedOrders: response
            });
    	});       	    	
    }

    postClaimOrder = (orderId: number) => {
	  	var id = this.getId();
	  	id.then(id => {
			var request = DOMAIN + "claimOrder" + "?orderId=" + orderId;
		    fetch(request, {
		      method: 'POST',
		      body: id
	    	})
	    	.then(() => {
	    		this.updateOrders();
	    	});    	
		});
  	}

    postFlagOrder = (orderId: number) => {
	  	var id = this.getId();
	  	id.then(id => {
			var request = DOMAIN + "flagOrder" + "?orderId=" + orderId;
		    fetch(request, {
		      method: 'POST',
		      body: id
	    	})
	    	.then(() => {
	    		this.updateOrders();
	    	});    	
		});
  	}   	


	getUserOrders(idToken: String) {
		var request = DOMAIN + "getUserOrders";
		return fetch(request, {
			method: 'POST',
			body: idToken
		}).then(response => response.json())
		.then(responseJson => {
			return responseJson;
		});
	}

	getOpenOrders(idToken: String) {
		var request = DOMAIN + "getOpenOrders";
		return fetch(request, {
			method: 'POST',
			body: idToken
		}).then(response => response.json())
		.then(responseJson => {
			return responseJson;
		});
	}

	getFlaggedOrders(idToken: String) {
		var request = DOMAIN + "getFlaggedOrders";
		return fetch(request, {
			method: 'POST',
			body: idToken
		}).then(response => response.json())
		.then(responseJson => {
			return responseJson;
		});
	}	

	getManagedOrders(idToken: String) {
		var request = DOMAIN + "getManagedOrders";
		return fetch(request, {
			method: 'POST',
			body: idToken
		}).then(response => response.json())
		.then(responseJson => {
			return responseJson;
		});
	}

	  getUserType(idToken: String) {
	      var request = DOMAIN + "getUserType";
	      return fetch(request, {
	          method: 'POST',
	          body: idToken
	      }).then(response => response.json())
	      .then(responseJson => {
	          return responseJson;
	      });
	  }

	  postNote = (note: string, orderId: number) => {
		this.getId().then((idToken) => {
			var request = DOMAIN + "/postNote" + "?noteContent=" + note + "&orderId=" + orderId;
			fetch(request, {
				method: 'POST',
				body: idToken
			});
		});
		};
	
	  getNotes = (orderId: number) => {
		return this.getId().then((idToken) => {
		  var request = DOMAIN + "/getOrderNotes" + "?orderId=" + orderId;
		  return fetch(request, {
			method: 'POST',
			body: idToken
		  }).then(response => response.json())
		  .then(responseJson => {
			return responseJson;
		  });
		});
	  }
	  
	  signOut() {
	      var loadGapiClient = new Promise(function(resolve, reject) {
	          gapi.load('client:auth2', resolve);
	      })
	      loadGapiClient.then(() => {
	          gapi.auth2.init().then(() => {
	              var auth2 = gapi.auth2.getAuthInstance();
	              auth2.signOut().then(function () {
	                  console.log('User signed out.');
	              });
	              location.href = LOGINPAGE;                                
	          });
	      });      
	  } 		

	render() {
		return(
		    <MuiThemeProvider muiTheme={materialUiTheme}>
		        <NeederNavBar/>
		        <div style={{paddingTop: 64, backgroundColor: palette.backgroundColor, minHeight: '100%'}}>
		            <AdminDashboardList {...this.state}/>
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
						onClick={() => this.closeOrder()}/>
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

export default AdminDashboard;
