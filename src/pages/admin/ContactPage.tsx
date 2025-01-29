import React, { useState, useEffect } from 'react';
import { FiPhone, FiUser, FiMessageSquare, FiTrash2, FiSearch, FiCalendar, FiPhoneCall, FiMessageCircle } from 'react-icons/fi';
import { ContactMessage, getContactMessages, updateMessageStatus, deleteContactMessage } from '../../services/contactService';
import Swal from 'sweetalert2';

const ContactPage: React.FC = () => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    const loadedContacts = getContactMessages();
    setContacts(loadedContacts);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      deleteContactMessage(id);
      loadContacts();
      Swal.fire(
        'Deleted!',
        'The message has been deleted.',
        'success'
      );
    }
  };

  const handleStatusChange = (id: string, status: ContactMessage['status']) => {
    updateMessageStatus(id, status);
    loadContacts();
  };

  const handleSendSMS = async (contact: ContactMessage) => {
    const { value: confirmed } = await Swal.fire({
      title: 'Send SMS Reply',
      html: `
        <div class="mb-4">
          <p class="text-left text-sm text-gray-600 mb-2">To: ${contact.name} (${contact.phone})</p>
          <hr class="my-2">
          <p class="text-left text-sm text-gray-600 mb-2">Original Message:</p>
          <p class="text-left text-sm text-gray-700 bg-gray-50 p-2 rounded">${contact.message}</p>
        </div>
        <textarea id="smsContent" class="w-full p-2 border rounded" 
          rows="4" placeholder="Type your SMS reply here..."
        >${getDefaultSMS(contact.name)}</textarea>
      `,
      showCancelButton: true,
      confirmButtonText: 'Send SMS',
      confirmButtonColor: '#10B981',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const content = (document.getElementById('smsContent') as HTMLTextAreaElement).value;
        if (!content.trim()) {
          Swal.showValidationMessage('Please enter a message');
          return false;
        }
        return content;
      },
      width: '600px'
    });

    if (confirmed) {
      try {
        // Here you would typically integrate with an SMS service
        // For now, we'll just open the default SMS app
        window.open(`sms:${contact.phone}?body=${encodeURIComponent(confirmed)}`);
        await handleStatusChange(contact.id, 'replied');
        
        Swal.fire(
          'SMS App Opened!',
          'Please send your message through your default SMS app.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error',
          'Failed to open SMS app. Please try again.',
          'error'
        );
      }
    }
  };

  const handleCall = (contact: ContactMessage) => {
    window.open(`tel:${contact.phone}`);
  };

  const getDefaultSMS = (name: string) => {
    return `Hi ${name}, thank you for contacting Jifora Cafe. `;
  };

  const filteredContacts = contacts
    .filter(contact => {
      const matchesSearch = 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = !dateFilter || contact.dateSubmitted.split('T')[0] === dateFilter;
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      return matchesSearch && matchesDate && matchesStatus;
    })
    .sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime());

  const newCount = contacts.filter(contact => contact.status === 'new').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Contact Messages</h2>
          {newCount > 0 && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {newCount} new message{newCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'new' | 'read' | 'replied')}
            >
              <option value="all">All Messages</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredContacts.map(contact => (
            <div 
              key={contact.id} 
              className={`bg-white rounded-lg shadow-sm border p-6 transition-colors ${
                contact.status === 'new' ? 'border-green-200 bg-green-50' :
                contact.status === 'read' ? 'border-gray-100' :
                'border-blue-100 bg-blue-50'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <FiUser className="text-gray-400" />
                      <span className="font-medium text-gray-900">{contact.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        contact.status === 'new' ? 'bg-green-100 text-green-800' :
                        contact.status === 'read' ? 'bg-gray-100 text-gray-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <FiPhone className="text-gray-400" />
                      <a href={`tel:${contact.phone}`} className="hover:text-green-600">
                        {contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <span className="font-medium">Subject:</span>
                      <span>{contact.subject}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500 flex items-center">
                    <FiCalendar className="mr-2" />
                    {new Date(contact.dateSubmitted).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => handleCall(contact)}
                    className="text-green-600 hover:text-green-700 transition-colors"
                    title="Call"
                  >
                    <FiPhoneCall />
                  </button>
                  <button
                    onClick={() => handleSendSMS(contact)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    title="Send SMS"
                  >
                    <FiMessageCircle />
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <div className="flex items-start space-x-2 text-gray-700">
                <FiMessageSquare className="text-gray-400 mt-1 flex-shrink-0" />
                <p className="whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>
          ))}

          {filteredContacts.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No messages found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || dateFilter || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'No contact messages yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
