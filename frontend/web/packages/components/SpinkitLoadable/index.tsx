import 'spinkit/spinkit.css';
import baseLoadable, {
  DefaultComponent,
  LoadableComponent,
  OptionsWithoutResolver,
  OptionsWithResolver,
} from '@loadable/component';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Spinner(): JSX.Element {
  return (
    <SpinnerWrapper>
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
    </SpinnerWrapper>
  );
}

const loadable = ((
  importFunc: (props: unknown) => Promise<DefaultComponent<unknown>>,
  options: OptionsWithResolver<unknown, DefaultComponent<unknown>>
) => {
  return baseLoadable(importFunc, {
    fallback: <Spinner />,
    ...options,
  });
}) as typeof baseLoadable;

export default loadable;
