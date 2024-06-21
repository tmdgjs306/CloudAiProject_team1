import {StyleSheet} from 'react-native';

export const loginPageLayout = StyleSheet.create({
    totalContainer:{
        width: '100%',
        height: '100%',
    },
    titleContainer:{
        width: '100%',
        height: '25%',
        backgroundColor: '#ca8d60',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleImage:{
        width: '100%',
        height: '70%',
        resizeMode: 'contain',
        marginTop: 10,
    },
    title:{
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    formContainer:{
        backgroundColor: '#FFEAD0',
        width:'100%',
        height: '100%',
        paddingTop: "20%",
    },
    form:{
        alignItems: 'left',
        backgroundColor: '#FDF5E6',
        borderRadius: 30,
        borderWidth: 0.1,
        width: '100%',
        height: '10%',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    submitBtn:{
        alignItems: 'center',
        width: '100%',
        height: '10%',
        backgroundColor: '#FADCA5',
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 30,
        borderWidth: 0.1,
        marginTop: 30,
        borderColor: '#FADCA5',
        borderWidth: 0.1,
    }
});