import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todo');
    } else {
      navigate('/login');
    }
  });

  // return <div>HomePage</div>;
};

export default HomePage;
