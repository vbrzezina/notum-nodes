import { MuiColorInput, MuiColorInputProps } from 'mui-color-input'
import { Control, Controller, ControllerProps, FieldError, Path, FieldValues } from 'react-hook-form'
import { useFormError } from 'react-hook-form-mui'

export type ColorInputFieldElementProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  MuiColorInputProps,
  'name' | 'value' | 'format'
> & {
  validation?: ControllerProps['rules']
  name: Path<TFieldValues>
  parseError?: (error: FieldError) => string
  control?: Control<TFieldValues>
}

export default function ColorInputFieldElement<TFieldValues extends FieldValues = FieldValues>({
  validation = {},
  parseError,
  required,
  name,
  control,
  ...rest
}: ColorInputFieldElementProps<TFieldValues>): JSX.Element {
  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn
  if (required && !validation.required) {
    validation.required = 'This field is required'
  }

  return (
    <Controller<TFieldValues>
      name={name}
      control={control}
      rules={validation}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => {
        return (
          <MuiColorInput
            {...rest}
            name={name}
            value={value || '#fff'}
            format='hex'
            inputProps={{ value }} // the default is actually just for the picker not to show transparent color
            onChange={(value, colors) => {
              onChange(value)
              if (typeof rest.onChange === 'function') {
                rest.onChange(value, colors)
              }
            }}
            onBlur={onBlur}
            required={required}
            error={!!error}
            helperText={
              error ? (typeof customErrorFn === 'function' ? customErrorFn(error) : error.message) : rest.helperText
            }
            inputRef={ref}
          />
        )
      }}
    />
  )
}
