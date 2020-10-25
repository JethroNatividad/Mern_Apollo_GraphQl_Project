import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MenuBar from './Components/MenuBar';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './Context/AuthContext';
import AuthRoute from './util/AuthRoute';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
