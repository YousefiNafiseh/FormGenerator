import { lazy, Suspense } from "react"

const PageRenderer = lazy(() => import("./PageRenderer"))

function LazyPageRenderer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageRenderer />
    </Suspense>
  )
}

export default LazyPageRenderer 