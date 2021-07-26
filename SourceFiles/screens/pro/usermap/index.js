import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Block, ImageComponent} from '../../../components';
import {hp, wp} from '../../../components/responsive';
import {useNavigation} from '@react-navigation/core';
import NeuView from '../../../common/neu-element/lib/NeuView';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/native';
import {users} from '../../../utils/constants';
import {strictValidArrayWithLength} from '../../../utils/commonUtils';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const UserMap = () => {
  const {goBack} = useNavigation();
  const [location, setlocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.033737423651551524,
    longitudeDelta: 0.027754828333854675,
  });
  const mapRef = useRef();

  useFocusEffect(
    React.useCallback(() => {
      requestLocationPermission();
    }, []),
  );

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
          console.log('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getOneTimeLocation = async () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setlocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.033737423651551524,
          longitudeDelta: 0.027754828333854675,
        });
        setTimeout(() => {
          onCenter(position.coords.latitude, position.coords.longitude);
        }, 500);
        console.log('Longitude : ' + position.coords.longitude);
        console.log('Latitude : ' + position.coords.latitude);
      },
      (error) => {
        console.log(error.message);
        getOneTimeLocation();
      },
      {
        enableHighAccuracy: true,
        timeout: 100000,
        maximumAge: 3600000,
      },
    );
  };
  const onCenter = (a, b) => {
    console.log('call');
    mapRef.current.animateToRegion({
      latitude: a,
      longitude: b,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={location}
        // showsUserLocation
        // onRegionChangeComplete={async (coords) => {
        //   // console.log(coords);
        //   mapRef.current?.animateCamera(coords);
        // }}
      >
        <Marker coordinate={location}>
          <ImageComponent name={'current_user_icon'} height={50} width={50} />
        </Marker>
        {strictValidArrayWithLength(users) &&
          users.map((item, index) => {
            const marker = {
              latitude: JSON.parse(item.latitude),
              longitude: JSON.parse(item.longitude),
            };
            return (
              <Marker coordinate={marker}>
                <ImageComponent name={'demouser'} height={50} width={50} />
              </Marker>
            );
          })}
      </MapView>
      <Block
        style={{position: 'absolute', top: hp(3), right: 0}}
        center
        padding={[hp(2), wp(3)]}
        right
        flex={false}>
        <TouchableOpacity onPress={() => goBack()}>
          <NeuView
            concave
            color="#BC60CB"
            width={40}
            height={40}
            borderRadius={20}
            customGradient={['#AF2DA5', '#BC60CB']}>
            <ImageComponent
              resizeMode="contain"
              height={14}
              width={14}
              name={'close_icon'}
              color={'#fff'}
            />
          </NeuView>
        </TouchableOpacity>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default UserMap;
