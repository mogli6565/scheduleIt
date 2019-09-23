import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  color: white;
  padding: 2px;
  background-color: ${({color}) => color};
  height: 100%;
`;

const Title = styled.div`
    max-width: 95%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    line-height: 15px;
    font-weight: ${({bold}) => (bold ? 'bold' : 'initial')};
`;

const CustomAppointment = ({data}) => {
    return (
        <Root color={data.color} title={`${data.user} - ${data.title}`}>
            <Title bold>Title: {data.title}</Title>
            <Title>Organizer: {data.user}</Title>
        </Root>
    )
}

export default CustomAppointment;