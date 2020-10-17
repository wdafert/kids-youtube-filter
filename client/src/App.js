import React from 'react';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  // remove later!!
import NavbarLanding from "./components/NavbarLanding";
import Landing from "./components/Landing"
import VideoList from './components/ViewVideoList/VideoList';
import CreateUser from './components/CreateUser';
import CreateVideo from './components/createVideo/CreateVideo';
import EditVideo from './components/EditVideo';
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'

const App= () => {
  return (
    <Router>
      <div className="container">

        <NavbarLanding />
        <Route path="/" exact component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        
        </section>
        <Route path="/list"  component={VideoList} />
        <Route path="/edit/:id" component={EditVideo} />
        <Route path="/create" component={CreateVideo} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>

  );
}

export default App;
