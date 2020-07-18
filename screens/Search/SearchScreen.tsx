import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import BackIconSvg from '../../components/Svg/BackIconSvg';
import CloseIconSvg from '../../components/Svg/CloseIconSvg';
import moment from 'moment';
import { NoteDetailsScreenMode } from '../NoteDetails/NoteDetailsScreen';
import { useSelector } from 'react-redux';
import { Note } from '../../models/Note';
import PinIconSvg from '../../components/Svg/PinIconSvg';

interface SearchScreenPorps {
    navigation: any;
}

const SearchScreen = ({ navigation }: SearchScreenPorps) => {

    const [text, setText] = useState<string>('');
    const notes = useSelector((state: any) => state.notes);

    return (<View style={styles.container}>
        <StatusBar style="auto" />
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 68, paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableNativeFeedback
                        onPress={() => navigation.goBack()}
                        background={TouchableNativeFeedback.Ripple('black', true)}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <BackIconSvg />
                        </View>
                    </TouchableNativeFeedback>
                    <TextInput
                        autoFocus={true}
                        value={text}
                        onChangeText={(text) => setText(text)}
                        placeholder="Search"
                        style={{ height: 40, paddingHorizontal: 5, maxWidth: '82%', fontSize: 16 }}
                    />
                </View>

                {
                    Boolean(text && text.length && text.length > 0) &&
                    <TouchableNativeFeedback
                        onPress={() => setText('')}
                        background={TouchableNativeFeedback.Ripple('black', true)}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <CloseIconSvg />
                        </View>
                    </TouchableNativeFeedback>
                }
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{}}>
                    {
                        Boolean(text && text.length && text.length > 0) &&
                        notes && notes.filter((note: Note) => note.pinned).length > 0 &&
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', padding: 20, paddingVertical: 30, width: '100%', borderBottomWidth: 0.2, borderColor: '#707070' }}>
                            {
                                Boolean(text && text.length && text.length > 0) &&
                                notes && notes.length > 0 &&
                                notes
                                    .filter((note: Note) => note.pinned)
                                    .filter((note: Note) => (note.title.toLowerCase().includes(text.toLowerCase()) || note.content.toLowerCase().includes(text.toLowerCase())))
                                    .map((note: Note, index: number) => (
                                        <TouchableNativeFeedback
                                            key={index}
                                            onPress={() => navigation.navigate('NoteDetailsScreen', {
                                                note,
                                                noteIndex: index,
                                                mode: NoteDetailsScreenMode.VIEW
                                            })}
                                        >
                                            <View style={{ backgroundColor: note.bgColor, padding: 20, borderRadius: 10, width: '48%', margin: 3 }}>
                                                <Text style={{ fontSize: 18, fontFamily: 'Poppins_500Medium', color: '#1D1D1D' }}>{note.title}</Text>
                                                <Text style={{ fontSize: 12, color: '#1D1D1D', opacity: 0.7, marginTop: 10 }}>{note.content}</Text>
                                                <Text style={{ fontSize: 12, color: '#1D1D1D', marginTop: 10 }}>{moment(note.date).format('DD MMM')}</Text>
                                                <View style={{ position: 'absolute', right: 5, top: 5 }}>
                                                    <PinIconSvg />
                                                </View>
                                            </View>
                                        </TouchableNativeFeedback>
                                    ))
                            }
                        </View>
                    }

                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', padding: 20, backgroundColor: 'transparent', paddingVertical: 30, width: '100%', }}>
                        {
                            Boolean(text && text.length && text.length > 0) &&
                            notes && notes.length > 0 &&
                            notes
                                .filter((note: Note) => (note.title.toLowerCase().includes(text.toLowerCase()) || note.content.toLowerCase().includes(text.toLowerCase())))
                                .map((note: Note, index: number) => (
                                    <TouchableNativeFeedback
                                        key={index}
                                        onPress={() => navigation.navigate('NoteDetailsScreen', {
                                            note,
                                            noteIndex: index,
                                            mode: NoteDetailsScreenMode.VIEW
                                        })}
                                    >
                                        <View style={{ backgroundColor: note.bgColor, padding: 20, borderRadius: 10, width: '48%', margin: 3 }}>
                                            <Text style={{ fontSize: 18, fontFamily: 'Poppins_500Medium', color: '#1D1D1D' }}>{note.title}</Text>
                                            <Text style={{ fontSize: 12, color: '#1D1D1D', opacity: 0.7, marginTop: 10 }}>{note.content}</Text>
                                            <Text style={{ fontSize: 12, color: '#1D1D1D', marginTop: 10 }}>{moment(note.date).format('DD MMM')}</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                ))
                        }
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    </View>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})