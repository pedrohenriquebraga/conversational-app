import { View } from 'react-native';
import Chat from '../../components/Chat';

export default function ChatScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Chat
        messages={[
          {
            id: '123',
            content: 'TEST 123',
            timestamp: new Date(),
            type: 'user',
            isLoading: false,
          },
        ]}
        onSendMessage={() => {}}
        isLoadingResponse={false}
      />
    </View>
  );
}
