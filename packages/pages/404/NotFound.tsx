import { Link } from 'react-router-dom';

export default function NotFound(): JSX.Element {
  return (
    <div>
      <p>There is nothing here</p>
      <Link to={'./'}>link</Link>
    </div>
  );
}
