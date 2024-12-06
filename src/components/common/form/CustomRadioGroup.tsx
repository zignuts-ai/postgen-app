import React from 'react'
import { Controller } from 'react-hook-form'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'

interface RadioGroupProps {
  control: any
  name: string
  value: string
}

const CustomRadioGroup: React.FC<RadioGroupProps> = ({ control, name, value }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value}
      render={({ field }) => (
        <RadioGroup row aria-label='controlled' {...field}>
          <FormControlLabel value='Male' control={<Radio />} label='Male' />
          <FormControlLabel value='Female' control={<Radio />} label='Female' />
        </RadioGroup>
      )}
    />
  )
}

export default CustomRadioGroup
