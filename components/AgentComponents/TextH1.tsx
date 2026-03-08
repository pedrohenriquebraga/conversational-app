import { Text } from 'react-native';

export const TextH1 = ({children}: {children: React.ReactNode}) => {
  return (
    <Text
      style={{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
      }}>
      {children}
    </Text>
  );
};
