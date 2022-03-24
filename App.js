/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import apolloClient from './apollo';
import {ApolloProvider} from 'react-apollo';
import ListUser from './ListUser';
import Login from './src/login';
import CreateUser from './src/createUser';


class App extends Component {
  state = {
    client: apolloClient(),
  };

  render() {
    return (
      <ApolloProvider client={this.state.client}>
        <Router>
          <Scene key="root">
          <Scene
              key="Login"
              component={Login}
              title="Login"
              initial={true}
            />
            <Scene
              key="ListUser"
              component={ListUser}
              title="List User"
            />

            <Scene
              key="CreateUser"
              component={CreateUser}
              title="Create User"
            />
          </Scene>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
