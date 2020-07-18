import * as React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, TextInput, Modal, Alert, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import UndoIconSvg from '../../components/Svg/UndoIconSvg';
import RedoIconSvg from '../../components/Svg/RedoIconSvg';
import { useState, useEffect } from 'react';
import BackIconSvg from '../../components/Svg/BackIconSvg';
import DoneIconSvg from '../../components/Svg/DoneIconSvg';
import { useDispatch } from 'react-redux';
import { addNote, deleteNote, pinNote } from '../../redux/actions/NotesActions';
import PinIconSvg from '../../components/Svg/PinIconSvg';
import DeleteIconSvg from '../../components/Svg/DeleteIconSvg';
import { Note } from '../../models/Note';
import { commonStyle } from '../../CompponStyles';


function randomColor() {
    const bgColors = ['#F3FFE2', '#FFF6F6', '#FFFBE0', '#F9F9F9'];
    return bgColors[Math.floor(Math.random() * bgColors.length)];
}


interface NoteDetailsScreenProps {
    navigation: any;
    route: any;
}

export enum NoteDetailsScreenMode {
    ADD = 'ADD',
    VIEW = 'VIEW'
}

const NoteDetailsScreen = ({ route, navigation }: NoteDetailsScreenProps) => {

    const [title, setTitle] = useState<string>(route.params.note && route.params.note.title || '');
    const [content, setContent] = useState<string>(route.params.note && route.params.note.content || '');
    const [pinned, setPinned] = useState<boolean>(route.params.note && route.params.note.pinned || false);

    const [contentHistory, setContentHistory] = useState<any>({
        past: [],
        present: [],
        future: []
    });

    const [selectedNoteForDelete, setSelectedNoteForDelete] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(contentHistory);
    }, [contentHistory]);

    const handleAddNoteActon = () => {
        const payload: Note = {
            title,
            content,
            pinned,
            bgColor: randomColor(),
            date: new Date()
        };

        dispatch(addNote(payload));
        navigation.pop();
    }

    const showConfirmationBeforeDelete = () => {
        setSelectedNoteForDelete(true);
    }

    const handleDeleteNoteAction = () => {
        const index = route.params.noteIndex;
        dispatch(deleteNote(index));
        navigation.pop();
    }

    const handlePinNoteAction = () => {
        setPinned(!pinned);
        const index = route.params.noteIndex;
        dispatch(pinNote(index));
    }

    const handleContentTextChange = (event: any) => {
        console.log(content);
        if (event.nativeEvent.key === 'Backspace' || event.nativeEvent.key === 'Enter') {
            setContentHistory({ ...contentHistory, past: [...contentHistory.past, { type: 'removed' }] });
        }

        // else {
        //     setContentHistory({ ...contentHistory, past: [...contentHistory.past, { type: 'added', value: event.nativeEvent.key }] });
        // }
    }

    const handleUndoContent = () => {
        const lastOperation = contentHistory.past[contentHistory.past.length - 1];
        if (lastOperation.type === 'added') {
            const undoContent = content.substring(0, content.length - 1);
            setContent(undoContent);
        }
        // else {
        //     const undoContent = content + lastOperation.value;
        //     setContent(undoContent);
        // }
        contentHistory.past.splice(contentHistory.past.length - 1, 1);
        setContentHistory({ ...contentHistory });
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <TouchableNativeFeedback
                        onPress={() => navigation.pop()}
                        background={TouchableNativeFeedback.Ripple('black', true)}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <BackIconSvg />
                        </View>
                    </TouchableNativeFeedback>

                    <View style={{ flexDirection: 'row' }}>
                        {
                            route.params && route.params.mode === NoteDetailsScreenMode.ADD &&
                            <>
                                <TouchableNativeFeedback
                                    onPress={() => handleUndoContent()}
                                    background={TouchableNativeFeedback.Ripple('black', true)}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                        <UndoIconSvg />
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback

                                    background={TouchableNativeFeedback.Ripple('black', true)}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                        <RedoIconSvg />
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback
                                    onPress={() => handleAddNoteActon()}
                                    background={TouchableNativeFeedback.Ripple('black', true)}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                        <DoneIconSvg />
                                    </View>
                                </TouchableNativeFeedback>
                            </>
                        }

                        {
                            route.params && route.params.mode === NoteDetailsScreenMode.VIEW &&
                            <>
                                <TouchableNativeFeedback
                                    onPress={() => handlePinNoteAction()}
                                    background={TouchableNativeFeedback.Ripple('black', true)}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, opacity: pinned ? 1 : 0.3 }}>
                                        <PinIconSvg />
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback
                                    onPress={() => showConfirmationBeforeDelete()}
                                    background={TouchableNativeFeedback.Ripple('black', true)}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                        <DeleteIconSvg />
                                    </View>
                                </TouchableNativeFeedback>
                            </>
                        }
                    </View>
                </View>

                <View style={{ marginVertical: 20, marginHorizontal: 40, flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#1D1D1D', opacity: 0.2 }}>5 June</Text>
                    <TextInput
                        placeholder="Title here..."
                        style={{ height: 60, fontSize: 25, fontFamily: 'Poppins_500Medium', marginVertical: 10, color: '#1D1D1D', opacity: title ? 1.0 : 0.5, borderBottomWidth: 0.2 }}
                        onChangeText={title => setTitle(title)}
                        value={title}
                        editable={route.params && route.params.mode === NoteDetailsScreenMode.ADD}
                    />

                    <TextInput
                        multiline
                        placeholder="Content"
                        style={{ height: 'auto', fontSize: 13, color: route.params && route.params.mode === NoteDetailsScreenMode.VIEW ? '#1D1D1D' : 'black' }}
                        onKeyPress={key => handleContentTextChange(key)}
                        onChangeText={content => setContent(content)}
                        value={content}
                        editable={route.params && route.params.mode === NoteDetailsScreenMode.ADD}
                    />
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={selectedNoteForDelete}
                    onRequestClose={() => setSelectedNoteForDelete(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBacground} />
                        <View style={styles.modal}>
                            <Text style={[commonStyle.header2, { padding: 30 }]}>Delete This Note ?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', borderWidth: 0.2 }}>
                                <TouchableNativeFeedback
                                    onPress={() => setSelectedNoteForDelete(false)}
                                >
                                    <View style={{ paddingVertical: 15, paddingHorizontal: 50 }}>
                                        <Text style={{ fontSize: 16, color: '#1D1D1D' }}>Cancel </Text>
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback
                                    onPress={() => handleDeleteNoteAction()}
                                >
                                    <View style={{ paddingVertical: 15, paddingHorizontal: 50 }}>
                                        <Text style={{ fontSize: 16, color: '#1D1D1D' }}>Delete </Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        </View>
    );
};

export default NoteDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        height: 68,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        opacity: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    modalBacground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.4
    },
    modal: {
        width: '80%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: '30%'
    }
});
