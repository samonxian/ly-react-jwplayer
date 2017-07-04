import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import lyplayer from './jwplayer-swf';
import classnames from 'classnames';
import moment from 'moment';
import styled, { css } from 'styled-components';
import util from 'src/util';

const timeLineMarginLeft = '40';
const timeLineMarginRight = '70';
const PlayerContainer = styled.div`
  width: 100%;
  ${props =>
    props.height &&
    css`
      height: ${props.height};
	`}
  background: #000;
  position: relative;
`;
const TopTip = styled.div`
  display: none;
  width: 100%;
  line-height: 40px;
  min-heihgt: 40px;
  position: absolute;
  top: 0px;
  background-color: #000;
  border-bottom: #333 1px solid;
  color: #fff;
  text-align: left;
  text-indent: 10px;
`;
const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 32px;
  margin: -25px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  animation: spin 2s linear infinite;
  color: #fff;
`;
const PlayerControllerContainer = styled.div`
  display: none;
  position: absolute;
  bottom: 0px;
  background-color: #000;
  border-top: #333 1px solid;
  ${props =>
    css`
      width: ${props.width || '100%'};
      height: ${props.height || '40px'};
	`}
`;

const ToolTip = styled.div`
  max-width: 250px;
  min-width: 160px;
  text-align: center;
  padding: 8px 10px;
  color: #fff;
  text-align: left;
  text-decoration: none;
  background-color: rgba(64,64,64,.85);
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  min-height: 34px;
  position: absolute;
  ${props =>
    css`
    top: ${props.top || -55}px;
    left: ${props.left || 0}px;
	`}
`;
const Line = styled.div`
  width: 2px;
  position: absolute;
  ${props =>
    css`
    background-color: ${props.bgColor || 'blue'};
    height: ${props.height};
    bottom: ${props.bottom || 0}px;
    left: ${props.left || 0}px;
	`}
`;
const PlayerTimeLineContainer = styled.div`
  position: relative;
  margin: 0px ${timeLineMarginRight}px 0 ${timeLineMarginLeft}px;
  bottom: -18px;
  ${props =>
    css`
      height: ${props.height || '.2em'};
	`}
`;
const TimeBlock = styled.div`
  cursor: pointer;
  height: 100%;
  float: left;
	background: #ccc;
  ${props =>
    props.width &&
    css`
      width: ${props.width};
	`}
  ${props =>
    props.active &&
    css`
      background: #384154;
	`}
`;
const LeftControl = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 6px;
  height: 100%;
`;

const RightControl = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 6px;
  height: 100%;
`;

const DefaultEmptyPlayer = styled.div`
  background-color: #000;
  height: 100%;
  color: #fff;
  text-align: center;
`;
const IconButton = styled.div`
  margin-right: 10px;
  ${props =>
    css`
      margin-left: ${props.marginLeft || 0};
	`}
`;
const SpanLabel = styled.div`
  color: #fff;
  position: relative;
  top: calc(50% - 10px);
`;
/**
 * JWPlayer
 * @prop {string} id 元素ID用来给JWPlayer使用，为空时，自动生成。
 * @prop {string} width 播放器宽度，默认650
 * @prop {string} height 播放器高度，默认值400
 * @prop {string} url 播放器唯一标识，url的改变会触发重新渲染播放器，必填
 * @prop {string} title 播放器上边标题
 * @prop {boolean} controls 是否展示原生的controls，默认不展示，timeline会覆盖这个
 * @prop {boolean} timeline 自定义的control
 * @prop {boolean} live 是否是直播
 */
export default class JWPlayer extends React.Component {
  state = {};
  id = 'player' + Math.random();
  url;
  palyerFirstRendered = false;
  static propTypes = {
    id: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    timeline: PropTypes.bool,
    controls: PropTypes.bool,
    live: PropTypes.bool,
    url: PropTypes.string.isRequired
  };
  componentDidMount() {
    this.playerContainerDom = ReactDOM.findDOMNode(this.refs.playerContainer);
    this.setState({
      random: Math.random()
    });
    //处理esc按键
    this.keyUpEvent = document.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.setState({
          timelinePositionX: 70
        });
      }
    });
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyUpEvent);
  }
  componentDidUpdate() {
    let { url } = this.props;
    if (this.url !== url || !this.palyerFirstRendered) {
      this.renderPlayer();
      if (!this.palyerFirstRendered) {
        this.palyerFirstRendered = true;
      }
    }
  }
  renderPlayer(changeUrl) {
    let {
      url,
      id,
      autostart = true,
      controls = false,
      timeline,
      stretching,
      rtmp,
      hls,
      live,
      image,
      mute = false,
      aspectratio
    } = this.props;
    if (autostart) {
      this.setState({
        play: autostart,
        mute: mute
      });
    }
    if (timeline) {
      controls = false;
    }
    if (!url) {
      return;
    }
    if (changeUrl) {
      //处理传参url
      if (this.innerUrl === changeUrl) {
        return;
      }
      this.innerUrl = changeUrl;
    } else {
      this.url = url;
    }
    var playerInstance = lyplayer(this.id || id);
    this.playerInstance = playerInstance;
    playerInstance.setup({
      flashplayer: '/lyplayer.flash.swf',
      file: changeUrl || url, // rtmp地址或者hls
      image: image,
      width: '100%', // 播放器宽度
      height: '100%', // 播放器高度
      autostart: autostart, // 自动开始播放
      aspectratio: aspectratio || '16:9',
      controls: controls,
      stretching: stretching || 'uniform', // 保持视频原尺寸比例缩放
      rtmp:
        rtmp ||
          {
            //stagevideo: true, // 尝试启用硬件加速，默认关闭
            //bufferlength: 1, // 开始播放缓存时长（秒）
            // rtmp服务器ip，最多可提供3个服务器（包括file提供的地址）同时连接，最后只使用建立连接最快的服务器，其余的断开
            //servers: ['192.168.88.101', '192.168.88.102']
          },
      hls: hls || {
        //stagevideo: true, // 尝试启用硬件加速，默认关闭
        bufferlength: 0.1 // 开始播放缓存时长（秒）
      }
    });
    playerInstance.on('ready', data => {
      this.setState({
        ready: true
      });
    });
    playerInstance.on('buffer', data => {
      this.setState({
        //加载
        buffer: 1
      });
    });
    playerInstance.on('seeked', data => {
      this.setState({
        //完成
        buffer: 2
      });
    });
    playerInstance.on('flashThrottle', data => {
      if (live) {
        this.setState({
          //直播加载完成
          buffer: 2
        });
      }
    });
    //playerInstance.on('all', e => {
    //if(e !== 'meta' && e !== 'time') {
    //console.debug(e)
    //}
    //});
  }

  hideControllerByTime = (time = 3000) => {
    return setTimeout(() => {
      var timelineStyle = {};
      this.setState({
        timelineStyle
      });
    }, time);
  };

  onPlayerMoveEvent = e => {
    clearTimeout(this.clearTimeout);
    let { timelineStyle, overController, play } = this.state;
    if (timelineStyle && timelineStyle.display !== 'block') {
      timelineStyle = {
        display: 'block'
      };
      this.setState({
        timelineStyle
      });
    }
    if (!overController && play) {
      //如果不在控制栏中，执行setTimeout
      this.clearTimeout = this.hideControllerByTime();
    }
  };

  onPlayerOverEvent = e => {
    var timelineStyle = {
      display: 'block'
    };
    this.setState({
      timelineStyle
    });
    this.clearTimeout = this.hideControllerByTime();
  };
  onPlayerOutEvent = e => {
    if (this.state.play) {
      //暂停是要一直显示timelien的
      var timelineStyle = {};
      this.setState({
        timelineStyle
      });
    }
  };
  onControllerOverEvent = e => {
    clearTimeout(this.clearTimeout);
    var timelineStyle = {
      display: 'block'
    };
    this.setState({
      //鼠标在controller上面
      overController: true,
      timelineStyle
    });
  };
  onControllerOutEvent = e => {
    this.setState({
      //鼠标不在controller上面
      overController: false
    });
  };
  //countTime 时间轴总时间
  onTimeLineMouseMove(beginTimeStamp, countTime) {
    return e => {
      if (!beginTimeStamp) {
        return;
      }
      /**
      * 获取元素绝对横坐标
      * @param {Object} 元素
      */
      function getElementLeft(element, customLeft = 0) {
        var actualLeft =
          element.offsetLeft -
          parseInt(element.style.marginLeft || 0, 10) +
          customLeft;
        var current = element.offsetParent;
        if (current) {
          actualLeft -= parseInt(current.style.paddingLeft || 0, 10);
        }
        while (current !== null) {
          actualLeft += current.offsetLeft;
          current = current.offsetParent;
        }
        return actualLeft;
      }
      var fullScreen = util.isFullscreen();
      var positionX;
      if(fullScreen) {
        positionX = e.clientX - 40;
      }else {
        positionX = e.clientX - getElementLeft(e.currentTarget);
      }
      var width = e.currentTarget.offsetWidth;
      var time = positionX / width * countTime;
      var hovertime = moment((beginTimeStamp + time) * 1000).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      //console.debug(this.hovertime)
      this.setState({
        hovertime: hovertime,
        timelinePositionX: positionX
      });
    };
  }

  timeBlockClickEvent = (v, k) => {
    return e => {
      let { timelineData } = this.props;
      let { timelinePositionX } = this.state;
      if (this.timelinePositionX !== timelinePositionX) {
        this.setState({
          random: Math.random()
        });
        this.timelinePositionX = timelinePositionX;
      }
      var url = v.url;
      if (url) {
        if (timelineData.data[k + 1]) {
          url = timelineData.data[k + 1].url;
        }
      }
      this.renderPlayer(v.url);
    };
  };

  toggleFullScreenEvent = e => {
    var fullScreen = util.isFullscreen();
    this.setState({
      timelinePositionX: 70
    });
    if (fullScreen) {
      util.exitFullscreen();
    } else {
      util.fullScreen(this.playerContainerDom);
    }
  };

  togglePlayEvent = e => {
    let { play } = this.state;
    if (play) {
      this.playerInstance.pause(true);
    } else {
      this.playerInstance.play(true);
    }
    this.setState({
      play: !!!play
    });
  };

  toggleMuteEvent = e => {
    var mute = this.playerInstance.getMute();
    this.setState({
      mute: !mute
    });
    this.playerInstance.setMute(!mute);
  };

  render() {
    let {
      url,
      timelineData,
      id,
      width,
      height,
      timeline,
      timeLineHeight = '.3em',
      controls,
      live,
      title,
      EmptyPlayer,
      ...other
    } = this.props;
    let { hovertime, timelinePositionX, play, mute, buffer,ready } = this.state;
    var TopTipContents;
    if (React.isValidElement(title)) {
      TopTipContents = title;
    } else {
      TopTipContents = <span>{title && title}</span>;
    }
    var fullScreen = util.isFullscreen();
    if (!EmptyPlayer) {
      EmptyPlayer = DefaultEmptyPlayer;
    }
    //处理高度
    if (this.playerContainerDom && !height && !fullScreen) {
      height = this.playerContainerDom.clientWidth * 9 / 16;
    }
    other.style = Object.assign({ width, height }, other.style);
    return (
      <div {...other}>
        <PlayerContainer
          height={!ready && '100%'}
          ref="playerContainer"
          onMouseOver={this.onPlayerOverEvent}
          onMouseOut={this.onPlayerOutEvent}
          onMouseMove={this.onPlayerMoveEvent}
        >
          {!!url && <div id={this.id || id}>加载播放器...</div>}
          {!controls &&
            buffer === 1 &&
            <Loading className="ly-icon">
              {'\uE601'}
            </Loading>}
          {!url &&
            <EmptyPlayer className="empty-player">
              <SpanLabel>无视频源</SpanLabel>
            </EmptyPlayer>}
          {title &&
            <TopTip
              style={this.state.timelineStyle}
              onMouseOver={this.onControllerOverEvent}
              onMouseOut={this.onControllerOutEvent}
            >
              {TopTipContents}
            </TopTip>}

          {timeline &&
            <PlayerControllerContainer
              className="player-controller-container ly-skin-seven"
              style={this.state.timelineStyle}
              onMouseOver={this.onControllerOverEvent}
              onMouseOut={this.onControllerOutEvent}
            >
              <LeftControl className="ly-group ly-controlbar-left-group ly-reset">
                <IconButton
                  className="ly-icon ly-icon-inline ly-button-color"
                  marginLeft="10px"
                  onClick={this.togglePlayEvent}
                >
                  {play && '\uE60D'}
                  {!play && '\uE60E'}
                </IconButton>
                {false &&
                  <span className="ly-text ly-reset ly-text-elapsed">
                    {hovertime}
                  </span>}
              </LeftControl>
              <RightControl className="ly-group ly-controlbar-right-group ly-reset">
                <IconButton
                  className="ly-icon ly-icon-inline ly-button-color jw-player-volume"
                  onClick={this.toggleMuteEvent}
                >
                  {mute && '\uE611'}
                  {!mute && '\uE612'}
                </IconButton>
                <IconButton
                  className="ly-icon ly-icon-inline ly-button-color jw-full-screen"
                  onClick={this.toggleFullScreenEvent}
                >
                  {'\uE608'}
                </IconButton>
              </RightControl>
              {!live &&
                <PlayerTimeLineContainer
                  onMouseMove={this.onTimeLineMouseMove(
                    timelineData.beginTimeStamp,
                    timelineData.total
                  )}
                  className="player-time-line-container clearfix"
                  height={timeLineHeight}
                >
                  {hovertime &&
                    <span>
                      {this.timelinePositionX &&
                        <Line
                          className="player-time-line-active"
                          bgColor="green"
                          left={this.timelinePositionX}
                          height={timeLineHeight}
                        />}
                      {false &&
                        <Line
                          className="player-time-line-move"
                          left={timelinePositionX + 1}
                          height={timeLineHeight}
                        />}
                      <ToolTip left={timelinePositionX - 66}>
                        {hovertime}
                      </ToolTip>
                    </span>}
                  {timelineData &&
                    timelineData.data.map((v, k) => {
                      //console.debug(v.count,timelineData.total)
                      var timeBlockWidth = `${v.count /
                        timelineData.total *
                        100}%`;
                      return (
                        <TimeBlock
                          onClick={this.timeBlockClickEvent(v, k)}
                          key={k}
                          width={timeBlockWidth}
                          active={v.active}
                          className={classnames({
                            active: v.active
                          })}
                        />
                      );
                    })}
                </PlayerTimeLineContainer>}
            </PlayerControllerContainer>}
        </PlayerContainer>
      </div>
    );
  }
}
