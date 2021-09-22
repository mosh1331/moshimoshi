import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthCheck = ({navigation}) => {
  useEffect(async () => {
    const user = await AsyncStorage.getItem('@user');
    if (user != null) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Feed'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }, []);
  return true;
};

export default AuthCheck;
