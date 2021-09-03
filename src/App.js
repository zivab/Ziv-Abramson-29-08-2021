import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Layout from './components/Layout/Layout';
import Toastify from './components/toast/Toastify';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/favorites'>
          <Favorites />
        </Route>
      </Switch>
      <Toastify />
    </Layout>
  );
}

export default App;
