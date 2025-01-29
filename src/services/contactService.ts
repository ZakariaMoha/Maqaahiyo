export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  dateSubmitted: string;
  status: 'new' | 'read' | 'replied';
}

const CONTACT_MESSAGES_KEY = 'rcs_contact_messages';

// Get all contact messages
export const getContactMessages = (): ContactMessage[] => {
  const messages = localStorage.getItem(CONTACT_MESSAGES_KEY);
  return messages ? JSON.parse(messages) : [];
};

// Save contact messages
export const saveContactMessages = (messages: ContactMessage[]): void => {
  localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(messages));
};

// Add a new contact message
export const addContactMessage = (message: Omit<ContactMessage, 'id' | 'dateSubmitted' | 'status'>): void => {
  const messages = getContactMessages();
  const newMessage: ContactMessage = {
    ...message,
    id: Date.now().toString(),
    dateSubmitted: new Date().toISOString(),
    status: 'new'
  };
  messages.push(newMessage);
  saveContactMessages(messages);
};

// Update message status
export const updateMessageStatus = (id: string, status: ContactMessage['status']): void => {
  const messages = getContactMessages();
  const index = messages.findIndex(msg => msg.id === id);
  if (index !== -1) {
    messages[index].status = status;
    saveContactMessages(messages);
  }
};

// Delete a message
export const deleteContactMessage = (id: string): void => {
  const messages = getContactMessages();
  const filteredMessages = messages.filter(msg => msg.id !== id);
  saveContactMessages(filteredMessages);
};
