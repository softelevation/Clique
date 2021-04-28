import React, {Component, PureComponent} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Animated,
  Image,
  LogBox,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

//Constant Files
import {CommonColors} from '../Constants/ColorConstant';
import {IMG} from '../Constants/ImageConstant';
import {SetFontSize} from '../Constants/FontSize';
import {ConstantKeys} from '../Constants/ConstantKey';

//Third Party
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {Neomorph, Shadow, NeomorphFlex} from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';

import AppIntroSlider from 'react-native-app-intro-slider';
import FastImage from 'react-native-fast-image';

const slides = [
  {
    key: 1,
    title: 'Welcome to Clique',
    text: 'The first thing you will need\nis your Clique card.',
    image: IMG.InitialFlow.CardLeft,
  },
  {
    key: 2,
    title: 'Take Your Card',
    text: 'Scan your card with your\nphone to activate it',
    image: IMG.InitialFlow.CardRight,
  },
  {
    key: 3,
    title: 'Put it Behind Your Phone',
    text: 'Scan your card with your\nphone to activate it',
    image: IMG.InitialFlow.CardCenter,
  },
  {
    key: 4,
    title: 'Create Your Profile',
    text: 'Fill up all your information add\nsync your social media profile',
    image: IMG.InitialFlow.CardRight,
  },
  {
    key: 5,
    title: 'Connect With Your Friends',
    text: 'Youre ready to connect with your\nfriends and meet new people',
    image: IMG.InitialFlow.CardLeft,
  },
];

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    LogBox.ignoreAllLogs = true;
  }

  // Helper Functions
  goToLogin() {
    const props = this.props;
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
            state: {
              routes: [{name: 'Login'}],
            },
          },
        ],
      }),
    );
  }

  goToRegister() {
    const props = this.props;
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
            state: {
              routes: [{name: 'RegisterName', params: {isFromTutorial: true}}],
            },
          },
        ],
      }),
    );
  }

  async storeIsSkipValue(isLogin) {
    try {
      await AsyncStorage.setItem(ConstantKeys.IS_SKIP_TUTORIAL, 'true');

      if (isLogin) {
        this.goToLogin();
      } else {
        this.goToRegister();
      }
    } catch (e) {
      // saving error
    }
  }

  //Action Methods
  btnStartNowTap = async () => {
    requestAnimationFrame(() => {
      this.storeIsSkipValue();
    });
  };

  _renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={IMG.InitialFlow.Clique}
            style={{
              resizeMode: 'contain',
              marginTop: 40,
              width: 130,
              height: 65,
            }}
          />
        </View>

        <View
          style={{
            height: '40%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Image
            source={item.image}
            style={{flex: 1, resizeMode: 'contain', width: '100%'}}
          />
        </View>

        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.txtIntoTitle}>{item.title}</Text>

          <Text style={styles.txtIntroDesc}>{item.text}</Text>
        </View>
      </View>
    );
  };

  render() {
    let Background = IMG.OtherFlow.Background;
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: CommonColors.primaryColor}}>
        <View style={{flex: 1, backgroundColor: CommonColors.primaryColor}}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={CommonColors.primaryColor}
          />

          <FastImage
            source={Background}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
          />

          <View style={{position: 'absolute', width: '100%', height: '100%'}}>
            <AppIntroSlider
              renderItem={this._renderItem}
              data={slides}
              showNextButton={false}
              showDoneButton={false}
              activeDotStyle={{backgroundColor: CommonColors.PurpleColor}}
              dotStyle={{backgroundColor: CommonColors.GhostColor}}
            />

            <LinearGradient
              colors={[CommonColors.gradientStart, CommonColors.gradientEnd]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.btnSignUp}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this.storeIsSkipValue(false)}>
                <Text style={styles.txtSignUp}>Sign Up</Text>
              </TouchableOpacity>
            </LinearGradient>

            <Text style={styles.txtAlreadyAccount}>
              Already have an account?{' '}
              <Text
                style={styles.txtLogin}
                onPress={() => this.storeIsSkipValue(true)}>
                Log In
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    // backgroundColor: CommonColors.primaryColor,
  },
  image: {
    flex: 1,
  },
  btnSignUp: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    backgroundColor: CommonColors.PurpleColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSignUp: {
    color: CommonColors.whiteColor,
    fontSize: SetFontSize.ts16,
    fontFamily: ConstantKeys.Averta_REGULAR,
  },
  txtAlreadyAccount: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    textAlign: 'center',
    flexDirection: 'row',
    marginBottom: 25,
    fontFamily: ConstantKeys.Averta_REGULAR,
    fontSize: SetFontSize.ts14,
    color: CommonColors.whiteColor,
  },
  txtLogin: {
    fontFamily: ConstantKeys.Averta_BOLD,
    fontSize: SetFontSize.ts14,
    color: CommonColors.whiteColor,
    textDecorationLine: 'underline',
  },
  viewClique: {
    backgroundColor: '#F2F0F7',
    width: 135,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: {width: 5, height: 5},
    borderRadius: 20,
  },
  txtIntoTitle: {
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    fontSize: SetFontSize.ts30,
    fontFamily: ConstantKeys.Averta_BOLD,
    color: CommonColors.whiteColor,
  },
  txtIntroDesc: {
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    fontSize: SetFontSize.ts14,
    marginTop: 10,
    fontFamily: ConstantKeys.Averta_REGULAR,
    color: CommonColors.whiteColor,
  },
});
