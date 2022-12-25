import { Meta } from '@storybook/react';
import { ColorPalette, ColorItem } from '@storybook/addon-docs';
import { themes, ThemeProvider, ensure } from '@storybook/theming';
import { H3 } from 'packages/components/Typography';
import t from './index';

export default {
  title: 'Foundational/Colors',
  component: undefined,
  decorators: undefined,
  parameters: {
    controls: { sort: 'none' },
  },
} as Meta;

export const Colors = (): JSX.Element => {
  return (
    <>
      <ThemeProvider theme={ensure(themes.light)}>
        {Object.entries(t).map(([themeName, theme]) => {
          return (
            <div key={themeName}>
              <H3>{themeName}</H3>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <ColorPalette>
                {Object.entries(theme.color).map(([colorName, color]) => {
                  return (
                    <ColorItem
                      key={colorName}
                      title={colorName}
                      subtitle={''}
                      colors={color}
                    />
                  );
                })}
              </ColorPalette>
              <br></br>
            </div>
          );
        })}
      </ThemeProvider>
    </>
  );
};
