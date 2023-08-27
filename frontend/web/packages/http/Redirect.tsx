import { useHttp } from 'packages/http/HttpContext';
import NotFound from 'packages/pages/404/NotFound';
import { useEffect } from 'react';
import {
  generatePath,
  Route,
  RouteProps,
  Routes,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';

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

const RedirectRoutes = ({ to }: RedirectProps): JSX.Element => {
  const { setRedirect } = useHttp();
  const navigate = useNavigate();
  const params = useParams();

  const redirect = generatePath(to, params);

  setRedirect(redirect);
  useEffect(() => {
    navigate(redirect, { replace: true });
  }, []);

  return (
    <Routes>
      <Route path={'/'} element={<NotFound />} />
      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
};

export default Object.assign(Redirect, {
  Routes: RedirectRoutes,
});
