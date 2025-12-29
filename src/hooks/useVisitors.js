import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useVisitors = () => {
  const [visitors, setVisitors] = useState({
    total: 0,
    pages: {}
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('✅ Connected to visitor tracking');
      setIsConnected(true);
    });

    socket.on('visitors-update', (data) => {
      setVisitors(data);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from visitor tracking');
      setIsConnected(false);
    });

    // Track current page
    const currentPage = window.location.pathname;
    socket.emit('page-visit', currentPage);

    return () => {
      socket.disconnect();
    };
  }, []);

  return { visitors, isConnected };
};