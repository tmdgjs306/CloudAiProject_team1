import { StyleSheet } from 'react-native';

const signPageLayout = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: 'black'
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10
    },
    formContainer: {
        marginBottom: 20
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: '#DDD',
        borderWidth: 1,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#50B4F5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '500'
    },
    applyButton: {
        backgroundColor: '#50B4F5',
        flex: 1,
        marginRight: 10,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    cancelButton: {
        backgroundColor: 'tomato',
        flex: 1,
        marginLeft: 10,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    applyButtonText: {
        color: 'white',
        fontWeight: '500'
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: '500'
    },
    radioContainer: {
        marginBottom: 20,
    },
    radioTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    }
});

export default signPageLayout;
