import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfileSettings from './components/ProfileSettings';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
            <HomePage />
        </Route>

        <Route path='/register'>
            <RegisterPage />
        </Route>

        <Route path='/login'>
            <LoginPage />
        </Route>

        <Route path='/settings'>
            <ProfileSettings />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
