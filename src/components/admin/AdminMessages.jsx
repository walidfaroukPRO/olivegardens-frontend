import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { 
  FaEnvelope, FaEnvelopeOpen, FaTrash, FaReply, FaSearch,
  FaUser, FaBuilding, FaClock, FaCheck, FaTimes 
} from 'react-icons/fa';

const AdminMessages = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/contact/');
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
await axios.patch(`/api/contact/${id}/status`, { status: 'replied' });
      fetchMessages();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) {
      try {
await axios.delete(`/api/contact/${id}`);
        setSelectedMessage(null);
        fetchMessages();
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`/api/contact/messages/${selectedMessage._id}/reply`, {
        replyText
      });
      
      alert(lang === 'ar' ? 'تم إرسال الرد بنجاح!' : 'Reply sent successfully!');
      setShowReplyModal(false);
      setReplyText('');
      fetchMessages();
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert(lang === 'ar' ? 'فشل إرسال الرد' : 'Failed to send reply');
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'read' && message.isRead) ||
      (filterStatus === 'unread' && !message.isRead) ||
      (filterStatus === 'replied' && message.isReplied);
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={lang === 'ar' ? 'بحث في الرسائل...' : 'Search messages...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
        >
          <option value="all">{lang === 'ar' ? 'الكل' : 'All Messages'}</option>
          <option value="unread">{lang === 'ar' ? 'غير مقروءة' : 'Unread'}</option>
          <option value="read">{lang === 'ar' ? 'مقروءة' : 'Read'}</option>
          <option value="replied">{lang === 'ar' ? 'تم الرد' : 'Replied'}</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-4 max-h-[600px] overflow-y-auto">
          <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">
            {lang === 'ar' ? 'الرسائل' : 'Messages'} ({filteredMessages.length})
          </h3>
          
          <div className="space-y-2">
            {filteredMessages.map((message) => (
              <div
                key={message._id}
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.isRead) handleMarkAsRead(message._id);
                }}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedMessage?._id === message._id
                    ? 'bg-primary text-white'
                    : message.isRead
                    ? 'bg-gray-50 hover:bg-gray-100'
                    : 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {message.isRead ? (
                      <FaEnvelopeOpen className="text-gray-400" />
                    ) : (
                      <FaEnvelope className="text-blue-500" />
                    )}
                    <span className="font-semibold text-sm truncate">
                      {message.name}
                    </span>
                  </div>
                  {message.isReplied && (
                    <FaCheck className="text-green-500 flex-shrink-0" />
                  )}
                </div>
                
                <div className="text-sm font-medium mb-1 truncate">
                  {message.subject}
                </div>
                
                <div className="text-xs opacity-75 flex items-center gap-2">
                  <FaClock />
                  {formatDate(message.createdAt)}
                </div>
              </div>
            ))}
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FaEnvelope className="text-5xl mx-auto mb-4 opacity-30" />
              <p>{lang === 'ar' ? 'لا توجد رسائل' : 'No messages found'}</p>
            </div>
          )}
        </div>

        {/* Message Details */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-dark text-white p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-4 text-sm opacity-90">
                      <div className="flex items-center gap-2">
                        <FaClock />
                        {formatDate(selectedMessage.createdAt)}
                      </div>
                      {selectedMessage.isReplied && (
                        <div className="flex items-center gap-2 bg-green-500/30 px-3 py-1 rounded-full">
                          <FaCheck />
                          {lang === 'ar' ? 'تم الرد' : 'Replied'}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowReplyModal(true)}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      title={lang === 'ar' ? 'رد' : 'Reply'}
                    >
                      <FaReply />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage._id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                      title={lang === 'ar' ? 'حذف' : 'Delete'}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sender Info */}
              <div className="p-6 border-b bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {selectedMessage.userType === 'company' ? <FaBuilding className="text-primary" /> : <FaUser className="text-primary" />}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{selectedMessage.name}</div>
                      <div className="text-sm text-gray-600">{selectedMessage.email}</div>
                    </div>
                  </div>
                  
                  {selectedMessage.company && (
                    <div>
                      <div className="text-sm text-gray-600">{lang === 'ar' ? 'الشركة:' : 'Company:'}</div>
                      <div className="font-semibold text-gray-800">{selectedMessage.company}</div>
                    </div>
                  )}
                  
                  {selectedMessage.phone && (
                    <div>
                      <div className="text-sm text-gray-600">{lang === 'ar' ? 'الهاتف:' : 'Phone:'}</div>
                      <div className="font-semibold text-gray-800">{selectedMessage.phone}</div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-sm text-gray-600">{lang === 'ar' ? 'نوع الاستفسار:' : 'Inquiry Type:'}</div>
                    <div className="font-semibold text-gray-800 capitalize">{selectedMessage.inquiryType}</div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {lang === 'ar' ? 'الرسالة:' : 'Message:'}
                </h3>
                <div className="bg-gray-50 rounded-xl p-6 text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Previous Replies */}
              {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                <div className="p-6 border-t bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {lang === 'ar' ? 'الردود السابقة:' : 'Previous Replies:'}
                  </h3>
                  <div className="space-y-4">
                    {selectedMessage.replies.map((reply, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 shadow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-primary">
                            {lang === 'ar' ? 'مسؤول' : 'Admin'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(reply.sentAt)}
                          </span>
                        </div>
                        <p className="text-gray-700">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <FaEnvelope className="text-6xl mx-auto mb-4 opacity-30" />
                <p className="text-lg">{lang === 'ar' ? 'اختر رسالة لعرضها' : 'Select a message to view'}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-primary to-dark text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">
                {lang === 'ar' ? 'الرد على الرسالة' : 'Reply to Message'}
              </h2>
              <p className="text-sm opacity-90 mt-1">
                {lang === 'ar' ? 'إلى:' : 'To:'} {selectedMessage.email}
              </p>
            </div>

            <form onSubmit={handleSendReply} className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {lang === 'ar' ? 'الرد:' : 'Reply:'}
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  required
                  rows="10"
                  placeholder={lang === 'ar' ? 'اكتب ردك هنا...' : 'Write your reply here...'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-dark text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <FaReply />
                  {lang === 'ar' ? 'إرسال الرد' : 'Send Reply'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReplyModal(false);
                    setReplyText('');
                  }}
                  className="flex-1 py-3 bg-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-400 transition-all flex items-center justify-center gap-2"
                >
                  <FaTimes />
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;