import * as React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import UndoIconSvg from '../../components/Svg/UndoIconSvg';
import RedoIconSvg from '../../components/Svg/RedoIconSvg';
import { useState } from 'react';
import BackIconSvg from '../../components/Svg/BackIconSvg';
import DoneIconSvg from '../../components/Svg/DoneIconSvg';

interface NoteDetailsScreenProps {
    navigation: any;
}

const NoteDetailsScreen = ({ navigation }: NoteDetailsScreenProps) => {

    const [text, setText] = useState<string>();

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView style={{ flex: 1 }}>

                {/* NoteDetails */}

                <View style={{ height: 68, paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableNativeFeedback
                        onPress={() => navigation.pop()}
                        background={TouchableNativeFeedback.Ripple('black', true)}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <BackIconSvg />
                        </View>
                    </TouchableNativeFeedback>

                    <View style={{ flexDirection: 'row' }}>
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
                            background={TouchableNativeFeedback.Ripple('black', true)}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                <DoneIconSvg />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>

                <View style={{ margin: 30, marginHorizontal: 40, flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#1D1D1D', opacity: 0.2 }}>5 June</Text>
                    <TextInput
                        placeholder="Title here..."
                        style={{ height: 60, fontSize: 25, fontFamily: 'Poppins_500Medium', marginVertical: 10, color: '#1D1D1D', opacity: 0.5, borderBottomWidth: 0.2 }}
                        onChangeText={text => setText(text)}
                        value={text}
                    />

                    <TextInput
                        multiline
                        placeholder="Content"
                        style={{ height: 'auto', fontSize: 13, }}
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
