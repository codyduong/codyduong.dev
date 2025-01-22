// import { useState, useEffect, useRef } from 'react';
// import Modal, { ModalFlat } from './Modal';
// import { ComponentStory, Meta } from '@storybook/react';
// // import { withDesign } from 'storybook-addon-designs';
// import Button from '../Button';
// import T from '../Typography';
// import styled from 'styled-components';
// // import Checkbox from '../CheckBox/StandardCheckBox';
// import classnames from 'classnames';
// // import theme from '../../../styles/theme';
// // import MultiToggle, { ToggleOption } from '../Toggle/MultiToggle';
// // import { ControlledSlider } from '../Slider/Slider';

// export default {
//   title: 'Components/Modals',
//   component: Modal,
//   decorators: undefined,
//   parameters: {
//     controls: { sort: 'none' },
//   },
// } as Meta;

// const ModalStoryWrapper = styled.div`
//   color: ${({ theme }) => theme.color.text[400]};
// `;

// const ModalContentItem = styled.div`
//   border-radius: 8px;
//   box-sizing: border-box;

//   display: flex;
//   align-self: stretch;

//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;

//   width: 100%;
//   height: 96px;
//   border: 1px dashed #ffa600;
//   border-radius: 8px;

//   ${T.Paragraph.P2.bold.css}
//   color: #ffa600;
// `;

// const ModalContentItemFiller = (): React.JSX.Element => (
//   <ModalContentItem>CONTENT SLOT</ModalContentItem>
// );

// const ModalFlatDisplay = styled.div`
//   display: grid;
//   grid-template-columns: 320px 420px 600px;
//   grid-template-rows: auto;
//   gap: 24px;
//   margin-bottom: 48px;
//   & > div {
//     flex: 1;
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   flex-flow: column nowrap;
//   gap: 16px;
//   margin-bottom: 48px;
// `;

// const ModalDisplay = styled.div`
//   position: relative;
//   width: 750px;
//   height: 750px;
//   border: 1px solid black;
//   transition: width 0.5s ease-in-out 0s;
//   padding: 16px;
//   overflow: scroll;
//   @keyframes animate-width {
//     0% {
//       width: 1000px;
//     }
//     50% {
//       width: 200px;
//     }
//     100% {
//       width: 1000px;
//     }
//   }
//   animation-play-state: paused;

//   &.modal-display-animate {
//     animation: 5s infinite animate-width ease-in-out forwards;
//     animation-play-state: running;
//   }
// `;

// const ContentGrid = styled.div`
//   display: grid;
//   width: 100%;
//   grid-template-columns: repeat(auto-fill, 214px);
//   grid-gap: 16px 24px;
// `;

// const SliderGroupAndCheckbox = styled.div`
//   display: flex;
//   flex-flow: row nowrap;
//   margin: 24px 0px;
//   gap: 16px;

//   div:last-child {
//     margin-top: 16px;
//   }
// `;

// const SliderGroup = styled.div`
//   padding: 8px 24px 16px;
//   border-radius: 4px;

//   &.disabled {
//     background-color: #e9e9e9;
//     cursor: not-allowed;
//   }
// `;

// export const Modals: ComponentStory<typeof Modal> = () => {
//   const [open, setOpen] = useState<Record<number | string, boolean>>({});

//   const setOpenName = (n: number | string, b?: boolean) => {
//     setOpen({
//       ...open,
//       [n]: b ?? !open[n],
//     });
//   };

//   const modalSizeOptions = [
//     { value: 'small', label: 'Small' },
//     { value: 'medium', label: 'Medium' },
//     { value: 'large', label: 'Large' },
//   ] as const;

//   const [modalSize, setModalSize] =
//     useState<(typeof modalSizeOptions)[number]['value']>('small');

//   const modalDisplayClassNames = classnames('modal-display', {
//     ['modal-display-animate']: open['Animate Box Size'],
//   });
//   const [boxWidth, setBoxWidth] = useState(750);
//   const refPortal1 = useRef<HTMLDivElement>(null);

//   return (
//     <ModalStoryWrapper>
//       <T.H1>Modal</T.H1>
//       <T.H2>Modal Sizes</T.H2>
//       <ModalFlatDisplay>
//         <div>
//           <T.H4>Small</T.H4>
//           <ModalFlat>
//             <Modal.Heading>Heading</Modal.Heading>
//             <Modal.Content>
//               <ModalContentItemFiller />
//               <ModalContentItemFiller />
//               <ModalContentItemFiller />
//             </Modal.Content>
//             <Modal.Footer.Default />
//           </ModalFlat>
//         </div>
//         <div>
//           <T.H4>Medium</T.H4>
//           <ModalFlat size="medium">
//             <Modal.Heading>Heading</Modal.Heading>
//             <Modal.Content>
//               <ModalContentItemFiller />
//               <ModalContentItemFiller />
//               <ModalContentItemFiller />
//             </Modal.Content>
//             <Modal.Footer.Default />
//           </ModalFlat>
//         </div>
//         <div>
//           <T.H4>Large</T.H4>
//           <ModalFlat size="large">
//             <Modal.Heading>Heading</Modal.Heading>
//             <Modal.Content>
//               <ContentGrid>
//                 <ModalContentItemFiller />
//                 <div />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//               </ContentGrid>
//             </Modal.Content>
//             <Modal.Footer.Default />
//           </ModalFlat>
//         </div>
//       </ModalFlatDisplay>
//       <T.H3>Persistent/Non-Persistent Modals</T.H3>
//       <ButtonGroup>
//         {/* <Checkbox
//           label="Toggle Persistence"
//           onChange={() => setOpenName('persistence')}
//           checked={open['persistence'] ?? false}
//         /> */}
//         <Button onClick={() => setOpenName('persistence_modal')}>
//           Toggle Persistent Modal
//         </Button>
//       </ButtonGroup>
//       <Modal
//         open={open['persistence_modal']}
//         onClose={() => setOpenName('persistence_modal', false)}
//         size={modalSize}
//         persist={open['persistence']}
//         foo={'It can take in props from the modal component if needed'}
//       >
//         {function InnerModal({ foo }) {
//           const [value, setValue] = useState('');
//           return (
//             <>
//               <Modal.Heading>Persistent/Non-Persistent Modals</Modal.Heading>
//               <Modal.Content>
//                 <T.P2>
//                   The easiest way to use this is to construct a named/anonymous
//                   component as the child to allow Modal to handle state. It does
//                   take in props.
//                   <br />
//                   <br />
//                   {foo}
//                 </T.P2>
//                 <input
//                   value={value}
//                   onChange={(e) => {
//                     setValue(e.target.value);
//                   }}
//                 />
//               </Modal.Content>
//             </>
//           );
//         }}
//       </Modal>
//       <T.H3>Custom Footers</T.H3>
//       <T.P2>
//         View the various supported patterns in <code>Modal.stories.tsx</code>
//       </T.P2>
//       <ButtonGroup>
//         <Button
//           // icon={Icons.IconFullscreen}
//           onClick={() => setOpenName(-100)}
//         >
//           Toggle Footer w/ Button Elements
//         </Button>
//         <Button
//           // icon={Icons.IconFullscreen}
//           onClick={() => setOpenName(-99)}
//         >
//           Toggle Footer w/ Button Props in Array
//         </Button>
//       </ButtonGroup>

//       <Modal
//         open={open[-100]}
//         onClose={() => setOpenName(-100, false)}
//         size={modalSize}
//       >
//         {function t() {
//           useEffect(() => {
//             return () => {
//               setModalSize(modalSize);
//             };
//           }, []);

//           return (
//             <>
//               <Modal.Heading>Footer w/ Button Elements</Modal.Heading>
//               <Modal.Content>
//                 <T.P2>See how the footer changes depending on modal size.</T.P2>
//                 {/* <MultiToggle
//                   value={modalSize}
//                   onToggle={(item: ToggleOption) => {
//                     setModalSize(item.value);
//                   }}
//                   toggleItems={modalSizeOptions}
//                 /> */}
//               </Modal.Content>
//               <Modal.Footer>
//                 <Button hierarchy="secondary">Cancel</Button>
//                 <Button action="destructive">Explode</Button>
//                 <Button>Submit</Button>
//               </Modal.Footer>
//             </>
//           );
//         }}
//       </Modal>
//       <Modal
//         open={open[-99]}
//         onClose={() => setOpenName(-99, false)}
//         size={modalSize}
//         heading="Footer w/ Button Props in Array"
//         content={() => {
//           useEffect(() => {
//             return () => {
//               setModalSize(modalSize);
//             };
//           }, []);

//           return (
//             <>
//               <T.P2>See how the footer changes depending on modal size.</T.P2>
//               {/* <MultiToggle
//                 value={modalSize}
//                 onToggle={(item: ToggleOption) => {
//                   setModalSize(item.value);
//                 }}
//                 toggleItems={modalSizeOptions}
//               /> */}
//             </>
//           );
//         }}
//         footer={[
//           { children: 'cancel', hierarchy: 'secondary' },
//           { children: 'explode', action: 'destructive' },
//           { children: 'LONGER BUTTON TEXT' },
//         ]}
//       />
//       <T.H3>Responsive Visibility</T.H3>
//       <T.P2>
//         Test Modal content visibility under varying device widths with the
//         slider or checkbox below
//       </T.P2>
//       <SliderGroupAndCheckbox>
//         <SliderGroup
//           className={open['Animate Box Size'] ? 'disabled' : undefined}
//         >
//           <T.P2>Box Width</T.P2>
//           <T.P2>{boxWidth}</T.P2>
//           {/* <ControlledSlider
//             width="320px"
//             min={200}
//             max={1000}
//             label="Box Width"
//             value={boxWidth}
//             onEveryChange={(v) => {
//               setBoxWidth(v);
//             }}
//             disabled={open['Animate Box Size']}
//           /> */}
//         </SliderGroup>
//         {/* <Checkbox
//           label="Toggle Animate Box Size"
//           onChange={() => setOpenName('Animate Box Size')}
//           checked={open['Animate Box Size'] ?? false}
//         /> */}
//       </SliderGroupAndCheckbox>

//       <ModalDisplay
//         ref={refPortal1}
//         className={modalDisplayClassNames}
//         style={{ width: `${boxWidth}px` }}
//       >
//         <ButtonGroup>
//           <Button
//             // icon={Icons.IconFullscreen}
//             onClick={() => setOpenName(0)}
//           >
//             Toggle Modal Small
//           </Button>
//           <Button
//             // icon={Icons.IconFullscreen}
//             onClick={() => setOpenName(1)}
//           >
//             Toggle Modal Medium
//           </Button>
//           <Button
//             // icon={Icons.IconFullscreen}
//             onClick={() => setOpenName(2)}
//           >
//             Toggle Modal Large
//           </Button>
//         </ButtonGroup>
//         <div style={{ position: 'absolute', top: '1000px', height: '1px' }}>
//           Overflowing Content Test
//         </div>
//       </ModalDisplay>
//       {refPortal1.current && (
//         <>
//           <Modal.Default
//             open={open[0]}
//             onClose={() => setOpenName(0, false)}
//             heading={'Small'}
//             portalTo={refPortal1.current}
//           >
//             <Modal.Content>
//               <ModalContentItemFiller />
//               <ModalContentItemFiller />
//               <ModalContentItemFiller />
//             </Modal.Content>
//           </Modal.Default>
//           <Modal.Default
//             open={open[1]}
//             onClose={() => setOpenName(1, false)}
//             heading={'Medium'}
//             portalTo={refPortal1.current}
//             size="medium"
//           >
//             <Modal.Content>
//               <ModalContentItemFiller />
//               <ModalContentItemFiller />
//               <ModalContentItemFiller />
//             </Modal.Content>
//           </Modal.Default>
//           <Modal.Default
//             open={open[2]}
//             onClose={() => setOpenName(2, false)}
//             heading={'Large'}
//             portalTo={refPortal1.current}
//             size="large"
//             nextText={'CREATE USER'}
//           >
//             <Modal.Content>
//               <ContentGrid>
//                 <ModalContentItemFiller />
//                 <div />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//                 <ModalContentItemFiller />
//               </ContentGrid>
//             </Modal.Content>
//           </Modal.Default>
//         </>
//       )}
//     </ModalStoryWrapper>
//   );
// };
