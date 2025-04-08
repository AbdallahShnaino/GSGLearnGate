'use client';
import { useEffect, useState } from 'react';

export function useCookie() {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  
  useEffect(() => {
    function getCookie(name: string) {
      // More robust cookie parsing
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
      return null;
    }
    
    // Try common token cookie names
    const authToken = getCookie('token') || 
                     getCookie('access_token') || 
                     getCookie('auth_token') ||
                     getCookie('jwt');
    
    setUserId(getCookie('userId'));
    setToken(authToken);
    setEmail(getCookie('email'));
    setRole(getCookie('role'));

    // Add debug logging
    console.log('Cookies:', {
      allCookies: document.cookie,
      userId: getCookie('userId'),
      token: authToken,
      email: getCookie('email'),
      role: getCookie('role')
    });

  }, []);

  return {userId, token, email, role};
}