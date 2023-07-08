import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from "@chakra-ui/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form"

interface SelectControllerProps extends SelectProps {
  label: string;
  name: string;
  formRules?: RegisterOptions;
  readOnly?: boolean;
  options: {
    id: string,
    name: string
  }[]
}

const SelectController = ({
  name,
  formRules,
  label,
  options,
  ...props
}: SelectControllerProps): JSX.Element => {
  const { control, watch } = useFormContext()

  const defaultValue = watch(name) || ""
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={formRules}
      render={({ field: { onBlur, onChange, value }, fieldState }) => {
        return <FormControl isInvalid={fieldState.invalid}>
          <FormLabel>{label}</FormLabel>
          <Select
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...props}
          >
            {options.map((option) => (
              <option value={option.id} key={option.id}>{option.name}</option>
            ))}
          </Select>
          {fieldState.invalid &&
            <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
          }
        </FormControl>
      }}
    />
  )
}

export default SelectController 
