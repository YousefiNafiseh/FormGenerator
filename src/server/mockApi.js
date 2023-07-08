import { createServer, Model } from "miragejs"
import { ElementType } from "../types"

createServer({
  models: {
    page: Model,
  },
  routes() {
    this.namespace = "api" 

    this.post("/pages", (schema, request) => {
      let attrs = JSON.parse(request.requestBody) 
      return schema.pages.create(attrs) 
    }) 

    this.get("/pages", (schema, request) => {
      return schema.pages.all() 
    }) 

    this.get("/pages/:id", (schema, request) => {
      let id = request.params.id 
      return schema.pages.find(id) 
    }) 

    this.put("pages/:id", (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody) 
      let id = request.params.id 
      let page = schema.pages.find(id) 
      return page.update(newAttrs) 
    }) 
  },
  seeds(server) {
    server.create("page", {
      name: "User",
      elements: [
        { name: "firstName", type: ElementType.Text, requiredIf: "Required" },
        {
          name: "lastName",
          type: ElementType.Text,
          requiredIf: "firstName,!=''",
        },
      ],
    }) 
  },
}) 
