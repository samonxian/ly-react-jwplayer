import React from 'react';
//import PropTypes from 'prop-types';
import JWMutiplePlayer from './JWMutiplePlayer';
//import styled, { css } from 'styled-components';
//import classnames from 'classnames';

/**
 * JWMutiplePlayer
 * @prop { array } m3u8List mu3u8列表，格式如下
 * [
 *    {
 *      begin: 1497888000,
 *      end: 1497889800,
 *      url: ""
 *    }
 * ]
 */
export default class JWMutiplePlayerWithController extends React.Component {
  static propTypes = {
    //m3u8List: PropTypes.array.isRequired
  };
  componentDidMount() {}
  componentDidUpdate() {}
  render() {
    let {
      m3u8List,
      urls,
      gap,
      splitScreenCount,
      timeline,
      ...other
    } = this.props;
    return (
      <div {...other}>
        <JWMutiplePlayer
          timeline={timeline}
          m3u8List={m3u8List}
          urls={urls}
          splitScreenCount={splitScreenCount}
          gap={gap}
        />
      </div>
    );
  }
}
