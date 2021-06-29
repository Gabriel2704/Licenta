import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './css/app.css';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Events from './pages/events';
import Participants from './pages/participants';
import Admin from './pages/admin';
import EventManagement from './pages/eventmanagement';
import Details from './pages/details';


function App() {
  return (
    <div>
     <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/home" exact component={Home} />
            <Route path="/events" exact component={Events} />
            <Route path="/participants" exact component={Participants} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/eventmanagement" exact component={EventManagement} />
            <Route path="/details" exact component={Details} />
            <Route path="/" render={() => <div>404</div>} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
