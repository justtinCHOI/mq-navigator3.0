import React from 'react';
import DisplayList from 'components/Setting/DisplayList';
import GateList from 'components/Setting/GateList';
import { Section } from '@pages/workspace/Analyze/styles';

const Analyze = () => {
  return (
    <>
      <Section>
        <GateList />
      </Section>
      <Section>
        <DisplayList />
      </Section>
    </>
  );
};

export default Analyze;
