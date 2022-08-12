import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
      staleTime: 5*1000
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )

}

export default MyApp
