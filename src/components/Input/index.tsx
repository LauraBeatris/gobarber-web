import React, {
  useCallback,
  useState,
  useRef,
  InputHTMLAttributes,
} from 'react';
import useDidMount from '@rooks/use-did-mount';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, name, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { registerField, defaultValue, fieldName } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useDidMount(() => {
    registerField({
      ref: inputRef?.current,
      path: 'value',
      name: fieldName,
    });
  });

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef?.current?.value);
  }, []);

  const handleInputChange = useCallback(() => {
    setIsFilled(!!inputRef?.current?.value);
  }, []);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon />}
      <input
        ref={inputRef}
        name={name}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        {...rest}
      />
    </Container>
  );
};

export default Input;
