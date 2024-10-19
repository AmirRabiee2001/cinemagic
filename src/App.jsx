import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppLayout from "./UI/AppLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import GlobalStyles from "./styles/GlobalStyles";
import Discover from "./pages/Discover";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import Title from "./pages/Title";
import Login from "./pages/Login";
import Search from "./pages/Search";
import { useState } from "react";
import ProtectedRoute from "./UI/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout setSearchQuery={setSearchQuery} />}>
            <Route index element={<Home />} />
            <Route path="discover" element={<Discover />} />
            <Route
              path="bookmarks"
              element={
                <ProtectedRoute>
                  <Bookmarks />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="search" element={<Search searchQuery={searchQuery} />} />
            <Route path="title/:id" element={<Title />} />
          </Route>

          <Route path="*" element={<NotFound />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-header)",
            color: "var(--color-text)",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
