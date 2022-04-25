import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';

const Label = ({text, variant = 'secondary', color: customColor}) => {
  const {color} = useContext(ThemeContext);

  let labelColor;
  if (customColor) {
    labelColor = customColor;
  } else {
    if (variant === 'primary') {
      labelColor = color.primary.main;
    } else if (variant === 'secondary') {
      labelColor = '#2c2560'; //color.secondary.main;
    } else if (variant === 'normal') {
      labelColor = '#2c2560'; //color.grey[300];
    } else if (variant === 'yellow') {
      labelColor = '#f9d749';
    }
  }
  return <StyledLabel color={labelColor}>{text}</StyledLabel>;
};

const StyledLabel = styled.div`
  color: ${(props) => props.color};
`;

export default Label;
