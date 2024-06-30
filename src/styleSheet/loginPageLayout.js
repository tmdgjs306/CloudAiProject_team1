import { StyleSheet } from 'react-native';

const loginPageLayout = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logoImageContainer:{
        resizeMode: 'contain',
        paddingBottom: 30,
    },
    logo:{
        width: 0,
        height: 0,
    },
    logoText:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
    },
    inputContainer: {
        width: '80%',
        marginTop: 15,
        color: 'black',
    },
    input: {
        backgroundColor: '#E2E2E2',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        color: 'black',
        marginBottom: 10,
    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    button: {
        backgroundColor: 'black',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText:{
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
});

export default loginPageLayout;
