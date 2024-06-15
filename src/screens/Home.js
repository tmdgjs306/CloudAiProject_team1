import { View, Text, StatusBar, ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {homePageLayout} from '../styleSheet/homepageLayout';
import Stories from '../components/Stories';
import Posts from '../components/Posts';
const Home = () => {
  return (
    <SafeAreaView style={homePageLayout.TotalContainer}
    >
     <StatusBar style={homePageLayout.StatusBar}
     />
     <ScrollView>
      <View style={homePageLayout.HeaderContainer}>
        <View>
          <Text style={homePageLayout.HeaderText}>
            DogFeed
          </Text>
        </View>
        <View
          style={homePageLayout.HeaderIconContainer}>
          <FontAwesome name = "plus-square-o" style={{fontSize:24, paddingHorizontal: 15}}/>
          <Feather name = "navigation" style={{fontSize:24}}/>
        </View>     
      </View>
        <Stories/>
        <Posts/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;