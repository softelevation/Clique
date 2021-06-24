import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Block, ImageComponent, Text} from '../../../components';
import {hp, wp} from '../../../components/responsive';
import {StyleSheet} from 'react-native';
const ScanCard = () => {
  const {goBack, navigate} = useNavigation();
  return (
    <Block color="#F2EDFA">
      <SafeAreaView />
      <ScrollView bounces={false} contentContainerStyle={styles.container}>
        <Block
          alignSelf="flex-end"
          padding={[hp(2), wp(3), 0]}
          space="between"
          flex={false}
          row>
          <TouchableOpacity onPress={() => goBack()}>
            <LinearGradient
              colors={['#DCC8FA', '#FAF8F8']}
              style={styles.linear}>
              <ImageComponent
                resizeMode="contain"
                height={14}
                width={14}
                name={'close_icon'}
              />
            </LinearGradient>
          </TouchableOpacity>
        </Block>
        <Block flex={false} margin={[hp(4), 0, 0]}>
          <ImageComponent
            resizeMode="contain"
            height={430}
            width={370}
            name={'scanner_icon'}
          />
        </Block>
        <Block flex={false} center margin={[hp(6), 0, 0]}>
          <Text purple semibold size={28} height={40}>
            Put The Card/Tag{' '}
          </Text>
          <Text purple semibold size={28} height={40}>
            Behind Your Phone{' '}
          </Text>
          <Text
            onPress={() =>
              navigate('ActivatedCard', {
                header: 'jhghj',
                subtitle: 'khjbgkh',
              })
            }
            color="#707070"
            regular
            size={12}
            height={26}>
            To update your card
          </Text>
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
export default ScanCard;
