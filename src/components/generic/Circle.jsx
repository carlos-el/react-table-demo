import styled from "styled-components";

const Circle = styled.span`
  height: 25px;
  width: 25px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: inline-block;
`;

export default Circle;