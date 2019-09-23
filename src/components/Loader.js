import React from 'react';
import styled from 'styled-components';

const Icon = styled.i`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX('-50%', '-50%');
  font-size: 36px;
  color: #5b6980;
`;

const Loader = () => <Icon className="fa fa-spinner fa-spin" />;

export default Loader;