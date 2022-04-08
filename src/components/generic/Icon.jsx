import styled from "styled-components";
import { Image } from 'react-bootstrap';

const Icon = styled(Image)`
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-right: 5px;

  &:hover{
    background-color: yellow;
  }
`;

export default Icon;