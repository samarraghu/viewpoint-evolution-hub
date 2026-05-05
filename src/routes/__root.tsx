import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dawnzera · Omnichannel Executive Portfolio" },
      { name: "description", content: "An interactive dashboard for analyzing sales performance and marketing campaign effectiveness." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Dawnzera · Omnichannel Executive Portfolio" },
      { property: "og:description", content: "An interactive dashboard for analyzing sales performance and marketing campaign effectiveness." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Dawnzera · Omnichannel Executive Portfolio" },
      { name: "twitter:description", content: "An interactive dashboard for analyzing sales performance and marketing campaign effectiveness." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/75d38c42-3b33-4d67-be7f-5d078de934d6/id-preview-3dbad624--c7463366-74a5-4cba-b5d2-bb0deed912d8.lovable.app-1777981219365.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/75d38c42-3b33-4d67-be7f-5d078de934d6/id-preview-3dbad624--c7463366-74a5-4cba-b5d2-bb0deed912d8.lovable.app-1777981219365.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
