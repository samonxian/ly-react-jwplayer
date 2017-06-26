//windwo.__socket__在src/index.jsx，进行了连接
function emit(eventName, params, callback) {
  var socket = window.__socket__;
  if (!socket) {
    console.error("socket未连接！");
    return;
  }
  try {
    socket.emit(eventName, params, data => {
      callback && callback(data);
    });
  } catch (e) {
    console.error(e);
  }
}
function on(eventName, callback) {
  var socket = window.__socket__;
  if (!socket) {
    console.error("socket未连接！");
    return;
  }
  try {
    socket.on(eventName, data => {
      callback && callback(data);
    });
  } catch (e) {
    console.error(e);
  }
}

function socketDecorator(component) {
  component.prototype.emit = emit;
  component.prototype.on = on;
  return component;
}
export default socketDecorator;
