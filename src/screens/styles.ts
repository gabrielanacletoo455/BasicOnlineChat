import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8FAFC',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      padding: 24,
      borderRadius: 12,
      alignItems: 'center',
    },
    modalTitle: { 
      fontSize: 18, 
      marginBottom: 12, 
      fontWeight: '600' 
    },
    modalInput: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
    },
    modalButton: {
      backgroundColor: '#3B82F6',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    modalButtonDisabled: {
      backgroundColor: '#D1D5DB',
    },
    modalButtonText: { 
      color: '#fff', 
      fontWeight: '600' 
    },
    
    // Header Styles
    header: {
      backgroundColor: '#3B82F6',
      paddingTop: 50,
      paddingBottom: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    headerSubtitle: {
      fontSize: 12,
      color: '#E5E7EB',
      marginTop: 2,
    },
    statusIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 6,
    },
    statusText: {
      fontSize: 12,
      color: '#E5E7EB',
      fontWeight: '500',
    },
  
    // Messages Container
    messagesContainer: {
      flex: 1,
      backgroundColor: '#F8FAFC',
    },
    messagesContent: {
      padding: 16,
      paddingBottom: 20,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyStateText: {
      fontSize: 16,
      color: '#6B7280',
      textAlign: 'center',
    },
  
    // Message Bubbles
    messageBubble: {
      width: '80%',
      marginVertical: 4,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#3B82F6',
      borderBottomRightRadius: 4,
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#FFFFFF',
      borderBottomLeftRadius: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    messageAuthor: {
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 4,
      opacity: 0.8,
    },
    messageText: {
      fontSize: 16,
      lineHeight: 20,
    },
    userMessageText: {
      color: '#FFFFFF',
    },
    otherMessageText: {
      color: '#1F2937',
    },
    messageTime: {
      fontSize: 11,
      marginTop: 4,
      opacity: 0.7,
    },
    userMessageTime: {
      color: '#E5E7EB',
      textAlign: 'right',
    },
    otherMessageTime: {
      color: '#6B7280',
    },
  
    // Input Area
    inputContainer: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
      paddingBottom: 20,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      backgroundColor: '#F3F4F6',
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: 8,
      minHeight: 48,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: '#1F2937',
      maxHeight: 100,
      paddingVertical: 8,
    },
    sendButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
    sendButtonActive: {
      backgroundColor: '#3B82F6',
    },
    sendButtonInactive: {
      backgroundColor: '#D1D5DB',
    },
    sendButtonText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '600',
    },
  });

  export default styles;