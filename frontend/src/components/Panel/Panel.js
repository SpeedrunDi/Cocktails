// import React from 'react';
// import {Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
//
// const Panel = ({data, title, handleChange, name, deleteHandler}) => {
//   console.log(data)
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>{title}</TableCell>
//             <TableCell align="center">User</TableCell>
//             <TableCell align="center">Publish</TableCell>
//             <TableCell align="center">Delete</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map(el => (
//             <TableRow
//               key={el._id}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {el.title}
//               </TableCell>
//               <TableCell align="center">{el.user.email}</TableCell>
//               <TableCell align="center">
//                 <Button
//                   onClick={() => handleChange(el._id)}
//                 >
//                   Publish
//                 </Button>
//               </TableCell>
//               <TableCell align="center">
//                 <Button
//                   onClick={() => deleteHandler(el._id)}
//                 >
//                   Delete
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//
//   );
// };
//
// export default Panel;