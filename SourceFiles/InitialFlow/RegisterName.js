import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  BackHandler,
  View,
  Platform,
} from 'react-native';
import {CommonColors} from '../Constants/ColorConstant';
import LoadingView from '../Constants/LoadingView';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
import {Block, Button, ImageComponent, Input} from '../components';
import {hp, wp} from '../components/responsive';
import {IMG} from '../Constants/ImageConstant';
import ValidationMsg from '../Constants/ValidationMsg';
import HeaderPreLogin from '../common/header';
import NeuInput from '../common/neu-element/lib/NeuInput';
import NeoInputField from '../components/neo-input';
let currentCount = 0;
export default class RegisterName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      txtFullName: '',
      isDisable: true,
      NameBorderColor: CommonColors.GhostColor,
      isFromTutorial: props.route.params.isFromTutorial,
    };
  }

  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  // }

  // onBackPress = () => {
  //   if (Platform.OS === 'ios') {
  //     return;
  //   }
  //   const subscription = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       if (currentCount === 1) {
  //         BackHandler.exitApp();
  //         subscription.remove();
  //         return true;
  //       }
  //       this.backPressHandler();
  //       return true;
  //     },
  //   );
  // };
  // backPressHandler = () => {
  //   if (currentCount < 1) {
  //     currentCount += 1;
  //     this.showAlert('Press again to close!');
  //   }
  //   setTimeout(() => {
  //     currentCount = 0;
  //   }, 2000);
  // };

  showAlert(text) {
    Snackbar.show({
      text: text,
      backgroundColor: CommonColors.errorColor,
      textColor: CommonColors.whiteColor,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  //Action Methods
  btnBackTap = () => {
    requestAnimationFrame(() => {
      this.props.navigation.goBack();
    });
  };

  btnNextTap = () => {
    requestAnimationFrame(() => {
      if (this.state.txtFullName === '') {
        this.showAlert(ValidationMsg.EmptyFullName);
      } else {
        this.props.navigation.navigate('RegisterEmail', {
          name: this.state.txtFullName,
        });
      }
    });
  };

  //Helper Methods For TextInput
  onFocus() {
    this.setState({
      NameBorderColor: CommonColors.SlateBlueColor,
    });
  }

  onBlur() {
    this.setState({
      NameBorderColor: CommonColors.GhostColor,
    });
  }

  render() {
    let RedPlay = IMG.InitialFlow.RedPlay;
    let MinUserInstagram = IMG.OtherFlow.InstaIcon;

    return (
      <Block linear>
        <SafeAreaView />

        <Block padding={[hp(2), 0, 0]} space={'between'} row flex={false}>
          {this.state.isFromTutorial === false ? (
            <TouchableOpacity onPress={() => this.btnBackTap()}>
              <LinearGradient
                colors={['#5542B6', '#7653DB']}
                style={styles.linear}>
                <ImageComponent
                  resizeMode="contain"
                  height={14}
                  width={14}
                  name={'BackIcon'}
                />
              </LinearGradient>
            </TouchableOpacity>
          ) : null}

          <View style={{alignItems: 'center', flex: 1}}>
            <ImageComponent
              resizeMode="contain"
              height={140}
              width={140}
              name={'nameBg'}
            />
          </View>

          {this.state.isFromTutorial === false ? (
            <TouchableOpacity
              style={{height: 40, width: 40}}
              activeOpacity={1}
            />
          ) : null}
        </Block>
        <Block
          color={'#F2EDFA'}
          borderTopRightRadius={30}
          borderTopLeftRadius={30}
          padding={[0, wp(3)]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            bounces={false}>
            <HeaderPreLogin
              title={'Create Account'}
              subtitle={"What's your name?"}
            />

            <Block center flex={false} margin={[hp(1), 0, 0]}>
              <NeoInputField
                value={this.state.txtFullName}
                placeholder="Name"
                onChangeText={(txtFullName) => {
                  this.setState({txtFullName: txtFullName});
                }}
                fontColor="#707070"
              />
            </Block>
          </ScrollView>
          <Block flex={false} margin={[0, 0, hp(3), 0]}>
            <Button
              disabled={!this.state.txtFullName}
              onPress={() => this.btnNextTap()}
              linear
              color="primary">
              Next
            </Button>
          </Block>
        </Block>

        {this.state.isloading ? <LoadingView /> : null}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {flexGrow: 1},
  input: {
    backgroundColor: '#F2F0F7',
  },
  shadow: {
    width: wp(90),
    borderRadius: 6,
    shadowRadius: 20,
    backgroundColor: '#000',
  },

  neomorphStyle: {
    width: wp(90),
  },
  rightIcon: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
    height: hp(15),
    width: wp(18),
    resizeMode: 'contain',
  },
  leftIcon: {
    alignSelf: 'flex-end',
    marginRight: 20,
    height: hp(15),
    width: wp(20),
    resizeMode: 'contain',
  },
  linear: {
    marginLeft: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
