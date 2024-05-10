import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from "../components/Header/index";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';
import SpinnerLoader from '@/components/Loader';




const Orders = () => {

    const [cartData, setCartData] = useState([])
    const [userAddress, setuserAddress] = useState({})
    const [loader, setLoader] = useState(false)

    const router = useRouter();

   const qunatity =(productQuantity,el ,i)=>{

    if(productQuantity === "add"){
        const updatedCart = cartData.toSpliced(i,1,{...el, boughtQuantity:el.boughtQuantity +1})
        setCartData(updatedCart)
        
    }
    else if (productQuantity === "minus"){
        if(el.boughtQuantity-1 > 0){
            const updatedCart = cartData.toSpliced(i,1,{...el, boughtQuantity:el.boughtQuantity - 1})
            setCartData(updatedCart)
        }
        else if (el.boughtQuantity-1 === 0){
            const updatedCart = cartData.toSpliced(i,1)
            setCartData(updatedCart)
        }
    }
    }
    const deleteItem =(el,i)=>{
        const updatedCart = cartData.toSpliced(i,1)
        setCartData(updatedCart)

    }
    const placeOrder= async()=>{
        try{
            setLoader(true)
            const {City, Country, ZipCode} = userAddress
            if(City && Country && ZipCode){
                const payload = {
                    "items": cartData?.map(el => ({productId: el.id, boughtQuantity: el.boughtQuantity})),
                    userAddress
                }
                const res = await axios.post(`/api/order/create`, payload);
                router.push("/orderlist")
                alert("Order Placed Successfully")
            } else {
                alert("User Address Required")
            }
            setLoader(false)
        } catch(err){
            console.log(err);
            setLoader(false)
        }
    }




    
  

    useEffect(()=>{
        if(router?.query?.product && JSON.parse(router?.query?.product)){
            let cartData = JSON.parse(router?.query?.product)
            cartData = cartData.map(el => ({...el, boughtQuantity:1}))
            setCartData(cartData)
        }

    },[router?.query?.product])

  return (
    <>
    <Header/>
    {/* page header strat */}
    <div className=' page_header py-8 text-center'>
    <h1 className='text-white fs_28'>shop</h1>
    <p className='mb-0 text-white'>Home/page</p>

    </div>
    {/*page header end  */}
    <div className="container md:mx-auto px-20 py-8">
        <div className="flex justify-center mb-10">
            <div className=' w-full pr-8'>
                <table class="table-fixed w-full">
                    <thead className='border-b-2 border-neutral-400 text-left'>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Handle</th>
                        </tr>
                    </thead>
                   
                    <tbody>
                    {
                        cartData.map((el,i)=>(
                            <tr className='border-neutral-200 border-b-2 py-3'>
                                <td className='py-3'>{el?.name} </td>
                                <td className='py-3'>
                                    <Button className="bg-transparent hover:bg-transparent px-3  border-slate-200 border-2 text-slate-500" onClick={() => (qunatity("minus",el,i))}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bg-transparent hover:bg-transparent" width="12" height="12" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                                        </svg>
                                    </Button>
                                    <span className="px-3">{el?.boughtQuantity}</span>
                                    <Button className="bg-transparent hover:bg-transparent px-3  border-slate-200 border-2 text-slate-500" onClick={() => {qunatity("add", el, i)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bg-transparent hover:bg-transparent" width="12" height="12" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                        </svg>
                                    </Button>
                                </td>
                                <td className='py-3'>{el?.price}</td>
                                <td className='py-3 pl-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash-fill" viewBox="0 0 16 16" className='cursor-pointer' onClick={() => {deleteItem(el, i)}}>
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                    </svg>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>

                </table>

            </div>
        </div>

        <div>
        <Card className="w-full">
            <CardHeader>
                <CardTitle>User Details</CardTitle>
                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent>
                <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">City</Label>
                    <Input id="name" placeholder="City" onChange={(e)=>setuserAddress({...userAddress, City:e.target.value})} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Country</Label>
                    <Input id="name" placeholder="Country" onChange={(e)=>setuserAddress({...userAddress, Country:e.target.value})} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Zipcode</Label>
                    <Input id="name" type="number" placeholder="ZipCode" onChange={(e)=>setuserAddress({...userAddress, ZipCode:e.target.value})} />
                    </div>
                </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={()=>router.back()}>Back</Button>
                <Button className="bg_primary" onClick={()=>placeOrder()}>Place Order</Button>
            </CardFooter>
         </Card>
        </div>
    </div>
    
    <SpinnerLoader show={loader} closeShow={() => setLoader(false)} />
     

    </>
  )
}

export default Orders
