import React from 'react';
import GateList from '@components/Analyze/GateList';
import { Section } from '@pages/workspace/Analyze/styles';
import DisplayList from '@components/Analyze/DisplayList';

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
