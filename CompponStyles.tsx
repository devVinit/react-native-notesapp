import { StyleSheet } from 'react-native';

export const commonStyle = StyleSheet.create({
    header2: {
        fontSize: 18,
        fontFamily: 'Poppins_500Medium',
        color: '#1D1D1D'
    },
    content: {
        fontSize: 12,
        color: '#1D1D1D',
    },
    headerContainer: {
        height: 68,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    notesContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 20, paddingVertical: 30,
        width: '100%',
    }
});