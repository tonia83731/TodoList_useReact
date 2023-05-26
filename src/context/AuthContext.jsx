import { login, register, checkPermission } from 'api/auth';
import { createContext, useState, useEffect, useContext } from 'react';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

const defaultAuthContext = {
  // user是否登入判斷 (取得後端有效憑證)
  isAuthenticated: false,
  // user資料 (登入後顯示user資料)
  currentMember: null,
  // 註冊方法
  register: null,
  //登入方法
  login: null,
  //登出方法
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      // 若authToken不存在 身分驗證失敗(不存在)
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      // 若authToken存在 呼叫checkPermission(authToken)
      const result = await checkPermission(authToken);
      
      if (result) {
        // authToken有效
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else{
        // authToken無效
        setIsAuthenticated(false);
        setPayload(null);
      }
    };

    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
        register: async (data) => {
          const { success, authToken } = await register({
            username: data.username,
            email: data.email,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        login: async (data) => {
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
