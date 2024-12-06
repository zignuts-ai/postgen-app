import React from 'react'
import { MenuItem, Select, FormHelperText, InputLabel } from '@mui/material'
import { Controller } from 'react-hook-form'

interface CustomDropDownProps {
  name: string
  control: any
  label: string
  error?: any
  disabled?: boolean
  options: any
}

const CustomDropdown = ({ name, control, label, error, options }: CustomDropDownProps) => {
  return (
    <>
      <InputLabel error={Boolean(error)}>Select {label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Select error={Boolean(error)} label={'Select ' + label} name={name} value={value} onChange={onChange}>
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
