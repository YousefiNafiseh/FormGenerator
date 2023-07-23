import { createServer, Model } from "miragejs"
import { ElementType } from "../types"

createServer({
  models: {
    page: Model,
  },
  routes() {
    this.namespace = "api" 

    this.post("/pages", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      const data=localStorage.getItem("pages")
      localStorage.setItem(
        "pages",
        JSON.stringify(data?[...JSON.parse(data), attrs]:[attrs])
      );
      return schema.pages.create(attrs);
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
      const data=localStorage.getItem("pages")
      const pages = JSON.parse(data)
      const findIndex = pages.findIndex(page=> page.id === id) 
      pages[findIndex] = newAttrs
      localStorage.setItem(
        "pages",
        JSON.stringify([...pages])
      );
      return page.update(newAttrs) 
    }) 
    this.delete("pages/:id",(schema, request) => {
      const id = request.params.id
      const data=localStorage.getItem("pages")
      const pages = JSON.parse(data)
      const newPages = pages?.filter(page=> page.id !== id) 
      localStorage.setItem(
        "pages",
        JSON.stringify([...newPages])
      );
      return schema.pages.find(id).destroy()
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
    JSON.parse(localStorage.getItem("pages"))?.forEach((item) => {
      server.create("page", { name: item?.name, elements: item?.elements });
    });
  },
}) 
