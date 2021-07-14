import React from 'react';
import {Block, ImageComponent, Text} from '../../../components';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import NeuView from '../../../common/neu-element/lib/NeuView';
import {useNavigation} from '@react-navigation/core';
import {hp, wp} from '../../../components/responsive';
import {t1, t2} from '../../../components/theme/fontsize';

const ProfileAnalytics = () => {
  const {goBack, navigate} = useNavigation();

  return (
    <Block linear>
      <SafeAreaView />
      <Block center padding={[hp(4), wp(3)]} flex={false}>
        <ImageComponent
          resizeMode="contain"
          height={64}
          width={169}
          name={'clique_pro_icon'}
        />
      </Block>
      <Block
        color={'#F2EDFA'}
        borderTopRightRadius={30}
        borderTopLeftRadius={30}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          bounces={false}>
          <Block
            padding={[hp(3), wp(3), hp(10)]}
            margin={[hp(2), wp(3), 0]}
            shadow
            borderRadius={15}
            primary
            flex={false}>
            <Block flex={false} row space="between">
              <Text purple semibold size={18}>
                Pro Analytics
              </Text>
              <Text purple regular size={14}>
                + 300 Clicks
              </Text>
            </Block>
            <Block margin={[t1, 0, 0]} style={{width: wp(60)}} flex={false}>
              <Text regular size={14} grey>
                Unlock the most advanced digital business card in the world
              </Text>
            </Block>
          </Block>
        </ScrollView>
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
export default ProfileAnalytics;
