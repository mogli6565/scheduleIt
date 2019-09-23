import styled, {css} from 'styled-components';

export const Card = styled.div`
  display: flex;
  width: ${({width}) => width};
  height: ${({height}) => height};
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
  margin: 5% auto;
  position:relative;
`

export const Greeting = styled.div`
  position: absolute;
  top: -30px;
  font-size: 16px;
  left: 0;
  color: white;
  text-shadow: 2px 2px 2px cadetblue;
`;

export const Logout = styled.div`
  position: absolute;
  top: -30px;
  right: 0;
  font-size: 14px;
  color: white;
  text-shadow: 2px 2px 2px cadetblue;
  cursor: pointer;
  text-decoration: underline;
  &:hover{
    color: gainsboro;
  }
`;

export const Legend = styled.div`
  font-size: 13px;
  margin-left: 10px;
  margin-top: 10px;
`;

export const ColorBox = styled.span`
  width: 10px;
  height: 10px;
  display: inline-flex;
  background-color: ${({color}) => color};
  margin-right: 4px;
`;