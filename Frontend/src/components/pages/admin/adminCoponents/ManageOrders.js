import React from 'react'
// import {Table,Button} from '@mui/material';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import CardMedia from '@mui/material/CardMedia';
// import { NavLink } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function ManageOrders() {

  



  return (
    <div > 
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>hi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell >
            <TableRow>
             <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
          
            <TableRow key="hi">
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          
            </TableCell>
            
          </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    {/* <TableContainer component={Paper} hidden={0}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx>Order ID</TableCell>
            <TableCell align="right">Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">DESC</TableCell>
            <TableCell align="right">IMAGE</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
              
              <TableCell align="right">Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              
              <TableCell align="right">IMAGE</TableCell>
              
            </TableRow>
            <TableRow>
              {/* <TableCell component="th" scope="row">a</TableCell> */}
              {/* <TableCell align="right">b</TableCell>
              <TableCell align="right">c</TableCell>
              
              <TableCell align="right">e</TableCell>
              <TableCell align="right">  
                      <CardMedia
                        component="img"
                        height="40"
                        image=""
                        alt="green iguana"
                      />
              </TableCell>
              
            </TableRow> */}
          
        {/* </TableBody> */}
      {/* </Table> */}
    {/* </TableContainer> */}
       
    </div>
  )
}

export default ManageOrders