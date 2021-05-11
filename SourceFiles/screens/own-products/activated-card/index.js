import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Block, Button, ImageComponent, Text} from '../../../components';
import {hp, wp} from '../../../components/responsive';

const ActivatedCard = () => {
  const {goBack, navigate} = useNavigation();
  return (
    <Block linear>
      <SafeAreaView />
      <ScrollView bounces={false} contentContainerStyle={styles.container}>
        <Block padding={[hp(2), wp(3), 0]} space="between" flex={false}>
          <TouchableOpacity onPress={() => goBack()}>
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
        </Block>
        <Block center flex={false} margin={[hp(4), 0, 0]}>
          <ImageComponent
            resizeMode="contain"
            height={380}
            width={380}
            name={'activatdCard_icon'}
          />
        </Block>
        <Block flex={false} center margin={[hp(6), 0, 0]}>
          <Text white regular size={28} height={40}>
            Your Card/Tag Has{' '}
          </Text>
          <Text white regular size={28} height={40}>
            Been Activated!
          </Text>
          <Block flex={false} margin={[hp(1), 0]}>
            <ImageComponent name={'verified_icon'} height={40} width={40} />
          </Block>
        </Block>
        <Block flex={false} padding={[0, wp(3)]}>
          <Button onPress={() => navigate('Dashboard')} color="primary">
            Back to Home
          </Button>
        </Block>
      </ScrollView>
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
export default ActivatedCard;
