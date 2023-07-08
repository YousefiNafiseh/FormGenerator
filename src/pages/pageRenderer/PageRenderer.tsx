import { SettingsIcon } from "@chakra-ui/icons"
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  SimpleGrid,
  Spacer
} from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQuery } from "@tanstack/react-query"
import {
  FieldValues,
  SubmitHandler,
  useForm, UseFormReturn
} from "react-hook-form"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"
import * as yup from "yup"
import CheckboxController from "../../components/checkboxController"
import Form from "../../components/form"
import InputController from "../../components/inputController"
import RedioController from "../../components/redioController"
import SelectController from "../../components/selectController"
import * as paths from "../../routeConfig/paths"
import { Element, ElementType, Page } from "../../types"

const PageRenderer = (): JSX.Element => {
  const [searchParams] = useSearchParams() 
  const pageId = searchParams.get("pageId") ?? "" 
  const { data } = useQuery(["pages", pageId], async () => {
    const response = await fetch(`/api/pages/${pageId}`) 
    return response.json() 
  }) 
  const navigate = useNavigate() 
  let formProvider: UseFormReturn<FieldValues, any, undefined> 
  const selectElement = (element: Element) => {
    switch (element.type.toLowerCase()) {
      case ElementType.Text:
        return (
          <Box>
            <InputController name={element?.name} label={element?.name} />
          </Box>
        ) 
      case ElementType.Checkbox:
        return (
          <Box>
            <CheckboxController name={element?.name} label={element?.name} />
          </Box>
        ) 
      case ElementType.Select:
        return (
          <Box>
            <SelectController
              name={element?.name}
              label={element?.name}
              options={
                element?.choices?.map((item) => ({ id: item, name: item })) ??
                []
              }
            />
          </Box>
        ) 
      case ElementType.Radio:
        return (
          <Box>
            <RedioController
              name={element?.name}
              label={element?.name}
              options={
                element?.choices?.map((item) => ({ id: item, name: item })) ??
                []
              }
            />
          </Box>
        ) 
      default:
        return null 
    }
  } 

  const renderElement = () => {
    return (data?.page as Page)?.elements?.map((element) => {
      return selectElement(element) 
    }) 
  } 

  const getRules = () => {
    let obj: {
      [key: string]: any 
    } = {};
    (data?.page as Page)?.elements?.forEach((element:Element) => {
      if (element?.requiredIf) {
        if (element?.requiredIf.toLocaleLowerCase() === "required") {
          obj[element.name] = yup.string().required("Required") 
        } else {
          const rule = element?.requiredIf.split(",") 
          obj[element.name] = yup.string().when(rule[0], {
            is: new Function("val", `return val${rule[1]}`),
            then: (schema) => schema.required(`${element.name} is Required`),
          }) 
        }
      }
    }) 
    const schema = yup.object().shape({
      ...obj
    }) 
    return schema 
  } 

  formProvider = useForm({
    resolver: yupResolver(getRules()),
  }) 

  const onSubmit: SubmitHandler<FieldValues> = (data, event) => {
    event?.preventDefault() 
    formProvider.reset({}) 
  } 

  return (
    <Box>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4" fontSize="3xl">
          {`${(data?.page as Page)?.name} Page`}
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
              <Button colorScheme="teal" type={"submit"}>
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
