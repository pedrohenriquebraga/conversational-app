import { View } from 'react-native';
import { TextH1 } from './TextH1';
import { TextList } from './TextList';
import { TextParagraph } from './TextParagraph';

export const AgentComponents = {
  TextH1,
  TextParagraph,
  TextList,
};

export const AgentComponentRenderer = ({id, components}: {id: string, components: React.ReactNode[]}) => {
  return (
    <>
      {components.map((component, index) => (
        <View key={`${id}-${index}`} style={{marginBottom: 16}}>
          {component}
        </View>
      ))}
    </>
  );
}
