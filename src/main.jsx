import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "@styles/index.scss";

import { CartProvider } from "react-use-cart";

import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { Authorize } from "@auth/Authorize";
import { Interceptor } from "./middleware/Interceptor";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

Interceptor();

ReactDOM.createRoot(document.getElementById('root')).render(
	<Authorize>
		<CartProvider>
			<QueryClientProvider client={queryClient}>
				<ToastContainer />
				<App />
			</QueryClientProvider>
		</CartProvider>
	</Authorize>
)
