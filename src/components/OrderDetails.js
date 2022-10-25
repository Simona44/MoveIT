import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalState';

const OrderDetails = () => {
  const orderNumber = useParams();
  const { orders } = useContext(GlobalContext);

  let order = orders.find(x => x.id === Number(orderNumber.id));

  return (
    <div className="wrapper">
        <h2>Order details for household moving</h2>
        <div className="flex-row">
          <div className="column-left">
            <p className="last-in-section">order number: {order.id}</p>
            <p>{order.name}</p>
            <p className="last-in-section">{order.email}</p>
            <p>From: {order.from}</p>
            <p>To: {order.from}</p>
            <p className="last-in-section">Distance: {order.distance}</p>
            <p>Living Area: {order.livingArea}</p>
            <p className="last-in-section">Attic Area: {order.atticArea}</p>
            <p className="last-in-section">Do you have piano? {order.piano ? "Yes" : "No"}</p>
          </div>
          <div className="column-right">
            <h4 className="last-in-section">Estimated price {order.total} kr including VAT</h4>
            <p className="last-in-section">We save your price proposal for 90 days. To see the price proposal again, visit: <span className="link">http://move.it//offert</span></p>
            <p className="last-in-section">if you have questions, contact flytt@moveit.se</p>
          </div>
        </div>
    </div>
  )
};

export default OrderDetails;
