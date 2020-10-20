import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  // remove later!!
import NavbarLanding from "./components/NavbarLanding";
import Landing from "./components/Landing"
import VideoList from './components/ViewVideoList/VideoList';
import CreateUser from './components/CreateUser';
import CreateVideo from './components/createVideo/CreateVideo';
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import EditVideo from './components/EditVideo';
import  Login  from './components/auth/Login'
import  Register  from './components/auth/Register'
import Alert from './components/layout/Alert';
// import './App.css';
import setAuthToken from './utils/setAuthToken'

// Redux
import { Provider } from 'react-redux';  // connects the two
import store from './store'

import { loadUser } from './actions/auth'

if (localStorage.token) {
  console.log('local Storage has token');
  setAuthToken(localStorage.token)
} else {
  console.log('local Storage has NO token');
}

const App = () => {
  useEffect(() => {   //For the first load check if user is loaded
    store.dispatch(loadUser());
    console.log('inside useEffect');
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <NavbarLanding />
          <Route path="/" exact component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>

          </section>
          <Route path="/list" component={VideoList} />
          <Route path="/edit/:id" component={EditVideo} />
          <Route path="/create" component={CreateVideo} />
          <Route path="/user" component={CreateUser} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
