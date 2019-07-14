import React, {Component} from 'react';
import styles from './App.module.scss';
import classNames from 'classnames/bind';
import { 
  Switch, 
  Route, 
  withRouter 
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Landing from './components/Landing';
import Login from './components/Login';
import Main from './components/Main';
import Page404 from './components/Page404';

const cx = classNames.bind(styles);

@withRouter
@inject()
@observer
class App extends Component {

  render() {
    return (
      <div className={cx("App")}>
        <Switch>
            <Route path="/main" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Landing} />
            <Route  component={Page404} />
          </Switch>
      </div>
    );
  }
}

export default App;
