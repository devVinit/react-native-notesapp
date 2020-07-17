import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Platform, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AddIconSvg from '../../components/Svg/AddIconSvg';
import MenuIconSvg from '../../components/Svg/MenuIconSvg';
import SearchIconSvg from '../../components/Svg/SearchIconSvg';
import { Note } from '../../models/Note';
import { NoteDetailsScreenMode } from '../NoteDetails/NoteDetailsScreen';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {

  const notes = useSelector((state: any) => state.notes);

  console.log(notes);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* HomePage */}

        <View style={{ height: 68, paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('black', true)}>
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
              <MenuIconSvg />
            </View>
          </TouchableNativeFeedback>


          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontFamily: 'Poppins_500Medium', color: '#1D1D1D' }}>Notes</Text>
            <Text style={{ fontSize: 12, color: '#1D1D1D' }}>8 Notes</Text>
          </View>


          <TouchableNativeFeedback
            onPress={() => navigation.push('SearchScreen')}
            background={TouchableNativeFeedback.Ripple('black', true)}>
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
              <SearchIconSvg />
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={{}}>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', width: '100%' }}>

            {
              notes && notes.length > 0 && notes.map((note: Note, index: number) => (
                <TouchableNativeFeedback
                  key={index}
                  onPress={() => navigation.navigate('NoteDetailsScreen', {
                    note,
                    noteIndex: index,
                    mode: NoteDetailsScreenMode.VIEW
                  })}
                >
                  <View style={{ backgroundColor: note.bgColor, padding: 20, borderRadius: 10, width: '50%', flex: -1 }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Poppins_500Medium', color: '#1D1D1D' }}>{note.title}</Text>
                    <Text style={{ fontSize: 12, color: '#1D1D1D', opacity: 0.7, marginTop: 10 }}>{note.content}</Text>
                    <Text style={{ fontSize: 12, color: '#1D1D1D', marginTop: 10 }}>5 June</Text>
                  </View>
                </TouchableNativeFeedback>
              ))
            }
          </View>
        </View>


        <View style={{ position: 'absolute', bottom: '10%', width: '100%', alignItems: 'center', }}>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('NoteDetailsScreen', {
              mode: NoteDetailsScreenMode.ADD
            })}
            background={TouchableNativeFeedback.Ripple('black', true)}>
            <View
              style={{ height: 70, width: 70, backgroundColor: '#3A3A3A', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
              <AddIconSvg />
            </View>
          </TouchableNativeFeedback>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});