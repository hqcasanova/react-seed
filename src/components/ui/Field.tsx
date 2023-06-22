/* eslint-disable react/jsx-props-no-spreading */
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import classes from './Field.module.scss';

type UpstreamAttrs = {
  label: string,
  className?: string,
  name: string,
  onFieldChange?: (value: string, inputName: string) => void
  onValidation?: (isValid: boolean, inputName: string) => void
};
type Props = UpstreamAttrs & InputHTMLAttributes<HTMLInputElement>;

export type FieldHandle = {
  validate: () => void,
  setTouched: () => void,
  reset: () => void,
};

function Field(
  {
    label,
    className = '',
    name,
    onFieldChange = () => {},
    onValidation = () => {},
    ...inputProps
  }: Props,
  ref: ForwardedRef<FieldHandle>,
) {
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const rootClasses = [
    'field',
    isTouched && !isValid ? 'field--error' : '',
    ...className.split(' '),
  ];
  const rootClassName = rootClasses
    .map((cName) => classes[cName] || cName)
    .filter(Boolean)
    .join(' ');

  const validate = ({ required = false, value = '' } = inputProps) => {
    const isFilled = value.toString().trim().length > 0;
    const isValidTest = required && isFilled;

    setIsValid(isValidTest);
    onValidation(isValidTest, name);
  };

  const setTouched = () => setIsTouched(true);

  const reset = () => {
    setIsTouched(false);
    setIsValid(false);
  };

  useImperativeHandle(ref, () => ({
    validate,
    setTouched,
    reset,
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(validate, [inputProps.value]);

  const changeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (onFieldChange) {
      onFieldChange(target.value, name);
    }
  };

  return (
    <label className={rootClassName}>
      <strong>{ label }</strong>
      <input
        {...inputProps}
        onChange={changeHandler}
        onBlur={setTouched}
      />
    </label>
  );
}

export default forwardRef(Field);
