'use client';
import { useEffect, useState } from 'react';

export function useCookie() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    }
    
    setUserId(getCookie('userId') || null);
  }, []);

  return {userId};
}
