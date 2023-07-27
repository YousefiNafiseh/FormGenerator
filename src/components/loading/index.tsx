import { Spinner, Box,Text } from "@chakra-ui/react"

export const Loading = () => {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} h={"100vh"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="green.200"
        color="green.500"
        size="lg"
      />
      <Text fontSize="xl" color={"green.500"} ml={2}>Loading...</Text>
    </Box>
  )
}