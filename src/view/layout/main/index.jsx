import React from 'react';
import {
  //inject
} from 'mobx-react';

import 'antd/dist/antd.css';

//Link是基于react-router重写的。
//如果你使用prefixUrl,你应该使用这个重写的Link组件。
//你也可以使用`r2-js/libs/path`传递url，`r2-js/libs/components/Link`是基于path的。
//<Link to={ path('/about') } />
import Link from 'react-mobx-boilerplate-js/libs/components/Link';

import logo from 'src/style/img/logo.svg';
import 'src/style/css/bootstrap.css';
import 'src/style/css/layout-main.css';

//layout view 一级路由组件.
//你可以编辑`./_route.js`文件，改变主页和主页url.
class LayoutView extends React.Component {
  render() {
    return (
      <div className="layout-container">
        <nav className="navbar navbar-inverse ">
          <div className="navbar-header">
            <ul className="nav navbar-nav">
              <li className="logo-con">
                <a>
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
              </li>
              <li>
                <Link to="/">
                  主页
                </Link>
              </li>
              <li>
                <Link to="/about">
                  关于
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="main-contents">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default LayoutView;
