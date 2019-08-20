import React, {Component} from 'react';
import styles from './App.module.scss';
import classNames from 'classnames/bind';
import { 
  Switch, 
  Route, 
  withRouter,
  Redirect 
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import Search from './components/Search';
import QuestionBoard from './components/Sidebar/components/QuestionBoard';
import CaseDetail from './components/CaseDetail';
import CommentCreate from './components/CommentCreate';
import QuestionCreate from './components/QuestionCreate';
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
    } else {
      return this.props.history.push('/');
    }
  }
  render() {
    const { cover } = this.props.commonStore;
    const { isLogged } = this.props.authStore;
    
    if (isLogged) {
      return (
        <div className={cx("App", {onCoverLayer: cover })}>
            <Switch>
              <Route path="/create/comment/:caseid" component={CommentCreate} />
              <Route path="/create/question/:caseid" component={QuestionCreate} />
              <Route path="/caseDetail/:caseid/commentDetail/:commentId" component={CommentDetail} />
              <Route path="/caseDetail/:caseid" component={CaseDetail} />
              <Route path="/question/board" component={QuestionBoard} />
              <Route path="/search" component={Search} />
              <Route path="/main" component={Main} />
              <Route path="/" component={Login} />
              <Redirect to="/main" />
            </Switch>
        </div>
      );
    }
    if (!isLogged) {
      return (
        <div className={cx("App")}>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route exact path="/" component={Login} />
              <Route component={Page404} />
            </Switch>
        </div>
      );
    }
  }
}

export default App;
