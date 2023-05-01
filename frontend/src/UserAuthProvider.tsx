import { createContext, useContext, useState, useEffect } from 'react';

interface UserAuthContextType {
  accessToken: { token: string; expiryTime: Date } | null;
  setAccessToken: (token: { token: string; expiryTime: Date } | null) => void;
  userInfo: { name: string; picture: string; email: string } | null;
  setUserInfo: (
    info: { name: string; picture: string; email: string } | null
  ) => void;
}

const UserAuthContext = createContext<UserAuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
  userInfo: null,
  setUserInfo: () => {},
});

export const useUserAuthContext = () => {
  return useContext(UserAuthContext);
};

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<{
    token: string;
    expiryTime: Date;
  } | null>(JSON.parse(localStorage.getItem('access_token') || 'null'));
  const [userInfo, setUserInfo] = useState<{
    name: string;
    picture: string;
    email: string;
  } | null>(JSON.parse(localStorage.getItem('user_info') || 'null'));

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access_token', JSON.stringify(accessToken));
    } else {
      localStorage.removeItem('access_token');
    }
  }, [accessToken]);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('user_info', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('user_info');
    }
  }, [userInfo]);

  return (
    <UserAuthContext.Provider
      value={{ accessToken, setAccessToken, userInfo, setUserInfo }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
