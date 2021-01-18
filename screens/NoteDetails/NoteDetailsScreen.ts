import React, { useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import UndoIconSvg from '../../components/Svg/UndoIconSvg';
import RedoIconSvg from '../../components/Svg/RedoIconSvg';
import { useState, useEffect } from 'react';
import BackIconSvg from '../../components/Svg/BackIconSvg';
import DoneIconSvg from '../../components/Svg/DoneIconSvg';
import { useDispatch } from 'react-redux';
import { addNote, deleteNote, pinNote } from '../../redux/actions/NotesActions';
import { toggleToaster } from '../../redux/actions/ToasterActions';
import PinIconSvg from '../../components/Svg/PinIconSvg';
import DeleteIconSvg from '../../components/Svg/DeleteIconSvg';
import { Note } from '../../models/Note';
import { commonStyle } from '../../CompponStyles';
import moment from 'moment';

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
  const [date, setDate] = useState(moment(new Date()).format('DD MMM').toString());
  const [pinned, setPinned] = useState<boolean>(route.params.note && route.params.note.pinned || false);
  const [selectedNoteForDelete, setSelectedNoteForDelete] = useState<boolean>(false);

  const [contentHistory, setContentHistory] = useState<any>({
    past: [],
    present: [],
    future: []
  });

  const dispatch = useDispatch();

  const handleAddNoteActon = () => {
    const payload: Note = {
      id: route.params.newId,
      title,
      content,
      pinned,
      date,
      bgColor: randomColor()
    };

    dispatch(addNote(payload));
    navigation.pop();
  }

  const showConfirmationBeforeDelete = () => {
    setSelectedNoteForDelete(true);
  }

  const handleDeleteNoteAction = () => {
    const noteId = route.params.noteId;
    dispatch(toggleToaster('Deleted Successfully'));
    dispatch(deleteNote(noteId));
    navigation.pop();
  }

  const handlePinNoteAction = () => {
    setPinned(!pinned);
    const noteId = route.params.noteId;
    dispatch(pinNote(noteId));
  }

  const handleContentTextChange = (event: any) => {
    if (event.nativeEvent.key === 'Backspace' || event.nativeEvent.key === 'Enter') {
      let replaceIndex = null;
      for (let i = contentHistory.past.length - 1; i >= 0; i--) {
        if (contentHistory.past[i].type === 'added') {
          if (contentHistory.past.filter((element: any) => element.type === 'removed').length === 0) {
            replaceIndex = i;
            break;
          }

          if (contentHistory.past.filter((element: any) => element.type === 'removed' && element.replaceIndex === i).length === 0) {
            replaceIndex = i;
            break;
          }
        }
      }
      setContentHistory({ ...contentHistory, past: [...contentHistory.past, { type: 'removed', replaceIndex }] });
    } else {
      setContentHistory({ ...contentHistory, past: [...contentHistory.past, { type: 'added', value: event.nativeEvent.key }] });
    }
  }

  const handleUndoContent = () => {
    const lastOperation = contentHistory.past[contentHistory.past.length - 1];
    let undoContent;

    if (lastOperation.type === 'added') {
      undoContent = content.substring(0, content.length - 1);
    } else {
      undoContent = content + contentHistory.past[lastOperation.replaceIndex].value;
    }

    setContent(undoContent);

    const removedHistory = contentHistory.past.splice(contentHistory.past.length - 1, 1)[0];
    contentHistory.future.push(removedHistory);
    setContentHistory({ ...contentHistory });
  }

  const handleRedoContent = () => {
    const lastOperation = contentHistory.future[contentHistory.future.length - 1];
    console.log(lastOperation);

    let redoContent;

    if (lastOperation.type === 'added') {
      redoContent = content + lastOperation.value;
    } else {
      redoContent = content.substring(lastOperation.replaceIndex, content.length - 1);
    }

    setContent(redoContent);

    const removedFuture = contentHistory.future.splice(contentHistory.future.length - 1, 1)[0];
    contentHistory.past.push(removedFuture);
    setContentHistory({ ...contentHistory });
  }

  return (
    <View style= { styles.container } >
    <StatusBar style="auto" />
      <SafeAreaView style={ { flex: 1 } }>
        <View style={ commonStyle.headerContainer }>
          <TouchableNativeFeedback
                        onPress={ () => navigation.pop() }
  background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View style={ commonStyle.headerIcon }>
      <BackIconSvg />
      < /View>
      < /TouchableNativeFeedback>

      < View style = {{ flexDirection: 'row' }
}>
{
  route.params && route.params.mode === NoteDetailsScreenMode.ADD &&
    <>
    <TouchableNativeFeedback
                                    disabled={ contentHistory.past.length === 0 }
onPress = {() => handleUndoContent()}
background = { TouchableNativeFeedback.Ripple('black', true) } >
  <View style={ [commonStyle.headerIcon, { opacity: contentHistory.past.length > 0 ? 1 : 0.3, }] }>
    <UndoIconSvg />
    < /View>
    < /TouchableNativeFeedback>
    < TouchableNativeFeedback
disabled = { contentHistory.future.length === 0 }
onPress = {() => handleRedoContent()}
background = { TouchableNativeFeedback.Ripple('black', true) } >
  <View style={ [commonStyle.headerIcon, { opacity: contentHistory.future.length > 0 ? 1 : 0.3, }] }>
    <RedoIconSvg />
    < /View>
    < /TouchableNativeFeedback>
    < TouchableNativeFeedback
onPress = {() => handleAddNoteActon()}
background = { TouchableNativeFeedback.Ripple('black', true) } >
  <View style={ commonStyle.headerIcon }>
    <DoneIconSvg />
    < /View>
    < /TouchableNativeFeedback>
    < />
                        }

{
  route.params && route.params.mode === NoteDetailsScreenMode.VIEW &&
    <>
    <TouchableNativeFeedback
                                    onPress={ () => handlePinNoteAction() }
  background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View style={ [commonStyle.headerIcon, { opacity: pinned ? 1 : 0.3 }] }>
      <PinIconSvg />
      < /View>
      < /TouchableNativeFeedback>
      < TouchableNativeFeedback
  onPress = {() => showConfirmationBeforeDelete()
}
background = { TouchableNativeFeedback.Ripple('black', true) } >
  <View style={ commonStyle.headerIcon }>
    <DeleteIconSvg />
    < /View>
    < /TouchableNativeFeedback>
    < />
                        }
</View>
  < /View>

  < View style = { styles.content } >
    <Text style={ [commonStyle.headerIcon, { opacity: 0.2 }] }> { date } < /Text>
      < TextInput
placeholder = "Title here..."
style = { [styles.titleTextInput, { opacity: title ? 1.0 : 0.5 }]}
onChangeText = {(title: string) => setTitle(title)}
value = { title }
editable = { route.params && route.params.mode === NoteDetailsScreenMode.ADD }
  />

  <TextInput
                        multiline
placeholder = "Content"
style = {{ height: 'auto', fontSize: 13, color: route.params && route.params.mode === NoteDetailsScreenMode.VIEW ? '#1D1D1D' : 'black' }}
onKeyPress = {(key: any) => handleContentTextChange(key)}
onChangeText = {(content: string) => setContent(content)}
value = { content }
editable = { route.params && route.params.mode === NoteDetailsScreenMode.ADD }
  />
  </View>

  < Modal
animationType = "fade"
transparent = { true}
visible = { selectedNoteForDelete }
onRequestClose = {() => setSelectedNoteForDelete(false)}>
  <View style={ styles.modalContainer }>
    <View style={ styles.modalBackground } />
      < View style = { styles.modal } >
        <Text style={ [commonStyle.header2, { padding: 30 }] }> Delete This Note ? </Text>
          < View style = {{ flexDirection: 'row', justifyContent: 'space-evenly', borderWidth: 0.2 }}>
            <TouchableNativeFeedback
                                    onPress={ () => setSelectedNoteForDelete(false) }>
  <View style={ styles.modalActionContainer }>
    <Text style={ styles.modalActionTextStyle }> Cancel < /Text>
      < /View>
      < /TouchableNativeFeedback>
      < TouchableNativeFeedback
onPress = {() => handleDeleteNoteAction()}>
  <View style={ styles.modalActionContainer }>
    <Text style={ styles.modalActionTextStyle }> Delete < /Text>
      < /View>
      < /TouchableNativeFeedback>
      < /View>
      < /View>
      < /View>
      < /Modal>
      < /SafeAreaView>
      < /View>
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
  content: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 40,
  },
  titleTextInput: {
    height: 60,
    fontSize: 25,
    fontFamily: 'Poppins_500Medium',
    marginVertical: 10,
    color: '#1D1D1D',
    borderBottomWidth: 0.2
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  modalBackground: {
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
  },
  modalActionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 50
  },
  modalActionTextStyle: {
    fontSize: 16,
    color: '#1D1D1D'
  }
});
