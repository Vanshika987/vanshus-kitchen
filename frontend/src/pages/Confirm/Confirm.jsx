import React, { useContext, useEffect, useState } from 'react'
import './Confirm.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets'

const Confirm = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const {url, token} = useContext(StoreContext);

  const [data, setData] = useState([])

  const fetchOrders = async() => {
    const response = await axios.post(url + "/api/order/userorders", {}, {headers: {token}})
    setData(response.data.data);
  }
  
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  return (
    <div className='my-order'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return(
            <div key={index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="" />
              <p>{order.items.map((item, index)=> {
                if(index === order.items.length-1){
                  return item.name + " x " + item.quantity
                }
                else{
                  return item.name + " x " + item.quantity + ", "
                }
              })}</p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span><b>{order.status}</b> </p>
              <button onClick={fetchOrders()} >Track Order</button>
            </div>
          )
        })}
      </div>
      <div className="btn">
        <button onClick={()=>navigate('/')} >Return to Home Page</button>
      </div>
    </div>
  )
}

export default Confirm
