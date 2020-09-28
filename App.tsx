import React, { Component } from 'react';
import axios from 'axios';
import { Login } from './components/Login'
import { HomeScreen, NotificationsScreen } from './components/Main'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

class App extends Component {

  constructor(props : any) {
    super(props)
    // 회원 가입 로직 이후 App의 State를 수정하여 Home으로 보냄.
    this.handler = this.handler.bind(this)
  }

  handler(data: boolean) {
    this.setState({
      state: data
    })
  }

  state = {
    account: "",
    password: "",
    nickname: "",
    // 자동 로그인 state
    state: true
  }

  componentDidUpdate() {
    // state.setState 시 component가 update됨
    console.log("App componentDidUpdate");
}

  // 통신하여 인증여부에 따라서 Main 또는 Login 띄움.
  render() {
    return (
      <NavigationContainer>
        {
          this.state.state
            ? (
              <Stack.Navigator>
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
              </Stack.Navigator>
            )
            : (
              <Stack.Navigator>
                <Stack.Screen
                  name="login"
                  component={Login}
                  initialParams={{ handler: this.handler, }}
                />
              </Stack.Navigator>
            )
        }
      </NavigationContainer>
    )
  }
}

export default App;