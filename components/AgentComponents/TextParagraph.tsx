import { Text, TextStyle } from 'react-native';

export const TextParagraph = ({children, style}: {children: React.ReactNode, style?: TextStyle}) => {
  return (
    <Text
      style={{
        fontSize: 14,
        marginBottom: 12,
        ...style
      }}>
      {children}
    </Text>
  );
}
