import { View, Text } from 'react-native';

export function Header() {
  return (
    <View className="bg-blue-600 pt-14 pb-4 px-4 shadow-md rounded-2xl">
      <Text className="text-white text-2xl font-bold">pescaView</Text>
      <Text className="text-blue-200 text-sm">Sua rede social de pesca</Text>
    </View>
  );
}