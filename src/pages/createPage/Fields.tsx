import { AddIcon, ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons"
import {
  Box,
  Collapse,
  SimpleGrid,
  Text,
  useDisclosure
} from "@chakra-ui/react"
import { Parser } from "acorn"
import { FC, useState } from "react"
import { UseFormReturn, useFieldArray } from "react-hook-form"
import { FormButton } from "../../components/formButton"
import { FormModal } from "../../components/formModal"
import InputController from "../../components/inputController"
import SelectController from "../../components/selectController"
import { ElementType, Page } from "../../types"

interface FieldsProps {
  formProviderProps: UseFormReturn<Page, any, undefined>
}

interface FieldsCollapseModel {
  [key: string]: boolean
}

const Fields: FC<FieldsProps> = ({ formProviderProps }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fieldsCollapse, setFieldsCollapse] = useState<FieldsCollapseModel>()
  const { fields, append, remove } = useFieldArray({
    control: formProviderProps.control,
    name: "elements"
  }) 

  const addField = () => {
    append({
      type: ElementType.Text,
      name: "",
      choices: [""],
      requiredIf: "",
      visibleIf: "",
      editableIf: "",
    })
  }

  const handleToggle = (index: number) => {
    setFieldsCollapse(collapse => ({ ...collapse, [index]: !collapse?.[index] }))
  }

  const validateIf = (value: string) => {
    if (value) {
      try {
        Parser.parse(value, {
          ecmaVersion: "latest",
        }) 
        return true 
      } catch {
        return "RequiredIf is not valid" 
      }
    } else {
      return true 
    }
  } 

  return (
    <>
      {fields?.map((field, index) => {
        return (
          <Box border="1px" borderColor="green.300" borderRadius="6" p={3} mt={4}>
            <Box display={"flex"} alignItems={"center"}>
              <ChevronDownIcon
                fontSize="larger"
                onClick={() => handleToggle(index)}
                color={"green.300"}
              />
              <Text color={"green.300"}> {`Field ${index + 1}`} </Text>
            </Box>
            <Collapse in={fieldsCollapse?.[index]} unmountOnExit>
              <SimpleGrid columns={3} spacingX="40px" spacingY="20px" mt={4} p={3} key={field.id}>
                <Box>
                  <SelectController
                    focusBorderColor={"green.300"}
                    name={`elements.${index}.type`}
                    label={"Type"}
                    options={Object.keys(ElementType).map((key) => ({
                      id: key,
                      name: key,
                    }))}
                    formRules={{
                      required: { value: true, message: "Type is required" },
                    }}
                  />
                </Box>
                <Box>
                  <InputController
                    focusBorderColor={"green.300"}
                    name={`elements.${index}.name`}
                    label={"FieldName"}
                    formRules={{
                      required: { value: true, message: "Name is required" },
                    }}
                  />
                </Box>
                <Box>
                  <InputController
                    focusBorderColor={"green.300"}
                    name={`elements.${index}.choices`}
                    label={"Choices"}
                    helperText="(Enter options and seprate them by comma)"
                  />
                </Box>
                <Box>
                  <InputController
                    focusBorderColor={"green.300"}
                    name={`elements.${index}.requiredIf`}
                    label={"RequiredIf"}
                    formRules={{
                      validate: validateIf,
                    }}
                  />
                </Box>
                <Box>
                  <InputController
                    focusBorderColor={"green.300"}
                    name={`elements.${index}.visibleIf`}
                    label={"VisibleIf"}
                    formRules={{
                      validate: validateIf,
                    }}
                  />
                </Box>
                <Box>
                  <InputController
                    focusBorderColor={"green.300"}
                    name={`elements.${index}.editableIf`}
                    label={"EditableIf"}
                    formRules={{
                      validate: validateIf,
                    }}
                  />
                </Box>
                <Box></Box>
                {index > 0 && <Box display={"flex"} justifyContent={"center"} mt={6}>
                  <FormButton
                    text={"Remove Field"}
                    color="red.500"
                    icon={<DeleteIcon boxSize={4} color={"red.500"} mr={2} />}
                    onClick={()=>onOpen()}
                  />
                  <FormModal
                    {...{
                      isOpen,
                      onOpen,
                      onClose
                    }}
                    onAccept={() => remove(index)}
                    header={"Delete Field"}
                    body={"Are You Sure?"}
                  />
                </Box>
                }
              </SimpleGrid>
            </Collapse>
          </Box>
        )
      })
      }
      <Box mt={4} display={"flex"} justifyContent={"center"}>
        <FormButton
          text={"Add New Field"}
          color="green.500"
          icon={<AddIcon boxSize={4} color={"green.500"} mr={2} />}
          onClick={() => addField()}
        />
      </Box>
    </>
  )
}

export default Fields 
