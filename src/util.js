import React from 'react';
import { Spin } from 'antd';
export default {
  /**
   * 请参考antd spin
   * @param { init } count 多少<br />
   */
  spin(count = 20) {
    var a = [];
    for (var i = 0; i < count; i++) {
      a.push(1);
    }
    return (
      <Spin size="large">
        {a.map((v, k) => {
          return <br key={k} />;
        })}
      </Spin>
    );
  },
  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  },
  /**
   * 交换数组指定的的两个键值位置,repalceIndex > index 下移，相反上移
   * @param {Array} arr 需要处理的数组
   * @param {index1} index 目标索引位置
   * @param {index2} repalceIndex 替换索引位置
   * @return {Array} 返回处理的数组
   */
  swapArrayItem(arr, index, repalceIndex) {
    arr[repalceIndex] = arr.splice(index, 1, arr[repalceIndex])[0];
    return arr;
  },
  /**
  * 获取随机的唯一key值
  *@param { int } number 随机范围
  *@function { string } 返回字符串随机key值，基本唯一
  */
  getUniqueKey(number = 100000000000) {
    var uniqueKey = Math.floor(Math.random(number) * number) + '';
    return uniqueKey;
  },
  /**
   * fullScreen 全屏
   * @param  {Objct} element 选择器
   */
  fullScreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  },
  /**
   * fullScreen 退出全屏
   * @param  {Objct} element 选择器
   */
  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  },
  fullscreenEnabled:
    document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled,
  isFullscreen() {
    return !!(
      document.fullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      false
    );
  }
};
