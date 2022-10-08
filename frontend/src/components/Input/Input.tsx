import { useEffect, useState } from 'react';
import { cn } from '../../utils/utils';

import styles from './styles.module.scss';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  haveError?: boolean;
  defaultValue?: string | number;
  fieldName: string;
}

const Input: React.FC<InputProps> = ({
  fieldName,
  defaultValue,
  haveError = false,
  ...props
}) => {
  const [value, setValue] = useState<string | number | undefined>(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <label className={styles.label}>
      {fieldName}
      <input
        className={cn(styles.input, { [styles.input_error]: haveError })}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        {...props}
      />
    </label>
  );
};

export { Input };
