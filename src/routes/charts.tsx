import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/charts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/charts"!</div>
}
