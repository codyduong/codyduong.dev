import Section from 'packages/components/Section/Section';
import SpinkitLoadable from 'packages/components/SpinkitLoadable';

const AGI = SpinkitLoadable(import('./AGI'));

export default function Experience(): JSX.Element {
  return (
    <Section title={'Experience'} subtitle={'\u00A0'}>
      <AGI />
    </Section>
  );
}
