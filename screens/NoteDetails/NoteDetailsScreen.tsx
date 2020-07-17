import * as React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import UndoIconSvg from '../../components/Svg/UndoIconSvg';
import RedoIconSvg from '../../components/Svg/RedoIconSvg';
import { useState, useEffect } from 'react';
import BackIconSvg from '../../components/Svg/BackIconSvg';
import DoneIconSvg from '../../components/Svg/DoneIconSvg';
import { useDispatch } from 'react-redux';
import { addNote, deleteNote } from '../../redux/actions/NotesActions';
import PinIconSvg from '../../components/Svg/PinIconSvg';
import DeleteIconSvg from '../../components/Svg/DeleteIconSvg';


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

    const [title, setTitle] = useState<string>(route.params.note.title || '');
    const [content, setContent] = useState<string>(route.params.note.content || '');

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(route.params);
    }, []);

    const handleAddNoteActon = () => {
        const payload = {
            title,
            content,
            pinned: false,
            bgColor: randomColor()
        };

        dispatch(addNote(payload));
        navigation.pop();
    }

    const handleDeleteNoteAction = () => {
        const index = route.params.noteIndex;
        dispatch(deleteNote(index));
        navigation.pop();
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ height: 68, paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
                                    background={TouchableNativeFeedback.Ripple('black', true)}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                        <PinIconSvg />
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback
                                    onPress={() => handleDeleteNoteAction()}
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
                        style={{ height: 'auto', fontSize: 13, }}
                        onChangeText={content => setContent(content)}
                        value={content}
                        editable={route.params && route.params.mode === NoteDetailsScreenMode.ADD}
                    />
                </View>

            </SafeAreaView>
        </View>
    );
};

export default NoteDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
