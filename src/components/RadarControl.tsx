import { View, Text, TouchableOpacity } from 'react-native';

interface RadarControlProps {
  compartilhando: boolean;
  onToggle: () => void;
}

export function RadarControl({ compartilhando, onToggle }: RadarControlProps) {
  return (
    <View className="p-4 bg-white border-t border-gray-200 shadow-lg">
      <Text className="text-lg font-bold mb-1 text-gray-800">Radar de Pescadores</Text>
      <Text className="text-sm text-gray-500 mb-4">
        Ative para ver quem está pescando perto de você.
      </Text>
      
      <TouchableOpacity 
        onPress={onToggle}
        className={`py-3 rounded-lg items-center ${compartilhando ? 'bg-red-500' : 'bg-green-500'}`}
      >
        <Text className="text-white font-bold text-lg">
          {compartilhando ? 'Ocultar' : 'Transmitir'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}