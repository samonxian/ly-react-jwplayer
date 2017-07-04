import React from 'react';
//import PropTypes from 'prop-types';
import JWMutiplePlayer from './JWMutiplePlayer';
//import styled, { css } from 'styled-components';
//import classnames from 'classnames';

/**
 * JWMutiplePlayer
 *@prop {array} urls 播放器url列表，决定展示多少个播放器
 * [
 *   'http://xxxx',
 *   'http://xxxx',
 *   'http://xxxx'
 * ]
 * 或者
 * [
 *    {
 *      begin: 1497888000,
 *      end: 1497889800,
 *      url: ""
 *    }
 * ]
 * @prop {number} gap 分屏间隔
 * @prop {number} playerHeight 播放器高度
 * @prop {number} splitScreenCount 分屏数，默认为4
 * @prop {string} title 播放器上边标题
 * @prop {boolean} controls 是否展示原生的controls，默认不展示，timeline会覆盖这个
 * @prop {boolean} timeline 自定义的control
 * @prop {boolean} live 是否是直播
 */
export default class JWMutiplePlayerWithController extends React.Component {
  static propTypes = {
    //m3u8List: PropTypes.array.isRequired
  };
  componentDidMount() {}
  componentDidUpdate() {}
  render() {
    let {
      urls,
      gap,
      title,
      titles,
      controls,
      live,
      splitScreenCount,
      timeline,
      ...other
    } = this.props;
    return (
      <div {...other}>
        <JWMutiplePlayer
          live={live}
          title={title}
          titles={ titles }
          timeline={timeline}
          controls={controls}
          urls={urls}
          splitScreenCount={splitScreenCount}
          gap={gap}
        />
      </div>
    );
  }
}
