import React, { } from 'react';
import {
    Alert,
    Text,
    Button,
    TextInput,
    StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
import App from '../App'
import { State } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

interface IContainerProps {
    background: string;
}

const Container = styled.View`
  margin: 15px;
  flex: 1;
  justify-content: center;
  background-color: #f5fcff;
  background-color: ${(props: IContainerProps) => props.background ? props.background : 'white'};
`;

function memberAlert(msg: string) {
    Alert.alert(
        "Dev Food Truck",
        `${msg}`,
        [
            {
                text: "OK",

            },
        ],
        {
            cancelable: true
        }
    );
}

export class Login extends React.Component {

    state = {
        account: "",
        password: "",
        nickname: "",
        testCase: "",
    }

    componentDidMount() {
        // 자동 로그인 등 체크 할 예정.
        axios.get('http://ihaly.cafe24.com/index.html', {

        })
            .then((response: any) => {
                this.setState({ nickname: "wow" })
                console.log(response.data)
                SplashScreen.hide();
            })
            .catch((error) => {
                memberAlert("인터넷 접속이 원활하지 않습니다.");
                console.log(error)
                SplashScreen.hide();

                // this.props.navigation.replace(
                //     'Home',
                //     {
                //         nickname: this.state.nickname
                //     }
                // )
            });

    }

    componentDidUpdate() {
        // state.setState 시 component가 update됨
        // console.log("componentDidUpdate");
    }

    _setAccount = (text: String) => {
        const preAccount = text;
        this.setState({ account: text });
    }

    _submit = (data: string) => {
        console.log(`${data} wooooow`);

        if (data.length == 0) {
            memberAlert("계정을 입력해주세요.")
            // this.setState({testCase : "testCase"})
        } else {
            var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

            if (!emailRule.test(data)) {
                memberAlert("이메일 양식으로 입력해주세요.")
            } else {
                // this.props.navigation.navigate(
                //     'wow',
                //     {
                //         nickname: this.state.nickname
                //     }
                // )

                // 상단 class 제어를 위한 handler를 parameter로 받음.
                const { handler } = this.props.route.params ?? null
                if (handler != null) {
                    // 통신을 통한 인증

                    axios.get('http://ihaly.cafe24.com/index.html', {

                    })
                        .then((response: any) => {
                            // this.setState({ nickname: "wow" })
                            console.log(response.data)
                            // response data에 맞춘 로그인 분기
                            handler(true); // 성공
                        })
                        .catch((error) => {
                            memberAlert("인터넷 접속이 원활하지 않습니다.");
                            console.log(error)
                            handler(true); // 성공
            
                            // this.props.navigation.replace(
                            //     'Home',
                            //     {
                            //         nickname: this.state.nickname
                            //     }
                            // )
                        });

                    
                } else {

                }

            }
        }
    }

    render() {
        return (
            <Container background="">
                <Text style={styles.text}>계정</Text>
                <TextInput
                    style={styles.input}
                    placeholder="계정"
                    textContentType="emailAddress"
                    onChangeText={text => this._setAccount(text)}
                />

                <Text style={styles.text}>비밀번호</Text>
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    secureTextEntry={true}
                />

                {/* <Text style={styles.text}> `${this.state.nickname} wow`</Text>
                <TextInput
                    style={styles.input}
                    placeholder="닉네임"
                    onChangeText={text => this.setState({ nickname: text })}
                /> */}

                <Button
                    onPress={() => this._submit(this.state.account)}
                    title="로그인"
                />
            </Container>
        );
    }
} // Login class end

const styles = StyleSheet.create({
    input: {
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        height: 40,
        borderColor: "#7a42f4",
        borderWidth: 1,
        alignContent: "center"
    },
    text: {
        marginLeft: 15,
        marginRight: 15,
        alignContent: "center"
    }
})