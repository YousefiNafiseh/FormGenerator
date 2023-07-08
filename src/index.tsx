import { ChakraProvider } from "@chakra-ui/react"
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import "./server/mockApi"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
) 
const queryClient = new QueryClient() 

root.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </QueryClientProvider>
) 

reportWebVitals() 
