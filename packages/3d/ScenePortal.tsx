/**
 * This component can be used to link a object on the canvas to a div somewhere else.
 */
export type ScenePortalProps =
  | {
      children: React.ReactNode;
      linkedRef: any;
      linkedClass: undefined;
    }
  | {
      children: React.ReactNode;
      linkedRef: undefined;
      linkedClass: string;
    };

export function ScenePortal(props: ScenePortalProps): React.ReactNode {
  const { children, linkedRef, linkedClass } = props;

  const thisLink = linkedRef ?? document.querySelector(`#${linkedClass}`);

  return props.children;
}
