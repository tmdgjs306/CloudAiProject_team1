import {StyleSheet} from 'react-native';

export const analyzePageLayout = StyleSheet.create({
    totalContainer:{
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#E8F5FF',
    },
    topContainer:{
        flex:1,
    },
    pageTitleContainer:{
        height: "80%",
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor:"#28AEFF",
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
        flex:1,
        flexDirection: 'column',
    },
    bottomSheetBtn:{
        borderRadius: 100,
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        backgroundColor : '#28AEFF'
    },
});