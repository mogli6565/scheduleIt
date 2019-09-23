import React from 'react';
import styled from 'styled-components';
import HeadShake from 'react-reveal/HeadShake';

const Success = styled.div`
  color: green;
  font-weight: bold;
  font-size: 12px;
`;

const SuccessLine = ({success}) => (
    <HeadShake>
        <Success>{success}</Success>
    </HeadShake>
);

export default SuccessLine;