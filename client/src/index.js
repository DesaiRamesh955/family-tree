import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import {AddFamily,Home,ErrorPage} from './pages';
import ShowFamily from './pages/ShowFamily';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "addfamily",
        element: <AddFamily />,
      },
      {
        path: "family/:id",
        element: <ShowFamily />,
      },
    ]
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 // <React.StrictMode>
   <RouterProvider router={router}  />
  //</React.StrictMode>
);