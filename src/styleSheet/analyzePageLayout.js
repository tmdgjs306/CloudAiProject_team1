import {StyleSheet} from 'react-native';

export const analyzePageLayout = StyleSheet.create({
    totalContainer:{
        flex:1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    topContainer:{
        flex:1,
    },
    pageTitleContainer:{
        height: "80%",
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor:"#212121",
    },
    pageTitleText:{
        fontSize: 20,
        textAlign: 'center',
        fontWeight: "bold",
        color: 'white',
        borderRadius: 10,
    },
    middleContainer:{
        flex:9,
        marginRight: '3%',
        marginLeft: '3%',
        borderRadius: 100,
    },
    mainImage:{
        height: "100%",
        width: "100%",
        alignContent: 'center',
        zIndex: -1,
    },
    bottomContainer:{
        flex: 0.3,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
    },
    bottomSheetBtn:{
        borderRadius: 100,
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        width: 300,
        justifyContent: 'center',
        backgroundColor : '#50BCDF',
    },
    bottomSheetBtnTitle:{
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    }

});