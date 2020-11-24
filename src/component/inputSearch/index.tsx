import React from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import styles from './styles';

interface props {
  textInput: TextInputProps;
}

const InputSearch: React.FC<props> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Search...'}
        style={styles.input}
        {...props.textInput}
      />
    </View>
  );
};

export default InputSearch;
