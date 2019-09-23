import React from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

const Icon = styled.i`
  font-size: 14px;
  color: #5b6980;
  margin-left: 5px;
  cursor: pointer;
`;

const CustomTooltip = ({title, position = "right"}) => (
    <Tooltip title={title} placement={position}>
        <Icon className="fa fa-info-circle" />
    </Tooltip>
);

export default CustomTooltip;

