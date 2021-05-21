import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import NeuView from './NeuView';
import PropTypes from 'prop-types';

const NeuInput = (props) => {
  const {
    style = {},
    textStyle,
    placeholder = '',
    onChangeText = () => {},
    value = '',
    prefix: Prefix,
    placeholderTextColor,
    secureTextEntry,
    leftPrefix,
    ...rest
  } = props;

  const styles = StyleSheet.create({
    input: {
      borderBottomWidth: 0,
      flex: 1,
    },
  });

  return (
    <NeuView {...rest} style={{...style, alignItems: 'stretch'}}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 12,
        }}>
        {leftPrefix && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 6,
            }}>
            {leftPrefix}
          </View>
        )}
        <TextInput
          style={{
            ...styles.input,
            ...textStyle,
          }}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry}
        />
        {Prefix && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 6,
            }}>
            {Prefix}
          </View>
        )}
      </View>
    </NeuView>
  );
};

NeuInput.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  ...NeuView.propTypes,
};
export default NeuInput;
