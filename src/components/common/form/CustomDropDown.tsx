import React from 'react'
import { MenuItem, Select, FormHelperText, InputLabel, SelectProps } from '@mui/material'
import { Controller } from 'react-hook-form'

interface CustomDropDownProps extends SelectProps {
  name: string
  control: any
  label: string
  error?: any
  disabled?: boolean
  required?: boolean
  options: any
  onChangeAfter?: any
}

const CustomDropdown = ({ name, control, label, error, options, required, onChangeAfter }: CustomDropDownProps) => {
  return (
    <>
      <InputLabel error={Boolean(error)}>
        Select {label} {required ? '*' : ''}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: required === undefined ? true : required }}
        render={({ field: { value, onChange } }) => (
          <Select
            error={Boolean(error)}
            label={'Select ' + label}
            name={name}
            value={value}
            onChange={e => {
              onChange(e)
              onChangeAfter?.(e.target.value)
            }}
          >
            {options.map((option: any) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
    </>
  )
}

export default CustomDropdown
