import React from 'react';
import styled from 'styled-components';
import HeadShake from 'react-reveal/HeadShake';

const Error = styled.div`
  color: red;
  font-weight: bold;
  font-size: 12px;
`;

const ErrorLine = ({error}) => (
    <HeadShake>
        <Error>{error}</Error>
    </HeadShake>
);

export default ErrorLine