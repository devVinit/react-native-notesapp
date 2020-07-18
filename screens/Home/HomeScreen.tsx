import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Animated, Dimensions, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import moment from 'moment';
import AddIconSvg from '../../components/Svg/AddIconSvg';
import MenuIconSvg from '../../components/Svg/MenuIconSvg';
import SearchIconSvg from '../../components/Svg/SearchIconSvg';
import { Note } from '../../models/Note';
import { NoteDetailsScreenMode } from '../NoteDetails/NoteDetailsScreen';
import CloseIconSvg from '../../components/Svg/CloseIconSvg';
import PinCodeIconSvg from '../../components/Svg/PinCodeIconSvg';
import { SecurityPinScreenMode } from '../SecurityPin/SecurityPinScreen';
import PinIconSvg from '../../components/Svg/PinIconSvg';
import { commonStyle } from '../../CompponStyles';


interface HomeScreenProps {
  navigation: any;
}


const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const screenWidth70 = Dimensions.get('screen').width * (7 / 10);
  const screenWidth50 = Dimensions.get('screen').width / 2;

  const [isShowDrawer, setIsShowDrawer] = useState<boolean>();
  const notes = useSelector((state: any) => state.notes);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transAnim = useRef(new Animated.Value(-screenWidth70)).current;

  const handleOpenMenuAction = () => {
    setIsShowDrawer(!isShowDrawer);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(transAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  }

  const handleCloseMenuAction = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(transAnim, {
        toValue: -screenWidth70,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => {
      setIsShowDrawer(!isShowDrawer);
    });
  }

  const goToEditSecurityScreen = () => {
    handleCloseMenuAction();
    navigation.push('SecurtyPinScreen', {
      mode: SecurityPinScreenMode.EDIT
    })
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* HomePage */}

        <View style={{ height: 68, paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableNativeFeedback
            onPress={() => handleOpenMenuAction()}
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

        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', position: 'absolute', zIndex: 10, bottom: '10%', left: screenWidth50 - 40, }}>
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('NoteDetailsScreen', {
                mode: NoteDetailsScreenMode.ADD
              })}>
              <View
                style={{ height: 70, width: 70, backgroundColor: '#3A3A3A', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                <AddIconSvg />
              </View>
            </TouchableNativeFeedback>
          </View>


          <ScrollView contentContainerStyle={{}}>
            {
              notes && notes.filter((note: Note) => note.pinned).length > 0 &&
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', padding: 20, paddingVertical: 30, width: '100%', borderBottomWidth: 0.2, borderColor: '#707070' }}>
                {
                  notes && notes.length > 0 && notes.filter((note: Note) => note.pinned).map((note: Note, index: number) => (
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
                notes && notes.length > 0 && notes.map((note: Note, index: number) => (
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
          </ScrollView>
        </View>
      </SafeAreaView>

      {
        isShowDrawer &&
        <View style={styles.drwaerContainer}>
          <SafeAreaView>
            <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>
              <Animated.View style={[styles.drawer, { transform: [{ translateX: transAnim }] }]}>
                <View style={{ alignItems: 'flex-end' }}>
                  <TouchableNativeFeedback
                    onPress={() => handleCloseMenuAction()}
                    background={TouchableNativeFeedback.Ripple('black', true)}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                      <CloseIconSvg />
                    </View>
                  </TouchableNativeFeedback>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={commonStyle.header2}>Notes App</Text>
                </View>
                <View style={{ height: 40 }} />
                <TouchableNativeFeedback
                  onPress={() => goToEditSecurityScreen()}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <PinCodeIconSvg />
                    <Text style={[commonStyle.header2, { marginLeft: 15 }]}>Pin</Text>
                  </View>
                </TouchableNativeFeedback>
              </Animated.View>
              <TouchableWithoutFeedback onPress={() => handleCloseMenuAction()}>
                <Animated.View style={{ width: '100%', backgroundColor: 'black', opacity: fadeAnim, }}>
                  <Text>White</Text>
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </SafeAreaView>
        </View>
      }
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  drwaerContainer: {
    position: 'absolute',
    zIndex: 10,
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: 'transparent'
  },
  drawer: {
    position: 'absolute',
    zIndex: 20,
    width: '70%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
  }
});