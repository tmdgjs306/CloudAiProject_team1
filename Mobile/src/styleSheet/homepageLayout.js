import {StyleSheet} from 'react-native';

export const homePageLayout = StyleSheet.create({
    TotalContainer:{
        backgroundColor : 'white',
    },
    StatusBar:{
        backgroundColor : 'white',
        barStyle : "dark-content",
    },
    HeaderContainer:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    HeaderText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'NanumSquareB'
    },
    HeaderIconContainer:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    }
     
});