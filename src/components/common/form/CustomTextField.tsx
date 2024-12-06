import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { Controller } from 'react-hook-form'

interface CustomTextFieldProps {
  name: string
  control: any
  label: string
  errors?: any
  disabled?: boolean
  placeholder?: string
  fullWidth?: boolean
  type?: 'text' | 'number' | 'password'
  required?: boolean
}

const CustomTextField: React.FC<CustomTextFieldProps & TextFieldProps> = ({
  name,
  control,
  label,
  errors,
  disabled,
  placeholder,
  fullWidth,
  type,
  required,
  ...props
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextField
            fullWidth={fullWidth}
            disabled={disabled}
            type={type || 'text'}
            value={value}
            name={name}
            label={label}
            onChange={onChange}
            error={Boolean(errors)}
            helperText={errors?.message}
            placeholder={placeholder}
            InputLabelProps={{
              required: required
            }}
            {...props}
          />
        )}
      />
    </>
  )
}

export default CustomTextField
