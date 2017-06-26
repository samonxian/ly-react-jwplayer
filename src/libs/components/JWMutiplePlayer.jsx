import React from 'react';
import PropTypes from 'prop-types';
import JWPlayer from './JWPlayer';
import classnames from 'classnames';

/**
 * JWMutiplePlayer
 * @prop {array} urls 播放器url列表，决定展示多少个播放器
 * @prop {number} gap 分屏间隔
 * @prop {number} playerHeight 播放器高度
 * @prop {number} splitScreenCount 分屏数，默认为4
 */
export default class JWMutiplePlayer extends React.Component {
  gap = 10;
  splitScreenCount = 2;
  static propTypes = {
    gap: PropTypes.number,
    playerHeight: PropTypes.number,
    timelineData: PropTypes.array,
    splitScreenCount: PropTypes.number,
    m3u8List: PropTypes.array.isRequired,
    urls: PropTypes.array
  };
  getTimeLineData(m3u8List = []) {
    if (!m3u8List[0]) {
      return [];
    }
    //确保时间从小到大排序
    m3u8List.sort(function(a, b) {
      return a.end - b.end;
    });
    //获取total时间
    var total = m3u8List[m3u8List.length - 1].end - m3u8List[0].begin;
    var data = [];
    //最开始的时间
    var beginTimeStamp = m3u8List[0].begin;
    m3u8List.forEach((v, k) => {
      //有视频源的
      data.push({
        count: v.end - v.begin,
        active: true,
        url: v.url
      });
      if (m3u8List[k + 1]) {
        //无视频源的
        data.push({
          count: m3u8List[k + 1].begin - v.end,
          active: false
        });
      }
    });
    return {
      beginTimeStamp,
      total,
      data
    };
  }
  render() {
    let {
      urls,
      height,
      m3u8List = [],
      timeline,
      playerHeight,
      splitScreenCount = this.splitScreenCount,
      gap = this.gap,
      className,
      ...other
    } = this.props;
    if (!urls) {
      urls = m3u8List;
    }
    if (!urls) {
      console.error('props.url 或 props.m3u8List必传一个');
      return false;
    }
    other.style = Object.assign(
      {
        marginLeft: `-${gap / 2}px`,
        marginRight: `-${gap / 2}px`,
        minHeight: `${height || '150px'}`
      },
      other.style
    );
    return (
      <div
        {...other}
        className={classnames(
          'clearfix jw-mutiple-player-container',
          className
        )}
      >
        {urls &&
          urls.map((v, k) => {
            var timelineData;
            if (!m3u8List[k]) {
              timelineData = false;
            } else {
              timelineData = this.getTimeLineData(m3u8List[k]);
            }
            var style = {
              float: 'left',
              marginBottom: '10px',
              padding: `0 ${gap / 2}px`
            };
            var width;
            switch (splitScreenCount) {
              case 1:
                width = '100%';
                break;
              case 2:
                width = '50%';
                break;
              case 3:
                width = '33.33333333333333333333%';
                break;
              case 4:
                width = '25%';
                break;
              default:
            }
            return (
              <JWPlayer
                timeline={timeline}
                timelineData={timelineData}
                style={style}
                url={
                  (timelineData &&
                    timelineData.data &&
                    timelineData.data[0] &&
                    timelineData.data[0].url) ||
                  v
                }
                key={k}
                className="jw-player-container"
                width={width}
                height={playerHeight}
              />
            );
          })}
      </div>
    );
  }
}
