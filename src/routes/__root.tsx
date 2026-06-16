import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, useLocation } from "react-router-dom";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Toaster } from "../components/ui/sonner";
import { FloatingActions } from "../components/FloatingActions";

const queryClient = new QueryClient();

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-light text-primary">404</h1>
        <h2 className="mt-4 text-xl font-normal">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center bg-primary px-5 py-3 text-sm font-normal text-primary-foreground hover:bg-brand-red-dark transition">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        {!isAdmin && <Header />}
        <main className="flex-1"><Outlet /></main>
        {!isAdmin && <Footer />}
        {!isAdmin && <FloatingActions />}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
