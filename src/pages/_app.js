import { Provider } from 'react-redux';
import { store } from '@/store';
import '@/styles/globals.css'
import { ClerkProvider } from "@clerk/nextjs";


export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ClerkProvider>
  )
}
