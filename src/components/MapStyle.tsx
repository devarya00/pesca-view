import { View, Text } from 'react-native';
import { MapView, Camera, PointAnnotation } from '@maplibre/maplibre-react-native';

interface Pescador {
  id: string;
  coords: [number, number];
}

interface FishingMapProps {
  minhaLocalizacao: [number, number];
  mockPescadores: Pescador[];
  compartilhando: boolean;
}

export function FishingMap({ minhaLocalizacao, mockPescadores, compartilhando }: FishingMapProps) {
  return (
    <View className="flex-1 overflow-hidden">
      <MapView 
        style={{ flex: 1 }} 
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json" 
      >
        <Camera 
          zoomLevel={12} 
          centerCoordinate={minhaLocalizacao} 
        />

        <PointAnnotation id="eu" coordinate={minhaLocalizacao}>
          <View className="bg-blue-500 h-6 w-6 rounded-full border-2 border-white items-center justify-center shadow-md">
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
  );
}