import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';

//Constants
import {CommonColors} from '../Constants/ColorConstant';
import {IMG} from '../Constants/ImageConstant';
import {ConstantKeys} from '../Constants/ConstantKey';
import {SetFontSize} from '../Constants/FontSize';
import LoadingView from '../Constants/LoadingView';
import Webservice from '../Constants/API';
import {APIURL} from '../Constants/APIURL';

//Third Party
import {DrawerActions} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import Geolocation from '@react-native-community/geolocation';
import ValidationMsg from '../Constants/ValidationMsg';
import {Text} from '../components';
import {hp} from '../components/responsive';

export default class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      userData: {},
      arrNearbyPeople: [],
      longitude: 0.0,
      latitude: 0.0,
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', async () => {
      await this.getData();
      await this.requestLocationPermission();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener();
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem(ConstantKeys.USERDATA);
      if (value !== null) {
        // value previously stored
        console.log('User Data: ' + value);
        var userData = JSON.parse(value);

        this.setState({userData: userData});
      } else {
        console.log('User Data: null ' + value);
      }
    } catch (e) {
      console.log('Error : ' + e);
    }
  };

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      this.getOneTimeLocation();
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
          this.getOneTimeLocation();
        } else {
          console.log('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  getOneTimeLocation = async () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        var latitude = String(position.coords.latitude);
        var longitude = String(position.coords.longitude);

        this.setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });

        console.log('Longitude : ' + position.coords.longitude);
        console.log('Latitude : ' + position.coords.latitude);

        // set Timeout for display animation jkp

        this.API_NEARBY_USERS(true);
      },
      (error) => {
        console.log(error.message);
        this.getOneTimeLocation();
      },
      {
        enableHighAccuracy: false,
        timeout: 100000,
        maximumAge: 3600000,
      },
    );
  };

  showAlert(text) {
    Snackbar.show({
      text: text,
      backgroundColor: CommonColors.errorColor,
      textColor: CommonColors.whiteColor,
      // fontFamily: ConstantKeys.Averta_BOLD,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  // API NEARBY USER CALL
  API_NEARBY_USERS = async (isload) => {
    this.setState({isloading: isload});
    const user_id = await AsyncStorage.getItem('user_id');

    Webservice.post(APIURL.nearbyUsers, {
      user_id: user_id,
      lat: this.state.latitude,
      long: this.state.longitude,
    })
      .then((response) => {
        if (response.data == null) {
          this.setState({isloading: false});
          // alert('error');
          alert(response.originalError.message);
          return;
        }
        //   console.log(response);

        // this.setState({ isloading: false });
        console.log('Get Newrby users Response : ' + JSON.stringify(response));

        if (response.data.status == true) {
          // Already User
          var nearByData = response.data.data;

          setTimeout(() => {
            this.setState({arrNearbyPeople: nearByData, isloading: false});
          }, 3500);
        } else {
          this.setState({isloading: false});
          this.showAlert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({isloading: false});
        Alert.alert(
          error.message,
          '',
          [
            {
              text: 'Try Again',
              onPress: () => {
                this.API_NEARBY_USERS(true);
              },
            },
          ],
          {cancelable: false},
        );
      });
  };

  // API Add Constact
  API_ADD_CONTACT = async (isload, contact_id) => {
    this.setState({isloading: isload});
    const user_id = await AsyncStorage.getItem('user_id');

    Webservice.post(APIURL.addContact, {
      user_id: user_id,
      contact_id: contact_id,
    })
      .then((response) => {
        if (response.data == null) {
          this.setState({isloading: false});
          // alert('error');
          alert(response.originalError.message);
          return;
        }
        //   console.log(response);
        this.setState({isloading: false});
        console.log('Get Add Contact Response : ' + JSON.stringify(response));

        if (response.data.status == true) {
          this.showAlert(response.data.message);
          this.API_NEARBY_USERS(false);
        } else {
          this.setState({isloading: false});
          this.showAlert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({isloading: false});
      });
  };

  //Action Methods
  btnAddContactTap = (user) => {
    requestAnimationFrame(() => {
      Alert.alert(
        ValidationMsg.AppName,
        'Are you sure you add this contact?',
        [
          {
            text: 'Yes',
            onPress: () => {
              this.API_ADD_CONTACT(false, user.user_id);
            },
          },
          {
            text: 'No',
            onPress: () => {},
          },
        ],
        {cancelable: true},
      );
    });
  };

  selectProfileTap = (item) => {
    requestAnimationFrame(() => {
      this.props.navigation.navigate('UserProfile', {profile_id: item.user_id});
    });
  };

  render() {
    return (
      <>
        <SafeAreaView
          style={{flex: 0, backgroundColor: CommonColors.appBarColor}}
        />

        <StatusBar
          barStyle={'light-content'}
          backgroundColor={CommonColors.appBarColor}
        />
        <SafeAreaView style={styles.container}>
          <View style={{flex: 1}}>
            <Text margin={[hp(5), 0]} center grey size={16}>
              Looking for people near by ...
            </Text>
            {this.state.isloading === false ? (
              this.state.arrNearbyPeople.length !== 0 ? (
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      marginTop: 10,
                      marginLeft: 20,
                      marginRight: 20,
                      textAlign: 'center',
                      fontSize: SetFontSize.ts14,
                      color: CommonColors.whiteColor,
                      fontFamily: ConstantKeys.Averta_REGULAR,
                    }}>
                    We've found {this.state.arrNearbyPeople.length} users that
                    you might know
                  </Text>

                  <FlatList
                    style={{marginTop: 10}}
                    data={this.state.arrNearbyPeople}
                    keyExtractor={(item) => item.itemId}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderBottomWidth: 0.3,
                          borderBottomColor: CommonColors.inActiveColor,
                        }}
                        onPress={() => this.selectProfileTap(item)}>
                        <FastImage
                          style={{
                            height: 60,
                            width: 60,
                            borderRadius: 30,
                            alignSelf: 'center',
                            marginLeft: 20,
                            marginTop: 15,
                            marginBottom: 15,
                          }}
                          source={{
                            uri: this.state.userData.asset_url + item.avatar,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />

                        <View
                          style={{
                            flex: 1,
                            marginLeft: 15,
                            marginTop: 15,
                            marginRight: 20,
                            justifyContent: 'center',
                            marginBottom: 15,
                          }}>
                          <Text
                            style={{
                              fontFamily: ConstantKeys.Averta_BOLD,
                              fontSize: SetFontSize.ts16,
                              color: CommonColors.whiteColor,
                            }}
                            numberOfLines={1}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />

                  {/* For Display Blur View in top of the View */}
                  {/* <BlurView
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0
                                    }}
                                    blurType='dark'
                                    blurAmount={4}
                                    reducedTransparencyFallbackColor="black"
                                /> */}
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                  }}>
                  <Text style={styles.txtNoData}>No data found</Text>
                </View>
              )
            ) : (
              <></>
            )}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EDFA',
  },
  headerView: {
    height: 74,
    width: '100%',
    backgroundColor: CommonColors.appBarColor,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: ConstantKeys.Averta_BOLD,
    fontSize: SetFontSize.ts16,
    color: CommonColors.whiteColor,
    flex: 1,
    textAlign: 'center',
  },
  txtNoData: {
    fontFamily: ConstantKeys.POPPINS_REGULAR,
    fontSize: SetFontSize.ts18,
    color: CommonColors.whiteColor,
  },
});
