'use client';
import { useAuth } from '@clerk/nextjs';
import { createContext, useContext, useEffect, useState } from 'react';

import { getUserInfo } from '@/lib/actions/user.actions';

import { IUser } from '@/app/database/user.model';

const UserContext = createContext<{
  userInfo: IUser | null;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser | null>>;
} | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    async function fetchUserInfo() {
      const user = await getUserInfo({ userId: userId || '' });

      if (user) {
        setUserInfo(user);
      }
    }
    fetchUserInfo();
  }, [userId]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
};
