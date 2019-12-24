import React, { Component } from 'react';
import { HashRouter, Route,Switch  } from 'react-router-dom';
import config from 'react-global-configuration';
import Navigation from './components/Navigation'
import Login from './components/Login'
import Details from './components/Listingdetails'
import Dashboard from './components/Dashboard'

if(window.location.hostname === 'localhost')
{
	config.set({
    baseUrl:'http://3.212.4.70:81/spdc/api'
	//	baseUrl:'http://127.0.0.1/practice_laravel/pr7/RUNNING%20CODE%20OF%20REACT_LARAVEL_MYSQL_LOGIN_REGISTERATION_PROFILE/back-front/api'
	});
}
else
{
	config.set({
		  baseUrl:'http://3.212.4.70:81/spdc/api'
	});
}
class App extends Component {
  
  render() {
   
    return (
      <HashRouter>
        <div className="App">
          <Navigation/>
                <Route exact path="/" component={Login} />
            <div className="container-fluid">
             <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/listingdetails/:address" component={Details} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
