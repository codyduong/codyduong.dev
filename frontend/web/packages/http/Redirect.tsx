import { useHttp } from 'packages/http/HttpContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectProps {
  to: string;
}

const Redirect = ({ to }: RedirectProps): null => {
  const { setRedirect } = useHttp();
  const navigate = useNavigate();

  setRedirect(to);
  useEffect(() => {
    navigate(to);
  }, []);

  return null;
};

export default Redirect;
