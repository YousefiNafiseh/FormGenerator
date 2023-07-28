import { createServer, Model } from "miragejs";

createServer({
  models: {
    page: Model,
  },
  routes() {
    this.namespace = "api";

    this.post("/pages", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      const data = localStorage.getItem("pages");
      localStorage.setItem(
        "pages",
        JSON.stringify(data ? [...JSON.parse(data), attrs] : [attrs])
      );
      return schema.pages.create(attrs);
    });

    this.get("/pages", (schema, request) => {
      return schema.pages.all();
    });

    this.get("/pages/:id", (schema, request) => {
      const id = request.params.id;
      return schema.pages.find(id);
    });

    this.put("pages/:id", (schema, request) => {
      const newAttrs = JSON.parse(request.requestBody);
      const id = request.params.id;
      let page = schema.pages.find(id);

      const pages = schema.pages.all().models.map((model) => model.attrs);

      const findIndex = pages.findIndex((page) => page.id === id);
      if (findIndex >= 0) {
        pages[findIndex] = newAttrs;
      }
      localStorage.setItem("pages", JSON.stringify([...pages]));
      return page.update(newAttrs);
    });

    this.delete("pages/:id",(schema, request) => {
      const id = request.params.id;
      const pages = schema.pages.all().models.map((model) => model.attrs);
      const newPages = pages.filter((page) => page.id !== id);
      localStorage.setItem("pages", JSON.stringify([...newPages]));
      return schema.pages.find(id).destroy()
    });
  },
  seeds(server) {
    JSON.parse(localStorage.getItem("pages"))?.forEach((item) => {
      server.create("page", { name: item?.name, elements: item?.elements });
    });
  },
});
