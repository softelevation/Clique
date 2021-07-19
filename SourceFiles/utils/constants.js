import {Block, Text} from '../components';
import {hp, wp} from '../components/responsive';
import React from 'react';
export const neomorph = {
  borderRadius: 20,
  shadowRadius: 100,
  backgroundColor: '#fff',
};
//  <Neomorph
//    style={{
//      ...styles.neomorphStyle,
//      borderRadius: -20,
//      shadowRadius: 8,
//      backgroundColor: 'rgb(235,235,235)',
//    }}>
//    <Neomorph
//      inner
//      style={{
//        borderRadius: -20,
//        shadowRadius: 8,
//        backgroundColor: 'rgb(235,235,235)',
//        width: 100,
//        height: 100,
//      }}
//    />
//  </Neomorph>;
export const renderValidationText = (values) => {
  return (
    <Block flex={false} margin={[hp(2), wp(2), 0]}>
      <Text margin={[hp(0.5), 0]} grey size={14}>
        {'- Min 8 characters.'}
      </Text>
      <Text margin={[hp(0.5), 0]} grey size={14}>
        {'- Minimum 1 letter'}
      </Text>
      <Text margin={[hp(0.5), 0]} size={14} grey>
        {'- Minimum 1 number'}
      </Text>
      <Text margin={[hp(0.5), 0]} size={14} grey>
        {'- Avoid using the same password for different accounts.'}
      </Text>
    </Block>
  );
};
