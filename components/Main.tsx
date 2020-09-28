import React, { } from 'react';
import 'react-native-gesture-handler';
import {
    View,
    Button,
    Text,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation'
import MapView, { Marker } from 'react-native-maps'
import styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';

const Container = styled.View`
  flex: 1;
`;

const testData = [
    {
        title: "완벽한 타인",
        poster: "http://www.newsinstar.com/data/photos/20180937/art_15367158497873_e15bff.jpg"
    },
    {
        title: "보헤미안 랩소디",
        poster: "http://image.cine21.com/resize/cine21/poster/2018/0518/12_06_54__5afe434e1f297[H800-].PNG"
    },
    {
        title: "창궐",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9te4ZPkCjmfMbzua__AogoVkO8_pSQg_k9HLioQM6B2lPPnix7w"
    },
    {
        title: "암수살인",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKpaFaBzed4mShvSJPVD2vQf4W618DFT8OFa-KNAPTuJLTWi5x"
    },
    {
        title: "미쓰백",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53iAJpVivS5RAVVNB_MoEs_a6sTOcbv2tA2XhNgz6ovcj6Yeq"
    }
]

export class HomeScreen extends React.Component {

    state = {
        title: "",
        poster: "",
    }

    _test = () => {
        console.log("_test active");
        this.props.navigation.navigate("Notifications")
    }

    _data = () => {
        return testData.map((data, i) => {
            return (
                <View key={i}>
                    <Text>{data.title}</Text>
                    <Text>{data.poster}</Text>
                </View>
            )
        })
    }


    render() {

        SplashScreen.hide();

        const { navigation } = this.props;
        const { user, boy } = this.props.route.params ?? 'defaultdata'

        return (
            <View>
                {
                    this._data()
                }
                <Button
                    onPress={() => this._test()}
                    title={`${user} is... ${boy}`}
                />
            </View>
        );
    }
}

export class NotificationsScreen extends React.Component {
    state = {
        lat: 0,
        lon: 0
    }

    componentDidMount() {
        Geolocation.watchPosition(
            async (position) => {

                const { latitude, longitude } = position.coords

                this.setState({
                    lat: latitude,
                    lon: longitude
                })
            },
            (error) => {
                // See error code charts below.
                console.log(`${error.code, error.message} location error`);
            },
            {
                enableHighAccuracy: false,
                timeout: 20000,
                maximumAge: 0
            }
        );
    }

    render() {
        const { navigation } = this.props;
        console.log(`${this.state.lat} :: ${this.state.lon}`);
        SplashScreen.hide();

        return (
            // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            //     <Button onPress={() => navigation.goBack()} title="Go back home" />
            // </View>
            <Container>
                { <MapView
                    style={{ flex: 1, }}
                    initialRegion={
                        {
                            latitude: this.state.lat,
                            longitude: this.state.lon,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }
                    }
                >
                    {
                        <Marker
                            coordinate={
                                {
                                    latitude: this.state.lat,
                                    longitude: this.state.lon
                                }
                            }
                            title="this is a marker"
                            description="this is a marker example"
                        />
                    }

                </MapView>}
            </Container>
        );
    }
}

const Stack = createStackNavigator();

// export class MainScreen extends React.Component {
//     render() {
//         const { navigation } = this.props;
//         const { nickname } = this.props.route.params;

//         console.log(`${nickname} wowwwwwwwwwwwwwwwwwww`);
//         return (
//                 <Stack.Navigator>
//                     <Stack.Screen
//                         name="Home"
//                         component={HomeScreen}
//                         initialParams={{ user: `${nickname}`, }}
//                     />
//                     <Stack.Screen name="Notifications" component={NotificationsScreen} />
//                 </Stack.Navigator>
//         )
//     }
// }
