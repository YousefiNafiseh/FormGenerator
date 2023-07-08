import { ChakraProvider } from "@chakra-ui/react"
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"
import "@testing-library/jest-dom"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createMemoryHistory } from "history"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const wrapper = ({ children }:any) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ChakraProvider>
  </QueryClientProvider>
)

test("render form", async () => {
  render(<App />, { wrapper })
  const history = createMemoryHistory()

  expect(screen.getByText(/Page List/i)).toBeInTheDocument()

  const createNewPage = screen.getByText(/Create New Page/i)
  expect(createNewPage).toBeInTheDocument()
  await userEvent.click(createNewPage)
  expect(history.push("/pages/create"))

}) 