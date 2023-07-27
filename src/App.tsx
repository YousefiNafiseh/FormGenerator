import { Box } from "@chakra-ui/react" 
import React from "react" 
import { Navigate, Route, Routes } from "react-router-dom" 
import * as paths from "./routeConfig/paths" 
import routes from "./routeConfig/router" 
import {Layout} from "./layout"

function App() {
  return (
    <Box>
      <Routes>
        {routes.map((item) => (
          <Route
            key={item.title}
            path={item.path}
            element={<Layout>{React.createElement(item.component)}</Layout>}
          />
        ))}
        <Route path="*" element={<Navigate to={paths.PAGE} replace={true} />} />
      </Routes>
    </Box>
  ) 
}

export default App 
