import 'spinkit/spinkit.css';
import loadable, {
  DefaultComponent,
  LoadableComponent,
} from '@loadable/component';

export function Spinner(): JSX.Element {
  return (
    <div className="sk-circle">
      <div className="sk-circle-dot"></div>
      <div className="sk-circle-dot"></div>
      <div className="sk-circle-dot"></div>
      <div className="sk-circle-dot"></div>
      <div className="sk-circle-dot"></div>
      <div className="sk-circle-dot"></div>
      <div className="sk-circle-dot"></div>
      <div className="sk-circle-dot"></div>
      <div className="sk-circle-dot"></div>
      <div className="sk-circle-dot"></div>
      <div className="sk-circle-dot"></div>
      <div className="sk-circle-dot"></div>
    </div>
  );
}

export default function SpinkitLoadable<Props>(
  imported: Promise<DefaultComponent<Props>>
): LoadableComponent<Props> {
  return loadable(() => imported, {
    fallback: <Spinner />,
  });
}
