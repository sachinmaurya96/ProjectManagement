import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from "react-redux";
import { store } from './store/index';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/login",
        element: <AuthLayout><LoginPage/></AuthLayout>
      },
      {
        path: "/signup",
        element: <AuthLayout><SignupPage/></AuthLayout>
      },

    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
<Provider store={store}>
  <RouterProvider router={router}/>
</Provider>
)
