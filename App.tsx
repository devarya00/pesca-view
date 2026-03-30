import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import { MapView, Camera, PointAnnotation } from '@maplibre/maplibre-react-native';
import './global.css';

const mockPescadores = [
  { id: '1', nome: 'João (Tucunaré)', coords: [-47.9292, -15.7801] },
  { id: '2', nome: 'Carlos (Dourado)', coords: [-47.9350, -15.7900] },
];

export default function App() {
  const [minhaLocalizacao, setMinhaLocalizacao] = useState<number[] | null>(null);
  const [compartilhando, setCompartilhando] = useState(false);
  const [permissaoConcedida, setPermissaoConcedida] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da sua localização para o radar funcionar.');
        return;
      }
      setPermissaoConcedida(true);
      
      let location = await Location.getCurrentPositionAsync({});
      setMinhaLocalizacao([location.coords.longitude, location.coords.latitude]);
    })();
  }, []);

  const toggleRadar = () => {
    setCompartilhando(!compartilhando);
  };

  if (!minhaLocalizacao) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-900">
        <Text className="text-white text-lg font-bold">Carregando Radar do PescaView...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-100">
  
      <View className="bg-blue-800 pt-16 pb-4 px-6 rounded-b-3xl shadow-lg z-10">
        <Text className="text-white text-3xl font-extrabold tracking-tight">pescaView</Text>
        <Text className="text-blue-200 text-sm mt-1">Sua rede social de pesca</Text>
      </View>

  
      <View className="flex-1 overflow-hidden">
        <MapView 
          style={{ flex: 1 }} 
          mapStyle="https://demotiles.maplibre.org/style.json" 
        >
          <Camera 
            zoomLevel={12} 
            centerCoordinate={minhaLocalizacao} 
          />


          <PointAnnotation id="eu" coordinate={minhaLocalizacao}>
            <View className="bg-blue-600 h-6 w-6 rounded-full border-2 border-white items-center justify-center shadow-md">
              <View className="bg-white h-2 w-2 rounded-full" />
            </View>
          </PointAnnotation>

         
          {compartilhando && mockPescadores.map((pescador) => (
            <PointAnnotation key={pescador.id} id={pescador.id} coordinate={pescador.coords}>
              <View className="bg-orange-500 h-8 w-8 rounded-full border-2 border-white items-center justify-center shadow-md">
                <Text className="text-white text-xs font-bold">🐟</Text>
              </View>
            </PointAnnotation>
          ))}
        </MapView>
      </View>

    
      <View className="absolute bottom-10 left-5 right-5 bg-white p-5 rounded-2xl shadow-xl flex-row items-center justify-between">
        <View className="flex-1 mr-4">
          <Text className="text-gray-800 font-bold text-lg">Radar de Pescadores</Text>
          <Text className="text-gray-500 text-sm">
            {compartilhando 
              ? "Você está visível. Vendo outros pescadores." 
              : "Ative para ver quem está pescando perto de você."}
          </Text>
        </View>

        <TouchableOpacity 
          onPress={toggleRadar}
          className={`${compartilhando ? 'bg-red-500' : 'bg-green-500'} px-6 py-3 rounded-xl shadow-md`}
        >
          <Text className="text-white font-bold text-base">
            {compartilhando ? 'Ocultar' : 'Transmitir'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}