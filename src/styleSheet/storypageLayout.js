import {StyleSheet} from 'react-native';

export const storypageLayout = StyleSheet.create({
    mainFrame: {
        paddingVertical : 20
    },
    storySquare:{
        flexDirection: 'column',
        paddingHorizontal: 8,
        position: 'relative',
    },
    plusButton:{
        position: 'absolute',
        bottom: 15,
        right: 10,
        zIndex: 1,
    },
    storyImageOutline:{
        width: 68,
        height: 68,
        backgroundColor: 'white',
        borderWidth: 1.8,
        borderRadius: 100,
        borderColor: '#c13584',
        justifyContent: 'center',
        alignItems: 'center',
    },
    storyImage:{
        resizeMode: 'cover',
        width: '92%',
        height: '92%',
        borderRadius: 100,
        backgroundColor: 'orange',
    },
    storyName:{
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        opacity: data.id == 0 ? 1 : 0.7,
    }
});