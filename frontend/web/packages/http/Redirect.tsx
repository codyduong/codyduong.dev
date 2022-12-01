import { useHttp } from 'packages/http/HttpContext';

interface RedirectProps {
  to: string;
}

const Redirect = ({ to }: RedirectProps): null => {
  const { setRedirect } = useHttp();

  setRedirect(to);

  return null;
};

export default Redirect;
