import { SettingsIcon } from "@chakra-ui/icons"
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQuery } from "@tanstack/react-query"
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form"
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom"
import * as yup from "yup"
import CheckboxController from "../../components/checkboxController"
import Form from "../../components/form"
import InputController from "../../components/inputController"
import RedioController from "../../components/redioController"
import SelectController from "../../components/selectController"
import * as paths from "../../routeConfig/paths"
import { Element, ElementType, Page } from "../../types"
import { parseExpressions, validation } from "./util"
import { useEffect, useState } from "react"

const PageRenderer = (): JSX.Element => {
  const [disabled, setDisabled] = useState<{ [key: string]: boolean }>({})
  const [display, setDisplay] = useState<{ [key: string]: boolean }>({})
  const [searchParams] = useSearchParams()
  const pageId = searchParams.get("pageId") ?? ""
  const { data } = useQuery(["pages", pageId], async () => {
    const response = await fetch(`/api/pages/${pageId}`)
    return response.json()
  })
  const navigate = useNavigate()
  let formProvider: UseFormReturn<FieldValues, any, undefined>

  const handleOnChange = (element: Element) => {
    (data?.page as Page)?.elements?.forEach((item) => {
      if (item.editableIf?.includes(element?.name)) {
        setDisabled((prev) => ({
          ...prev,
          [item.name]: validatExpression(item?.editableIf ?? "", false),
        }))
      }
      if (item.visibleIf?.includes(element?.name)) {
        setDisplay((prev) => ({
          ...prev,
          [item.name]: validatExpression(item?.visibleIf ?? "", true),
        }))
      }
    })
  }

  const createElement = (element: Element) => {
    const elementProps = {
      name: element?.name,
      label: element?.name,
      isDisabled: disabled[element?.name],
      onChange: () => handleOnChange(element),
      display: display[element?.name] ? "block" : "none",
    }

    switch (element.type.toLowerCase()) {
      case ElementType.Text:
        return (
          <Box>
            <InputController
              {...elementProps}
            />
          </Box>
        )
      case ElementType.Checkbox:
        return (
          <Box>
            <CheckboxController
              {...elementProps}
            />
          </Box>
        )
      case ElementType.Select:
        return (
          <Box>
            <SelectController
              options={
                element?.choices?.map((item) => ({ id: item, name: item })) ??
                []
              }
              {...elementProps}
            />
          </Box>
        )
      case ElementType.Radio:
        return (
          <Box>
            <RedioController
              options={
                element?.choices?.map((item) => ({ id: item, name: item })) ??
                []
              }
              {...elementProps}
            />
          </Box>
        )
      default:
        return null
    }
  }

  const renderElement = () => {
    return (data?.page as Page)?.elements?.map((element) => {
      return createElement(element)
    })
  }

  const getRules = () => {
    let obj: {
      [key: string]: any
    } = {};
    (data?.page as Page)?.elements?.forEach((element: Element) => {
      if (element?.requiredIf) {
        if (element?.requiredIf.toLowerCase() === "required") {
          obj[element.name] = yup.string().required(`${element.name} is Required`)
        } else {
          const { fieldsName, operators, literals, logicalExpressions } =
            parseExpressions(element?.requiredIf)
          obj[element.name] = yup.string().when(
            fieldsName.filter((item) => item !== element.name),
            (values, schema) => {
              if (
                validation({ values, literals, operators, logicalExpressions })
              ) {
                return schema.required(`${element.name} is Required`)
              } else return schema.optional()
            }
          )
        }
      }
    })
    const schema = yup.object().shape({
      ...obj,
    })
    return schema
  }

  formProvider = useForm({
    resolver: yupResolver(getRules()),
  })

  const validatExpression = (
    expression: string,
    defulteReturn: boolean
  ): boolean => {
    if (expression) {
      const { fieldsName, operators, literals, logicalExpressions } =
        parseExpressions(expression)
      const values = fieldsName.map((field) => formProvider.watch(field))
      return validation({
        values,
        literals,
        operators,
        logicalExpressions,
      })
    }

    return defulteReturn
  }

  useEffect(() => {
    if (data?.page) {
      (data?.page as Page)?.elements?.forEach((element) => {
        setDisabled((prev) => ({
          ...prev,
          [element.name]: validatExpression(element?.editableIf ?? "", false),
        }))

        setDisplay((prev) => ({
          ...prev,
          [element.name]: validatExpression(element?.visibleIf ?? "", true),
        }))
      })
    }
  }, [data])

  const onSubmit: SubmitHandler<FieldValues> = (data, event) => {
    event?.preventDefault()
    console.log(data)
    formProvider.reset({})
  }

  return (
    <Box py={10} px={4}>
      <Box position="relative" mb={12}>
        <Divider borderColor={"green.300"}/>
        <AbsoluteCenter  bg={"gray.100"} color={"green.500"} px="4" fontSize="3xl">
          {`${(data?.page as Page)?.name}`}
        </AbsoluteCenter>
      </Box>
      <Form {...{ onSubmit }} formProviderProps={formProvider}>
        <SimpleGrid
          columns={2}
          spacingX="40px"
          spacingY="20px"
          mt={4}
          border="1px"
          borderColor="gray.200"
          borderRadius="6"
          p={3}
        >
          {renderElement()}
        </SimpleGrid>
        <Box mt="4">
          <Flex>
            <Spacer />
            <Box display="flex" gap="2" alignItems="center" cursor="pointer">
              <SettingsIcon
                color={"green"}
                fontSize="larger"
                onClick={() => {
                  navigate({
                    pathname: paths.PAGE_CREATE,
                    search: createSearchParams({
                      pageId: (data?.page as Page)?.id ?? "1",
                    }).toString(),
                  })
                }}
              />
              <Button colorScheme="green" type={"submit"}>
                {`Submit ${(data?.page as Page)?.name}`}
              </Button>
            </Box>
          </Flex>
        </Box>
      </Form>
    </Box>
  )
}

export default PageRenderer
