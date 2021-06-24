import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Block, ImageComponent, Text} from '../../../components';
import {hp, wp} from '../../../components/responsive';
import {StyleSheet} from 'react-native';
import {APIURL} from '../../../Constants/APIURL';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import Webservice from '../../../Constants/API';
import ValidationMsg from '../../../Constants/ValidationMsg';
import {useRoute} from '@react-navigation/native';
import LoadingView from '../../../Constants/LoadingView';
import {showAlert} from '../../../utils/mobile-utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanTag = () => {
  const {goBack, navigate} = useNavigation();
  const {params} = useRoute();
  const [isloading, setIsloading] = useState(false);
  console.log(params, 'params');
  useEffect(() => {
    NfcManager.start();
    CardScan();
    return () => {
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    };
  }, []);
  const CardScan = async () => {
    try {
      // let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to Write NFC Tag',
      });
      console.log('Response : ' + resp);

      // the NFC uid can be found in tag.id
      let tag = await NfcManager.getTag();
      console.log('Tag : ' + JSON.stringify(tag));

      console.log('Tag ID: ' + JSON.stringify(tag.id));
      console.log('Tag type: ' + JSON.stringify(tag.type));

      // await this.setState({card_id: tag.id});

      // let bytes = buildUrlPayload('https://dev.thewebtual.com/clique/user/profile/'+this.state.user.user_id);
      // await NfcManager.writeNdefMessage(bytes);
      // console.log('successfully write ndef');
      // await NfcManager.setAlertMessageIOS('I got your tag!');
      _cancel();

      API_WRITE_CARD(tag.id);
      console.log(tag.id, 'tagId');

      // this._cancel();
    } catch (ex) {
      _cancel();
      console.warn('ex in Scan to card', ex);

      NfcManager.start();
      // alert(ex)
    }
  };

  const _cancel = () => {
    // this.setState({text: '', url: URL});
    NfcManager.cancelTechnologyRequest().catch(() => 0);
    NfcManager.unregisterTagEvent().catch(() => 0);
  };

  // API Get Country
  const API_WRITE_CARD = async (card_id) => {
    // this.setState({isloading: isload});
    setIsloading(true);
    Webservice.post(APIURL.validateCard, {
      card_id: card_id,
    })
      .then((response) => {
        if (response.data == null) {
          setIsloading(false);
          // alert('error');
          showAlert(response.originalError.message);
          return;
        }
        //   console.log(response);
        setIsloading(false);
        console.log('Get Write Card Response : ', response);

        if (response.data.status === true) {
          writeCard();
          showAlert(response.data.message);
          navigate('ActivatedCard', {
            header: 'Congratulations',
            subtitle: 'Your tag has been linked to your account',
          });
        } else {
          _cancel();
          setIsloading(false);
          Alert.alert('Fail', response.data.message, [
            {
              text: 'OK',
              onPress: () => {
                _cancel();
                // this.props.navigation.goBack();
              },
            },
          ]);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setIsloading(false);
      });
  };
  function buildUrlPayload(valueToWrite) {
    return Ndef.encodeMessage([Ndef.uriRecord(valueToWrite)]);
  }
  const writeCard = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    try {
      // let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
      //   alertMessage: 'Ready to write some NFC tags!'
      // });
      // console.log("REspo : "+resp);
      // let ndef = await NfcManager.getNdefMessage();
      // console.log("NDFE : "+JSON.stringify(ndef));

      let bytes = buildUrlPayload(
        'http://admin.cliquesocial.co/user/profile' + user_id,
      );
      await NfcManager.writeNdefMessage(bytes);
      console.log('successfully write ndef');

      if (Platform.OS === 'ios') {
        // await NfcManager.setAlertMessageIOS('Card Sync Successfully');

        Alert.alert(ValidationMsg.AppName, 'Card Sync Successfully', [
          {
            text: 'OK',
            onPress: () => {
              this._cancel();
              // this.props.navigation.goBack();
            },
          },
        ]);

        // this._cancel();
        // this.props.navigation.goBack()
      } else {
        Alert.alert(ValidationMsg.AppName, 'Card Sync Successfully', [
          {
            text: 'OK',
            onPress: () => {
              this._cancel();
              // this.props.navigation.goBack();
            },
          },
        ]);
      }
    } catch (ex) {
      console.log('ex', ex);
      _cancel();
    }
  };

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
            Put The Tag{' '}
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
      {isloading ? <LoadingView /> : null}
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
export default ScanTag;
