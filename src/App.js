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
import Search from './components/Search';
import CaseDetail from './components/CaseDetail';
import CommentDetail from './components/CaseDetail/components/CommentDetail';
import Page404 from './components/Page404';

const cx = classNames.bind(styles);

@withRouter
@inject('commonStore', 'authStore')
@observer
class App extends Component {
  componentDidMount() {
    const { isLogged } = this.props.authStore;
    if (isLogged) {
      // return this.props.history.push('/main/updatedCase');
    } else {
      return this.props.history.push('/');
    }
  }
  render() {
    const { cover } = this.props.commonStore;
    const { isLogged } = this.props.authStore;
    return (
      <div className={cx("App", {onCoverLayer: cover })}>
          <Switch>
            {
              isLogged && 
              <>
                <Route path="/caseDetail/:caseid/commentDetail/:commentId" component={CommentDetail} />
                <Route path="/caseDetail/:caseid" component={CaseDetail} />
                <Route path="/search" component={Search} />
                <Route path="/main/:listType" component={Main} />
              </>
            }
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Landing} />
            <Route component={Page404} />
          </Switch>
      </div>
    );
  }
}

export default App;
