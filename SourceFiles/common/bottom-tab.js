import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
// import ResponsiveImage from 'react-native-responsive-image';
import PropTypes from 'prop-types';

import Text from '../components/Text';
import {hp, wp} from '../components/responsive';
import ResponsiveImage from 'react-native-responsive-image';
import {images} from '../Assets/Images/images';
import LinearGradient from 'react-native-linear-gradient';
import {CommonColors} from '../Constants/ColorConstant';
// import images from '../assets';

const styles = StyleSheet.create({
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAF6FF',
    paddingHorizontal: wp(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const tabImages = {
  Profile: 'contact_icon',
  Nearby: 'location_icon',
  Pro: '',
  Chat: 'message_icon',
  Setting: 'setting_icon',
};

const BottomTab = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.ButtonContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            style={
              tabImages[label] === ''
                ? {
                    marginTop: -hp(3),
                  }
                : {marginTop: 0, alignItems: 'center'}
            }
            accessibilityRole="button"
            testID={options.tabBarTestID}
            onLongPress={onLongPress}
            accessibilityStates={isFocused ? ['selected'] : []}
            onPress={onPress}>
            <>
              {label === 'Pro' && (
                <LinearGradient
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 60,
                    width: 60,
                    borderRadius: 60,
                  }}
                  colors={['#E866B6', '#6961FF']}>
                  <Text size={14} white semibold>
                    PRO
                  </Text>
                </LinearGradient>
              )}
              <ResponsiveImage
                source={
                  isFocused
                    ? images[`${tabImages[label]}f`]
                    : images[tabImages[label]]
                }
                initHeight="40"
                initWidth="40"
              />
            </>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

BottomTab.propTypes = {
  state: PropTypes.shape(PropTypes.object),
};
BottomTab.defaultProps = {
  state: 'Search here',
};

export default BottomTab;
