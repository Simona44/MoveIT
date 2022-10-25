import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";

import { GlobalContext } from '../context/GlobalState';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const OrdersList = () => {
  const { orders } = useContext(GlobalContext);
  return (
    <div className="container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell align="right">Distance</TableCell>
              <TableCell align="right">Living Area</TableCell>
              <TableCell align="right">Attic Area</TableCell>
              <TableCell align="right">Piano</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                hover
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <NavLink to={`${order.id}`} style={{textDecoration: "none" }}>
                  <TableCell component="th" scope="row" className="nav-link">
                    {order.id}
                  </TableCell>
                </NavLink>
                <TableCell align="right">{order.distance} km</TableCell>
                <TableCell align="right">{order.livingArea}</TableCell>
                <TableCell align="right">{order.atticArea}</TableCell>
                <TableCell align="right">{order.piano ? 5000 : 0}</TableCell>
                <TableCell align="right">{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default OrdersList;
