import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import BackIconSvg from '../../Components/Svg/BackIconSvg';
import CloseIconSvg from '../../Components/Svg/CloseIconSvg';

interface SearchScreenPorps {
    navigation: any;
}

const SearchScreen = ({ navigation }: SearchScreenPorps) => {
    return (<View style={styles.container}>
        <StatusBar style="auto" />
        <SafeAreaView style={{ flex: 1 }}>
            {/* HomePage */}

            {/* <View style={{ height: 68, paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('black', true)}>
                <View style={{  alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                  <MenuIconSvg />
                </View>
              </TouchableNativeFeedback>
  
  
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontFamily: 'Poppins_500Medium', color: '#1D1D1D' }}>Notes</Text>
                <Text style={{ fontSize: 12, color: '#1D1D1D' }}>8 Notes</Text>
              </View>
  
  
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('black', true)}>
                <View style={{  alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                  <SearchIconSvg />
                </View>
              </TouchableNativeFeedback>
            </View>
  
  
  
            <View style={{}}>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', width: '100%' }}>
                <View style={{ backgroundColor: '#F3FFE2', padding: 20, borderRadius: 10, width: '50%', flex: -1 }}>
                  <Text style={{ fontSize: 18, fontFamily: 'Poppins_500Medium', color: '#1D1D1D' }}>Health</Text>
                  <Text style={{ fontSize: 12, color: '#1D1D1D', opacity: 0.7, marginTop: 10 }}>It is a long established fact that a reader will be distracted by the readabl</Text>
                  <Text style={{ fontSize: 12, color: '#1D1D1D', marginTop: 10 }}>5 June</Text>
                </View>
                <View style={{ display: 'flex', overflow: 'hidden', backgroundColor: '#FFF6F6', padding: 20, borderRadius: 10, width: '50%', flex: -1 }}>
                  <Text style={{ fontSize: 18, fontFamily: 'Poppins_500Medium', color: '#1D1D1D' }}>Get a head..</Text>
                  <Text style={{ fontSize: 12, color: '#1D1D1D', opacity: 0.7, marginTop: 10 }}>There are many variations of passages</Text>
                  <Text style={{ fontSize: 12, color: '#1D1D1D', marginTop: 10 }}>5 June</Text>
                </View>
                <View style={{ display: 'flex', overflow: 'hidden', backgroundColor: '#FFF6F6', padding: 20, borderRadius: 10, width: '50%', flex: -1 }}>
                  <Text style={{ fontSize: 18, fontFamily: 'Poppins_500Medium', color: '#1D1D1D' }}>Shop List</Text>
                  <Text style={{ fontSize: 12, color: '#1D1D1D', opacity: 0.7, marginTop: 10 }}>1. Clothes{'\n'}2. Table{'\n'}3. Pizza{'\n'}4. Book</Text>
                  <Text style={{ fontSize: 12, color: '#1D1D1D', marginTop: 10 }}>5 June</Text>
                </View>
              </View>
            </View>
  
  
            <View style={{ position: 'absolute', bottom: '10%', width: '100%', alignItems: 'center', }}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('black', true)}>
                <View
                  style={{ height: 70, width: 70, backgroundColor: '#3A3A3A', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                  <AddIconSvg />
                </View>
              </TouchableNativeFeedback>
            </View> */}






            {/* NoteDetails */}

            {/* <View style={{ height: 68, paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableNativeFeedback
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
            </View> */}




            {/* SearchPage */}

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
                        placeholder="Search"
                        style={{ height: 40, paddingHorizontal: 5, maxWidth: '82%', fontSize: 16 }}
                    />
                </View>

                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('black', true)}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                        <CloseIconSvg />
                    </View>
                </TouchableNativeFeedback>
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