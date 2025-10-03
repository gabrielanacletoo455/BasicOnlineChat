import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import styles from './styles';
import { Message, User, WebSocketMessage } from './types';

const Index = () => {
  const ws = useRef<WebSocket | null>(null);
  // ADIÇÃO: Referência para o ScrollView
  const scrollViewRef = useRef<ScrollView>(null);

  const [name, setName] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [showModal, setShowModal] = useState(true); 
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para conectar ao WebSocket apenas quando necessário
  const connectToWebSocket = (userName: string) => {
    if (ws.current) {
      ws.current.close();
    }

    const socket = new WebSocket('ws://172.25.9.39:8080');

    socket.onopen = () => {
      console.log('Conectado ao WebSocket');
      // Enviar o formato correto para autenticação
      socket.send(JSON.stringify({ type: 'message', name: userName }));
    };

    socket.onmessage = e => {
      try {
        const data: WebSocketMessage = JSON.parse(e.data);

        // Tratar diferentes tipos de mensagem da API
        switch (data.type) {
          case 'message':
            if (data.text && data.author && data.timestamp) {
              const newMessage: Message = {
                id: data.id || Date.now().toString(),
                text: data.text,
                author: data.author,
                timestamp: data.timestamp,
                createdAt: data.createdAt || Date.now(),
              };
              setMessages(prev => [...prev, newMessage]);
            }
            break;

          case 'recent_messages':
            if (data.messages && Array.isArray(data.messages)) {
              console.log(
                `Carregando ${data.messages.length} mensagens antigas`,
              );
              setMessages(data.messages);
            }
            break;

          case 'users':
            if (data.users) {
              setUsers(data.users);
              setIsAuthenticated(true);
            }
            break;

          case 'welcome':
            console.log('Bem-vindo ao chat!');
            break;
        }
      } catch (error) {
        console.error('Erro ao processar mensagem:', error);
      }
    };

    socket.onerror = error => {
      console.error('Erro no WebSocket:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket desconectado');
      setIsAuthenticated(false);
      setUsers([]);
    };

    ws.current = socket;
  };

  // CORREÇÃO: Função para lidar com o clique no botão "Entrar"
  const handleEnterChat = () => {
    if (name.trim()) {
      setShowModal(false);
      connectToWebSocket(name.trim());
    }
  };

  // CORREÇÃO: Função para enviar mensagem com o protocolo correto
  const handleSendMessage = () => {
    if (inputText.trim() && ws.current && isAuthenticated) {
      // Enviar mensagem para o servidor
      ws.current.send(
        JSON.stringify({
          type: 'message',
          text: inputText.trim(),
        }),
      );

      // Limpar input
      setInputText('');
    }
  };

  // CORREÇÃO: Cleanup apenas quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // ADIÇÃO: Effect para scroll automático quando novas mensagens chegam
  useEffect(() => {
    if (messages.length > 0 && scrollViewRef.current) {
      // Pequeno delay para garantir que o layout foi renderizado
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]); // Executa sempre que o número de mensagens muda

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Modal para digitar o nome */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Digite seu nome</Text>
            <TextInput
              style={styles.modalInput}
              placeholderTextColor="#9CA3AF"
              placeholder="Seu nome..."
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity
              style={[
                styles.modalButton,
                !name.trim() && styles.modalButtonDisabled,
              ]}
              onPress={handleEnterChat}
              disabled={!name.trim()}
            >
              <Text style={styles.modalButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header do Chat */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Chat Online</Text>
          <Text style={styles.headerSubtitle}>
            {users.length} usuário{users.length !== 1 ? 's' : ''} online
          </Text>
        </View>
        <View style={styles.statusIndicator}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isAuthenticated ? '#10B981' : '#EF4444' },
            ]}
          />
          <Text style={styles.statusText}>
            {isAuthenticated ? 'Conectado' : 'Desconectado'}
          </Text>
        </View>
      </View>

      {/* Área de Mensagens - ADIÇÃO: ref={scrollViewRef} */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {isAuthenticated ? 'Inicie uma conversa! 👋' : 'Conectando...'}
            </Text>
          </View>
        ) : (
          messages.map(message => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.author === name
                  ? styles.userMessage
                  : styles.otherMessage,
              ]}
            >
              <Text style={styles.messageAuthor}>
                {message.author === name ? 'Você' : message.author}
              </Text>
              <Text
                style={[
                  styles.messageText,
                  message.author === name
                    ? styles.userMessageText
                    : styles.otherMessageText,
                ]}
              >
                {message.text}
              </Text>
              <Text
                style={[
                  styles.messageTime,
                  message.author === name
                    ? styles.userMessageTime
                    : styles.otherMessageTime,
                ]}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Área de Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#9CA3AF"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            editable={isAuthenticated}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim() && isAuthenticated
                ? styles.sendButtonActive
                : styles.sendButtonInactive,
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || !isAuthenticated}
          >
            <Text style={styles.sendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get('window');

export default Index;
