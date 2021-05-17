import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderPreLogin from '../../common/header';
import {Block, Text, ImageComponent, Button} from '../../components';
import {hp, wp} from '../../components/responsive';
import SwitchNative from '../../components/toggle';
import {light} from '../../components/theme/colors';
const OwnProducts = () => {
  const [activeCard, setActiveCard] = useState(false);
  const [activeNfc, setActiveNfc] = useState(false);
  const {goBack, navigate} = useNavigation();
  return (
    <Block linear>
      <SafeAreaView />

      <Block padding={[hp(2), wp(3), 0]} space="between" flex={false} row>
        <TouchableOpacity onPress={() => goBack()}>
          <LinearGradient colors={['#5542B6', '#7653DB']} style={styles.linear}>
            <ImageComponent
              resizeMode="contain"
              height={14}
              width={14}
              name={'BackIcon'}
            />
          </LinearGradient>
        </TouchableOpacity>

        <ImageComponent
          resizeMode="contain"
          height={140}
          width={140}
          name={'nameBg'}
        />
        <TouchableOpacity />
      </Block>
      <Block
        color={'#F2EDFA'}
        borderTopRightRadius={30}
        borderTopLeftRadius={30}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          bounces={false}>
          <HeaderPreLogin
            title="Create Account"
            subtitle="What Products Do You Have"
          />
          <Block center row flex={false}>
            <ImageComponent
              name={activeCard ? 'ActiveCard_icon' : 'inActiveCard_icon'}
              height={245}
              width={200}
            />
            <Block flex={false}>
              <ImageComponent
                name={activeCard ? 'verified_icon' : 'not_verified_icon'}
                height={40}
                width={40}
              />
              <Text purple={activeCard} color="#ABA9AD" semibold>
                Clique Card
              </Text>
              <Block flex={false} margin={[hp(1), 0]}>
                <SwitchNative
                  // disabledStyle
                  activeColor="red"
                  value={activeCard}
                  onPress={(newState) => setActiveCard(!activeCard)}
                  trackBarStyle={trackBar}
                  trackBar={track}
                  thumbButton={thumbButton}
                />
              </Block>
            </Block>
          </Block>
          <Block row center flex={false}>
            <ImageComponent
              name={activeNfc ? 'ActiveNfc_icon' : 'inActiveNfc_icon'}
              height={190}
              width={190}
            />
            <Block flex={false}>
              <ImageComponent
                name={activeNfc ? 'verified_icon' : 'not_verified_icon'}
                height={40}
                width={40}
              />
              <Text purple={activeNfc} color="#ABA9AD" semibold>
                NFC Tag
              </Text>

              <Block flex={false} margin={[hp(1), 0]}>
                <SwitchNative
                  // disabledStyle
                  activeColor="red"
                  value={activeNfc}
                  onPress={(newState) => setActiveNfc(!activeNfc)}
                  trackBarStyle={trackBar}
                  trackBar={track}
                  thumbButton={thumbButton}
                />
              </Block>
            </Block>
          </Block>
        </ScrollView>
        <Block flex={false} margin={[0, wp(3), hp(3)]}>
          <Button onPress={() => navigate('ScanCard')} linear color="primary">
            Next
          </Button>
        </Block>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  linear: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
const thumbButton = {
  width: 29,
  height: 28,
  radius: 30,
  activeBackgroundColor: '#fff',
  inActiveBackgroundColor: '#fff',
  marginLeft: 10,
};
const trackBar = {
  borderColor: '#fff',
  width: 62,
  height: 35,
  inActiveBackgroundColor: light.purple,
  activeBackgroundColor: '#E9E6ED',
};
const track = {
  borderWidth: 2,
  activeBackgroundColor: light.purple,
  inActiveBackgroundColor: '#E9E6ED',
  width: 60,
};
export default OwnProducts;
