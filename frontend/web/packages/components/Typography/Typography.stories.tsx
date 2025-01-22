// import { Meta } from '@storybook/react';
// import { themes, ThemeProvider, ensure } from '@storybook/theming';
// import styled from 'styled-components';
// import { Heading, Paragraph } from './index';

// export default {
//   title: 'Foundational/Typography',
//   component: undefined,
//   decorators: undefined,
//   parameters: {
//     controls: { sort: 'none' },
//   },
// } as Meta;

// const HorizontalContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   padding: 16px;
//   gap: 32px;
// `;

// const VerticalContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   padding: 16px;
//   gap: 16px;

//   border: 1px dashed #9747ff;
//   border-radius: 5px;

//   /* Inside auto layout */
//   flex: none;
//   order: 0;
//   align-self: stretch;
//   flex-grow: 0;
// `;

// export const Typography = (): React.JSX.Element => {
//   return (
//     <>
//       <ThemeProvider theme={ensure(themes.light)}>
//         <HorizontalContainer>
//           <VerticalContainer>
//             <Heading.H1>Heading</Heading.H1>
//             <Heading.H2>Heading</Heading.H2>
//             <Heading.H3>Heading</Heading.H3>
//             <Heading.H4>Heading</Heading.H4>
//             <Heading.H5>Heading</Heading.H5>
//             <Heading.H6>Heading</Heading.H6>
//           </VerticalContainer>
//           <VerticalContainer>
//             {/* <Paragraph.P1>Regular Text</Paragraph.P1> */}
//             <Paragraph.P2>Regular Text</Paragraph.P2>
//             <Paragraph.P3>Regular Text</Paragraph.P3>
//             <Paragraph.P4>Regular Text</Paragraph.P4>
//             {/* <Paragraph.P5>Regular Text</Paragraph.P5> */}
//             {/* <Paragraph.P6>Regular Text</Paragraph.P6> */}
//           </VerticalContainer>
//           <VerticalContainer>
//             {/* <Paragraph.P1.italic>Italic Text</Paragraph.P1.italic> */}
//             <Paragraph.P2.italic>Italic Text</Paragraph.P2.italic>
//             <Paragraph.P3.italic>Italic Text</Paragraph.P3.italic>
//             <Paragraph.P4.italic>Italic Text</Paragraph.P4.italic>
//             {/* <Paragraph.P5.italic>Italic Text</Paragraph.P5.italic> */}
//             {/* <Paragraph.P6.italic>Italic Text</Paragraph.P6.italic> */}
//           </VerticalContainer>
//           <VerticalContainer>
//             {/* <Paragraph.P1.bold>Bold Text</Paragraph.P1.bold> */}
//             <Paragraph.P2.bold>Bold Text</Paragraph.P2.bold>
//             <Paragraph.P3.bold>Bold Text</Paragraph.P3.bold>
//             <Paragraph.P4.bold>Bold Text</Paragraph.P4.bold>
//             {/* <Paragraph.P5.bold>Bold Text</Paragraph.P5.bold> */}
//             {/* <Paragraph.P6.bold>Bold Text</Paragraph.P6.bold> */}
//           </VerticalContainer>
//         </HorizontalContainer>
//       </ThemeProvider>
//     </>
//   );
// };
