import 'spinkit/spinkit.css';
import baseLoadable, {
  DefaultComponent,
  LoadableComponent,
  OptionsWithoutResolver,
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

export default function loadable<Props>(
  importFunc: () => Promise<DefaultComponent<Props>>,
  options?: OptionsWithoutResolver<Props>
): LoadableComponent<Props> {
  return baseLoadable(importFunc, {
    fallback: <Spinner />,
    ...options,
  });
}
