import { fetchOne, fetchMore } from 'react-mobx-boilerplate-js/libs/fetch';
import { browserHistory } from 'react-router';
import { message } from 'antd';
import path from 'react-mobx-boilerplate-js/libs/path';
import cookie from 'js-cookie';

const push = browserHistory.push;

var host = '';

function getOptions(options = {}) {
  const token = cookie.get('token');
  if (token) {
    options = Object.assign(
      {},
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml,application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8',
          token: token
        },
        credentials: 'omit'
      },
      options
    );
  }
  return options;
}
/**
 * 返回结构如下，处里_httpStatus是自动添加去的，其他的都是跟api定义的一样。
 * {
 *    _httpStatus: 200,
 *    ...
 * }
 */
function _fetchOne(url, options) {
  options = getOptions(options);
  if (options.host) {
    host = options.host;
  }
  return fetchOne(host + url, options).then(result => {
    if (result) {
      if (result._httpStatus === 401) {
        push(path('/user/login'));
        message.warning(result.message);
      } else if (result._httpStatus === 403) {
        push(path('/'));
        message.warning(result.message);
      }
    }
    return result;
  });
}
function _fetchMore(urls, options = {}) {
  if (options.host) {
    host = options.host;
  }
  urls.forEach(v => {
    v = host + v;
  });
  options = getOptions(options);
  return fetchMore(urls, options).then(result => {
    if (result) {
      for (var i = 0; i < result.length; i++) {
        var v = result[i];
        if (v._httpStatus === 401) {
          push(path('/user/login'));
          message.warning(v.message);
          //只要有一个返回，就停止循环。
          break;
        } else if (v._httpStatus === 403) {
          push(path('/'));
          message.warning(v.message);
          break;
        }
      }
    }
    return result;
  });
}

function fetchDecorator(component) {
  component.prototype.fetchOne = _fetchOne;
  component.prototype.fetchMore = _fetchMore;
  return component;
}
export default fetchDecorator;
