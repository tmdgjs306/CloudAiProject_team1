import { StyleSheet } from 'react-native';

export const resultPageLayout = StyleSheet.create({
  loading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleContainer:{
    height: 70,
    backgroundColor: 'black',
    marginBottom: 150,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  photo: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
    padding: 16,
  },
  resultContainer: {
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    color: 'black'
  },
});
