import React from "react";
// Spinner
import { Spinner, Image } from "react-bootstrap";
// Styled Components
import styled from "styled-components";

/*
CustomSpinner: Custom spinner ajustado con estilos para que se centre en un componente y ponga el fondo en blanco
    Parametros:
        * size      => Tamaño del spinner (esta ajustado solo para los de sm)
        * animation => Animacion que tendrá el spinner de react bootstrap
        * variant   => Variante de stilos de colores propios de react bootstrap
        * loading   => Controla si se muestra o no el spinner
*/
// El div que contenga al spinner debe tener position:relative

const CustomContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #d4d4d487;
  position: absolute;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 800)}; ;
`;

const CustomSpinnerReact = styled(Spinner)`
  position: absolute;
  top: 50%;
  right: 50%;
  margin-top: -16px;
  margin-right: -16px;
  display: ${(loading) => (loading ? "d-none" : null)};
`;

const CustomSpinner = ({ size = "md", showPhoto = false, animation = "border", loading, variant, ...props }) => {

  return loading ? (
    <CustomContainer>
      <CustomSpinnerReact animation={animation} size={size} role="status">
        <span className="sr-only">{"Loading"} ...</span>
      </CustomSpinnerReact>
    </CustomContainer>
  ) : null;
};

export default CustomSpinner;