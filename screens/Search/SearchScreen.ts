import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackIconSvg from "../../components/Svg/BackIconSvg";
import CloseIconSvg from "../../components/Svg/CloseIconSvg";
import { NoteDetailsScreenMode } from "../NoteDetails/NoteDetailsScreen";
import { useSelector } from "react-redux";
import { Note } from "../../models/Note";
import { commonStyle } from "../../CompponStyles";
import NotesCardComponent from "../../components/Common/NoteCardComponent";

interface SearchScreenPorps {
  navigation: any;
}

const SearchScreen = ({ navigation }: SearchScreenPorps) => {
  const [text, setText] = useState<string>("");
  const notes = useSelector((state: any) => state.notes);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={commonStyle.headerContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableNativeFeedback
              onPress={() => navigation.goBack()}
              background={TouchableNativeFeedback.Ripple("black", true)}
            >
              <View style={commonStyle.headerIcon}>
                <BackIconSvg />
              </View>
            </TouchableNativeFeedback>
            <TextInput
              autoFocus={true}
              value={text}
              onChangeText={(text) => setText(text)}
              placeholder="Search"
              style={styles.searchTextInput}
            />
          </View>

          {Boolean(text && text.length && text.length > 0) && (
            <TouchableNativeFeedback
              onPress={() => setText("")}
              background={TouchableNativeFeedback.Ripple("black", true)}
            >
              <View style={commonStyle.headerIcon}>
                <CloseIconSvg />
              </View>
            </TouchableNativeFeedback>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView>
            {Boolean(text && text.length && text.length > 0) &&
              notes &&
              notes.filter(
                (note: Note) =>
                  (note.pinned &&
                    note.title.toLowerCase().includes(text.toLowerCase())) ||
                  note.content.toLowerCase().includes(text.toLowerCase())
              ).length > 0 && (
                <View
                  style={[
                    commonStyle.notesContainer,
                    { borderBottomWidth: 0.2, borderColor: "#707070" },
                  ]}
                >
                  {Boolean(text && text.length && text.length > 0) &&
                    notes &&
                    notes.length > 0 &&
                    notes
                      .filter((note: Note) => note.pinned)
                      .filter(
                        (note: Note) =>
                          note.title
                            .toLowerCase()
                            .includes(text.toLowerCase()) ||
                          note.content
                            .toLowerCase()
                            .includes(text.toLowerCase())
                      )
                      .map((note: Note, index: number) => (
                        <NotesCardComponent
                          pinned
                          key={index}
                          note={note}
                          onPress={() =>
                            navigation.navigate("NoteDetailsScreen", {
                              note,
                              noteId: note.id,
                              mode: NoteDetailsScreenMode.VIEW,
                            })
                          }
                        />
                      ))}
                </View>
              )}

            <View style={commonStyle.notesContainer}>
              {Boolean(text && text.length && text.length > 0) &&
                notes &&
                notes.length > 0 &&
                notes
                  .filter((note: Note) => !note.pinned)
                  .filter(
                    (note: Note) =>
                      note.title.toLowerCase().includes(text.toLowerCase()) ||
                      note.content.toLowerCase().includes(text.toLowerCase())
                  )
                  .map((note: Note, index: number) => (
                    <NotesCardComponent
                      key={index}
                      note={note}
                      onPress={() =>
                        navigation.navigate("NoteDetailsScreen", {
                          note,
                          noteId: note.id,
                          mode: NoteDetailsScreenMode.VIEW,
                        })
                      }
                    />
                  ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchTextInput: {
    height: 40,
    paddingHorizontal: 5,
    maxWidth: "82%",
    fontSize: 16,
  },
});
