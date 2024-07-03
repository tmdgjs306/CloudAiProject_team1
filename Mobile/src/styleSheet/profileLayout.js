// profileLayout.js

import { StyleSheet } from 'react-native';

const profileLayout = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  userEmail: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
    
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  editProfileButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  editProfileButtonText: {
    color: '#007AFF',
    fontSize: 16,
    
  },
  Separator:{
    borderBottomColor: 'skyblue',
    borderBottomWidth: 3,
  }
});

export default profileLayout;
