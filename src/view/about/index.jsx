import React from 'react';
import PageTitle from 'react-mobx-boilerplate-js/libs/decorator/PageTitle';

//设置页面标题
@PageTitle('About')
//二级路由view组件
//你可以编辑`./_route.js`文件改变当前页面组件的url链接。
class AboutView extends React.Component {
  render() {
    return (
      <div>
        <h1>关于</h1>
        开始编写, 请编辑 src/view/about/index.jsx.
        <br />
        保存文件时，将自动更新到浏览器。
      </div>
    );
  }
}

export default AboutView;
