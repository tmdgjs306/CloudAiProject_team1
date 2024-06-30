import React, { useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { homePageLayout } from '../styleSheet/homepageLayout';
import Stories from '../components/Stories';
import Posts from '../components/followPostsServer';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false);

  // 화면이 포커스될 때마다 데이터를 갱신하도록 설정
  React.useEffect(() => {
    if (isFocused) {
      setRefresh(prev => !prev);
    }
  }, [isFocused]);

  const renderHeader = () => (
    <View style={homePageLayout.HeaderContainer}>
      <View>
        <Text style={homePageLayout.HeaderText}>
          DogFeed
        </Text>
      </View>
      <View style={homePageLayout.HeaderIconContainer}>
        <Feather name="navigation" style={{ fontSize: 24, color: 'black' }} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={homePageLayout.TotalContainer}>
      <StatusBar style={homePageLayout.StatusBar} />
      <FlatList
        data={[{ key: 'stories' }, { key: 'posts' }]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          item.key === 'stories' ?
            <Stories key={refresh.toString()} />  
            :
            <Posts key={refresh.toString()} />    
        )}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

export default Home;
