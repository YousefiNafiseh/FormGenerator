import { Box, Button } from "@chakra-ui/react";
import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from "react-router-dom";
import Form from "../../components/form";
import InputController from "../../components/inputController";
import * as paths from "../../routeConfig/paths";
import { ElementType, Page } from "../../types";
import Fields from "./Fields";

const CreatePage = () => {
  const [searchParams] = useSearchParams()
  const pageId = searchParams.get("pageId") ?? ""
  const { data } = useQuery(["pages", pageId], async () => {
    const response = await fetch(`/api/pages/${pageId}`)
    return response.json()
  })
  const navigate = useNavigate()
  const formProviderProps = useForm<Page>(
    {
      defaultValues: {
        id: '0',
        name: 'page1',
        elements: [{
          type: ElementType.Text,
          name: 'firstName'
        }]
      }
    }
  )
  const queryClient = useQueryClient()

  useEffect(() => {
    if (data && pageId) {
      const { name, elements } = data?.page as Page
      formProviderProps.setValue("name", name)
      formProviderProps.reset(data.page)
    }
  }, [data])

  const postMutate = useMutation(
    (data: Page) =>
      fetch("/api/pages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["pages"],
        })
        showPages()
      },
    }
  )

  const putMutation = useMutation(
    (data: Page) =>
      fetch(`/api/pages/${pageId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["pages"],
        })
        showPages()
      },
    }
  )

  const onSubmit: SubmitHandler<Page> = (data) => {
    if (pageId) {
      putMutation.mutate({
        name: data.name as string,
        elements: data.elements
      })
    } else {
      postMutate.mutate({
        name: data.name as string,
        elements: data.elements
      })
    }
  }

  const showPages = () => {
    navigate(paths.PAGE)
  }

  const deleteMutation = useMutation(
    () =>
      fetch(`/api/pages/${pageId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["pages"],
        })
        showPages()
      },
    }
  )

  const deletePage = () => {
    deleteMutation.mutate()
  }

  return (
    <>
      <Box mt={4}>
        <Form {...{ formProviderProps, onSubmit }}>
          <InputController
            name={"name"}
            label={"Page Name"}
            formRules={{
              required: { value: true, message: "Page Name is required" },
            }}
          />
          <Fields {...{ formProviderProps }} />
          <Box mt={4}>
            <Button
              mr={4}
              colorScheme="blue"
              variant='solid'
              type="submit">
              Submit Page
          </Button>
            {pageId && <Button
              colorScheme="red"
              variant="solid"
              onClick={() => deletePage()}>
              Delete Page
            </Button>}
            <Button
              ml={4}
              colorScheme="blue"
              variant="outline"
              onClick={() => showPages()}>
              Close
            </Button>
          </Box>
        </Form>
      </Box>
    </>
  )
}

export default CreatePage 
