import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import {
    View,
    Button,
    Text,
} from 'react-native';
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

const mapTestData = [
    {
        latitude: 34.7724303,
        longitude: 127.6985649
    },
    {
        latitude: 34.7736233,
        longitude: 127.7015145
    },
    {
        latitude: 34.7734318,
        longitude: 127.7019923
    },
    {
        latitude: 34.7708991,
        longitude: 127.7038201
    },
    {
        latitude: 34.771274,
        longitude: 127.7021169
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

interface ILocation {
    latitude: number;
    longitude: number;
}

const TrackUserLocation = () => {
    const [location, setLocation] = useState<ILocation | undefined>(undefined);

    useEffect(() => {
        Geolocation.getCurrentPosition
            (
                position => {
                    const { latitude, longitude } = position.coords;
                    setLocation({
                        latitude,
                        longitude,
                    });
                },
                error => {
                    console.log(error);
                },
                {
                    enableHighAccuracy: false,
                    timeout: 15000,
                    maximumAge: 10000
                },
            );
    }, []);

    return (
        <Container>
            { location && (
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        // location.latitude
                        latitude: 34.7724303,
                        // location.longitude
                        longitude: 127.6985649,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}>
                    {
                        mapTestData.map((data, i) =>
                            (
                                <Marker
                                    key={i}
                                    coordinate={{
                                        latitude: data.latitude,
                                        longitude: data.longitude,
                                    }}
                                />
                            )
                        )
                    }
                </MapView>
            )}
        </Container>
    );
};

export class NotificationsScreen extends React.Component {
    render() {
        SplashScreen.hide();
        return (
            // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            //     <Button onPress={() => navigation.goBack()} title="Go back home" />
            // </View>
            <Container>
                <TrackUserLocation />
            </Container>
        );
    }
}
