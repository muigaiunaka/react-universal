import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('reactuniversalmobile', () => App);

// TODO: MAKE WORK --
// import React, { Component } from 'react';
// import { AppRegistry } from 'react-native';
// import App from './App';

// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import reduxThunk from 'redux-thunk';

// import reducers from './redux/reducers';
// import { AUTH_USER } from './redux/actions/types';

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// // contains the redux state
// const store = createStoreWithMiddleware(reducers);

// export default class ReactUniversalMobile extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <App />
//       </Provider>
//     );
//   }
// }

// AppRegistry.registerComponent('ReactUniversalMobile', () => ReactUniversalMobile);
