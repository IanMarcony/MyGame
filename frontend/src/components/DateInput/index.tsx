/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-bitwise */
/* eslint-disable radix */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps {
  name: string;
  value?: string;
}

const DateInput: React.FC<InputProps> = ({ name, value: valueDate }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [value, setValue] = useState<Date | null>(() => {
    return valueDate ? new Date(valueDate) : null;
  });

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          inputFormat="dd/MM/yyyy"
          toolbarFormat="MM/dd/yyyy"
          label="Data de nascimento"
          disableHighlightToday
          disableFuture
          value={value}
          onChange={(newValue) => setValue(newValue)}
          inputRef={inputRef}
          renderInput={(params) => (
            <TextField
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              {...params}
            />
          )}
        />
      </LocalizationProvider>
    </Container>
  );
};

export default DateInput;
