import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { TextParagraph } from './TextParagraph';

export const TextList = ({items}: {items: {text: string, style?: TextStyle}[]}) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={new Date().getTime() + index} style={styles.itemContainer}>
          <Text style={styles.bulletPoint}>{'\u2022'}</Text>
          <TextParagraph style={{...styles.itemText, ...item.style}}>{item.text}</TextParagraph>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    marginRight: 8,
    lineHeight: 20,
  },
  itemText: {
    flex: 1,
    lineHeight: 20,
  },
});
