import NavbarPage from "@/components/Navbar/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <NavbarPage />
        <Outlet />
      </div>
      <hr />
      <TanStackRouterDevtools />
    </>
  ),
});
