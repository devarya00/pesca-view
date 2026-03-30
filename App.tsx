import './global.css';
import { useState } from 'react';
import { View } from 'react-native';

// Importando nossos 3 componentes limpos
import { Header } from './src/components/Header';
import { RadarControl } from './src/components/RadarControl';
import { FishingMap } from './src/components/MapStyle';

export default function App() {
  const [compartilhando, setCompartilhando] = useState(false);

  // Coordenadas falsas (Mock) para testarmos o visual
  const minhaLocalizacao: [number, number] = [-46.633308, -23.550520]; 
  const mockPescadores = [
    { id: '1', coords: [-46.635000, -23.551000] as [number, number] },
    { id: '2', coords: [-46.631000, -23.549000] as [number, number] },
    { id: '3', coords: [-46.638000, -23.553000] as [number, number] },
  ];

  return (
    <View className="flex-1 bg-gray-100">
      
      <Header />

      <FishingMap 
        minhaLocalizacao={minhaLocalizacao}
        mockPescadores={mockPescadores}
        compartilhando={compartilhando}
      />

      <RadarControl 
        compartilhando={compartilhando} 
        onToggle={() => setCompartilhando(!compartilhando)} 
      />

    </View>
  );
}