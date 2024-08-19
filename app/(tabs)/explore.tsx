// index.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState(''); // Holder den aktuelle by
  const [weather, setWeather] = useState(null); // Holder vejrinformation
  const [error, setError] = useState(''); // Holder fejlmeddelelser

  // Funktion til at hente vejrinformation
  const fetchWeather = async () => {
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: city,
          appid: 'adedf584a288b61edece573a8f4527d1', // Erstat med din API-nøgle
          units: 'metric'
        }
      });
      setWeather(response.data); // Sætter vejrinformationen
      setError(''); // Nulstiller fejlmeddelelser
      Keyboard.dismiss(); // Skjul tastaturet efter at have hentet vejrinformation
    } catch (err) {
      setError('Byen blev ikke fundet'); // Sætter en fejlmeddelelse
      setWeather(null); // Nulstiller vejrinformation
      Keyboard.dismiss();
    }
  };

  // Funktion til at håndtere formularindsendelse
  const handleSubmit = () => {
    fetchWeather(); // Hent vejrinformation
    Keyboard.dismiss(); 
  };
  
  // Variabler til vejrinformation
  const weatherName = weather?.name || 'Ingen bydata'; // Navn på byen
  const weatherTemp = weather?.main?.temp !== undefined ? `${weather.main.temp}°C` : 'N/A'; // Temperatur
 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Indtast by"
          value={city}
          onChangeText={setCity} // Opdater by-variabel ved ændring
        />
        <Button title="Søg" onPress={fetchWeather} />
        {error ? (
          <Text style={styles.error}>{error}</Text> // Vis fejlmeddelelse
        ) : weather ? (
          <View style={styles.weatherContainer}>
            <Text style={styles.city}>{weatherName}</Text>
            <Text style={styles.temp}>{weatherTemp}</Text>
            
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

// Stilarter til komponenterne
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8', // Lys gråblå baggrund
    padding: 20 // Generel padding for container
  },
  innerContainer: {
    width: '90%', // Øget bredde for bedre afstand på mindre skærme
    alignItems: 'center'
  },
  input: {
    height: 45, // Lidt højere inputfelt for bedre touchmål
    borderColor: '#4A90E2', // Lys blå kantfarve
    borderWidth: 1,
    width: '100%',
    
    paddingHorizontal: 12, // Øget padding for inputfelt
    marginBottom: 20, // Øget margin nederst for bedre afstand
    color: '#333333', // Mørkegrå tekstfarve
    backgroundColor: '#FFFFFF', // Hvid baggrundsfarve for input
    borderRadius: 8 // Lidt større border radius for et moderne udseende
  },
  weatherContainer: {
    
    alignItems: 'center',
    marginVertical: 20 // Tilføjet vertikal margin for afstand omkring vejrinformation
  },
  city: {
    fontSize: 26, // Lidt større skriftstørrelse for bedre læsbarhed
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8 // Tilføjet margin nederst for afstand fra temperatur
  },
  temp: {
    fontSize: 52, // Større skriftstørrelse for fremhævelse
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 8 // Tilføjet margin nederst for afstand fra beskrivelse
  },
  description: {
    fontSize: 20, // Lidt større skriftstørrelse for bedre læsbarhed
    color: '#7F8C8D',
    textAlign: 'center' // Centreret tekstjustering for bedre præsentation
  },
  error: {
    color: '#E74C3C', // Rød farve til fejlmeddelelser
    fontWeight: 'bold',
    marginTop: 10, // Tilføjet margin øverst for afstand fra andre elementer
    textAlign: 'center' // Centreret tekstjustering for fejlmeddelelser
  }
  
});

export default WeatherApp;
