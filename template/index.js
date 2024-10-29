import React from 'react'
import Header from "@/components/Header"
import Footer from '@/components/Footer'

const Template = ({children}) => {
  return (
    <>
    <Header />

    {/* page header strat */}
    <div className=' page_header py-8 text-center'>
        <h1 className='text-white fs_28'>shop</h1>
        <p className='mb-0 text-white'>Home/page</p>

    </div>

    {children}


    <Footer />

    </>
  )
}

export default Template
