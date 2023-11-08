'use client'

import store from '@/store/store';
import { Provider } from 'react-redux';
import { persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import './globals.css';
import 'tailwindcss/tailwind.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{overflowY: 'hidden'}}>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      <link rel="icon" href="/icon.ico" sizes="any" />
      </body>
    </html>
  )
}
