import { useHttp } from 'packages/http/HttpContext';
import NotFound from 'packages/pages/404/NotFound';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectProps {
  to: string;
}

const Redirect = ({ to }: RedirectProps): JSX.Element => {
  const { setRedirect } = useHttp();
  const navigate = useNavigate();

  setRedirect(to);
  useEffect(() => {
    navigate(to, { replace: true });
  }, []);

  return <NotFound />;
};

export default Redirect;
