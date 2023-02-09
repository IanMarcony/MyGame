/* eslint-disable react/jsx-props-no-spreading */
import React, { InputHTMLAttributes, useRef, useEffect } from 'react';

import { useField } from '@unform/core';
import { Container } from './styles';

interface IAccountGame {
  id: number;
  url_icon: string;
  company: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  valueAccount: IAccountGame;
}

const AccountInput: React.FC<InputProps> = ({
  valueAccount,
  name,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <img src={valueAccount.url_icon} alt={valueAccount.company} />
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />
    </Container>
  );
};

export default AccountInput;
