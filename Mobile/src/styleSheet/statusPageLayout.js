import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // 현재 화면의 너비와 높이를 가져옵니다.

const statusPageLayout = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: '5%',
    left: '2.5%',
    width: '95%',
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.1,
    height: width * 0.1,
  },
  profileImage: {
    borderRadius: width * 0.1 / 2,
    backgroundColor: 'orange',
    width: '92%',
    height: '92%',
    resizeMode: 'cover',
  },
  headerRightContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '92%',
    alignItems: 'center',
  },
  nameText: {
    color: 'white',
    fontSize: width * 0.05,
    paddingLeft: '3%',
  },
  closeIcon: {
    color: 'white',
    opacity: 0.6,
    fontSize: width * 0.07,
  },
  storyImage: {
    position: 'absolute',
    width: '100%',
    height: '80%',
  },
});

export default statusPageLayout;
