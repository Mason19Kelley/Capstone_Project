import { useState } from 'react';

export const useAuthState = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return { user, setUser, password, setPassword };
};
