import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Publish from './components/pages/Publish';
import NotFoundPage from './components/pages/404';
import Header from './components/organisms/Header';
import Questions from './components/pages/Questions';
import SingleQuestion from './components/pages/SingleQuestion';

const Routes = props => {
  return (
    <Router>
      <Header />
      <Switch>
        {/* ROUTE Root */}
        <Route exact path={'/'} render={props => <Questions />} />
        {/* ROUTE Publish */}
        <Route exact path={'/Publish'} render={props => <Publish />} />
        {/* ROUTE Questions */}
        <Route exact path={'/Questions'} render={props => <Questions />} />
        {/* ROUTE Questions by id */}
        <Route
          path={'/Questions/:id'}
          render={props => <SingleQuestion {...props} />}
        />

        {/* ROUTE 404 */}
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
