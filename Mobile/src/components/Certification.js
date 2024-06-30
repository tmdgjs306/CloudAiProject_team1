import { View, Text,StyleSheet, Button} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const Certification = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <>
        <Text style={styles.nameText}>로그인이 필요합니다.</Text>
        <Button 
            title="로그인" 
            onPress={() => navigation.navigate('Login')} /> 
        </>
    </View>
  )
}


export default Certification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  nameText:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    marginBottom: 30
  },
});