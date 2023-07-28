import { Box, Heading, List, ListItem, ListIcon } from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useQuery } from "@tanstack/react-query"
import { Page } from "../../types"
import * as paths from "../../routeConfig/paths"
import { createSearchParams, useNavigate } from "react-router-dom"

export const Sidebar = () => {
  const navigate = useNavigate()

  const { data } = useQuery(["pages"], async () => {
    const response = await fetch("/api/pages")
    return response.json()
  })

  const selectForm = (page: Page) => {
    navigate({
      pathname: paths.PAGE_RENDER,
      search: createSearchParams({
        pageId: page?.id ?? "1",
      }).toString(),
    })
  }

  const createFormsList = () => {
    return (
      <List spacing={3} p={4}>
        {data?.pages?.map((page: Page) => (
          <ListItem key={page.id} cursor={"pointer"} onClick={() => selectForm(page)}>
            <ListIcon as={ArrowForwardIcon} />
            {page?.name}
          </ListItem>
        ))}
      </List>
    )
  }

  const redirectToHomePage = () => {
    navigate(paths.PAGE)
  }

  return (
    <Box color="white">
      <Box
        display={"flex"}
        justifyContent={"center"}
        p={4}
        bg={"green.500"}
      >
        <Heading
          as="h5"
          onClick={redirectToHomePage}
          cursor={"pointer"}
        >
          Forms
        </Heading>
      </Box>
      <Box>
        {data?.pages && createFormsList()}
      </Box>
    </Box>
  )
}