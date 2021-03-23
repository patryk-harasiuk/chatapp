import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';

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
      </Switch>
    </Router>
  );
}

export default App;
