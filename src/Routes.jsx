import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Frontpage from './components/pages/Frontpage';
import Publish from './components/pages/Publish';
import NotFoundPage from './components/pages/404';
import Header from './components/organisms/Header';
import Questions from './components/template/Questions';

const Routes = props => {
  return (
    <Router>
      <Header />
      <Switch>
        {/* ROUTE Root */}
        <Route exact path={'/'} render={props => <Frontpage />} />
        {/* ROUTE Publish */}
        <Route exact path={'/Publish'} render={props => <Publish />} />
        {/* ROUTE Questions */}
        <Route path={'/Questions/:id'} render={props => <Questions />} />

        {/* ROUTE 404 */}
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
