import { Text, TextStyle } from 'react-native';

export const TextH1 = ({children, style}: {children: React.ReactNode, style?: TextStyle}) => {
  return (
    <Text
      style={{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        ...style
      }}>
      {children}
    </Text>
  );
};
