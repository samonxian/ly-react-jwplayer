import r2 from 'react-mobx-boilerplate-js/libs/index';
import routes from './.routes';

var stores = {};
var defaultLocale;

var render = r2(routes, stores, defaultLocale);
render();

if (module.hot) {
  module.hot.accept('./.routes', () => render());
}
