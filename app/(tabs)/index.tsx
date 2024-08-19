import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Definer typen for en Note
type Note = {
  id: string;
  text: string;
};

// Hovedfunktion for NoteApp komponenten
export default function NoteApp() {
  // State-variabler
  const [noteText, setNoteText] = useState(''); // Holder den aktuelle tekst i inputfeltet
  const [notes, setNotes] = useState<Note[]>([]); // Holder listen af noter

  // Funktion til at tilføje en ny note
  const addNote = () => {
    if (noteText.trim()) { // Tjekker om inputfeltet ikke er tomt
      const newNote: Note = { id: Date.now().toString(), text: noteText.trim() };
      setNotes((prevNotes) => [...prevNotes, newNote]); // Tilføjer den nye note til listen
      setNoteText(''); // Tømmer inputfeltet efter at have tilføjet noten
    }
  };

  // Funktion til at slette en note baseret på dens id
  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); // Fjerner noten med det givne id
  };

  // Render hver note-element med en sletteknap
  const renderNote = ({ item }: { item: Note }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteNote(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Slet</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mine Noter</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv en note..."
        placeholderTextColor="#ccc"
        value={noteText}
        onChangeText={setNoteText} // Opdater noteText når input ændres
      />
      <Button title="Tilføj Note" onPress={addNote} color="#007bff" />
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        style={styles.noteList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16.2,
    backgroundColor: '#1e3a5f', // Dark Blue Background
  },
  header: {
    paddingTop: 50,
    fontSize: 24,
    marginBottom: 16,
    color: '#fff', // White Text
  },
  input: {
    borderColor: '#2a5070', // Darker Blue Border
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    color: '#fff', // White Text
    backgroundColor: '#2a5070', // Slightly Lighter Blue Background
  },
  noteList: {
    marginTop: 16,
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: '#2a5070', // Darker Blue Border
    borderBottomWidth: 1,
    backgroundColor: '#24466b', // Slightly Different Blue for Note Background
    borderRadius: 4,
    marginBottom: 8,
  },
  noteText: {
    color: '#fff', // White Text for Notes
  },
  deleteButton: {
    backgroundColor: '#ff4d4d', // Red Delete Button
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff', // White Text for Delete Button
    fontWeight: 'bold',
  },
});
 