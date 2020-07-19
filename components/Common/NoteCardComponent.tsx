import React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { commonStyle } from '../../CompponStyles';
import { Note } from '../../models/Note';
import PinIconSvg from '../Svg/PinIconSvg';

interface NotesCardComponentProps {
    onPress: any;
    note: Note
    pinned?: boolean
}

const NotesCardComponent = (props: NotesCardComponentProps) => {

    const { note, pinned, onPress } = props;

    return (
        <TouchableNativeFeedback
            onPress={onPress}>
            <View style={[styles.cardContainer, { backgroundColor: note.bgColor }]}>
                <Text style={commonStyle.header2}>{note.title}</Text>
                <Text style={[commonStyle.content, { marginTop: 10 }]}>{note.content}</Text>
                <Text style={[commonStyle.content, { marginTop: 10 }]}>{note.date}</Text>
                {
                    pinned &&
                    <View style={styles.pinIconContainer}>
                        <PinIconSvg />
                    </View>
                }
            </View>
        </TouchableNativeFeedback>
    );
};

export default NotesCardComponent;

const styles = StyleSheet.create({
    cardContainer: {
        padding: 20,
        borderRadius: 10,
        width: '48%',
        margin: 3
    },
    pinIconContainer: {
        position: 'absolute',
        right: 5,
        top: 5
    }
});
