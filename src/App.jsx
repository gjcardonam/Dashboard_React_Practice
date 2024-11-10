import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import Categories from "./pages/Categories.jsx";
import Account from "./pages/Account.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        staleTime: 0,
        },
    },
});

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />
        <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="account" element={<Account />} />
          </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" gutter={12}
      containerStyle={{ margin: "8px" }} 
      toastOptions={{
        success: {
          duration: 3000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          background: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
        }
      }}/>
    </QueryClientProvider>
  );
}

export default App;
