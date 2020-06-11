import React, { useRef, InputHTMLAttributes } from 'react';
import useDidMount from '@rooks/use-did-mount';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, name, ...rest }) => {
  const { registerField, defaultValue, fieldName } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useDidMount(() => {
    registerField({
      ref: inputRef?.current,
      path: 'value',
      name: fieldName,
    });
  });

  return (
    <Container>
      {Icon && <Icon />}
      <input ref={inputRef} name={name} defaultValue={defaultValue} {...rest} />
    </Container>
  );
};

export default Input;
