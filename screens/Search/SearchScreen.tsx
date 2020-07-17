import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import BackIconSvg from '../../components/Svg/BackIconSvg';
import CloseIconSvg from '../../components/Svg/CloseIconSvg';

interface SearchScreenPorps {
    navigation: any;
}

const SearchScreen = ({ navigation }: SearchScreenPorps) => {

    const [text, setText] = useState<string>()

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
                        autoFocus
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