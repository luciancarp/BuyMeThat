import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { materialUiTheme, palette } from '../style/theming';
import NeederDashboardList from '../shared/NeederDashboardList';
import NeederNavBar from '../shared/NeederNavBar';
import { DOMAIN } from '../constants';
import { LOGINPAGE } from '../constants';
declare var gapi: any

class NeederDashboard extends React.Component<{},any>{

	constructor(props: any){
        super(props);
        this.state = {
			 myOrders: [],
             getNotes: this.getNotes,
			 onSubmitNote: this.postNote,
      };
    }

    componentDidMount() {
        const id = this.getId();
        const userType = id.then((res) => {
          return this.getUserType(res);
        });
        userType.then((res) => {
          if(res != 1) {
            this.signOut();
          }
        });

        var newOrders = id.then((id) => {
        	return this.getUserOrders(id);
        });
        newOrders.then((response) => {
        	this.setState({
                myOrders: response
            });
        })
    }

	render() {
        return(
        	<MuiThemeProvider muiTheme={materialUiTheme}>
        	<NeederNavBar/>
        	<div style={{paddingTop: 64, backgroundColor: palette.backgroundColor, minHeight: '100%'}}>
        	<NeederDashboardList {...this.state}/>
        	</div>
    		</MuiThemeProvider>
        )
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
				return idToken;
			})
      	})
      	return id;
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

}   

export default NeederDashboard;