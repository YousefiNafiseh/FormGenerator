import { Box } from "@chakra-ui/react" 
import React from "react" 
import { Navigate, Route, Routes } from "react-router-dom" 
import * as paths from "./routeConfig/paths" 
import routes from "./routeConfig/router" 

function App() {
  return (
    <Box p={4}>
      <Routes>
        {routes.map((item) => (
          <Route
            key={item.title}
            path={item.path}
            element={React.createElement(item.component)}
          />
        ))}
        <Route path="*" element={<Navigate to={paths.PAGE} replace={true} />} />
      </Routes>
    </Box>
  ) 
}

export default App 
