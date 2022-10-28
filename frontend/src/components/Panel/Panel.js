import React from 'react';
import {Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useSelector} from "react-redux";

const Panel = ({data, title, handleChange, deleteHandler}) => {
  const user = useSelector(state => state.users.user);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold', fontSize: '18px'}}>{title}</TableCell>
            {user && user.role === 'admin'
              ? (<>
                  <TableCell align="center" sx={{fontWeight: 'bold', fontSize: '18px'}}>User</TableCell>
                  <TableCell align="center" sx={{fontWeight: 'bold', fontSize: '18px'}}>Publish</TableCell>
                  <TableCell align="center" sx={{fontWeight: 'bold', fontSize: '18px'}}>Delete</TableCell>
                </>)
              : <TableCell align="center" sx={{fontWeight: 'bold', fontSize: '18px'}}>Status</TableCell> }

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(el => (
            <TableRow
              key={el._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {el.title}
              </TableCell>
              {user && user.role === 'admin'
                ? (<>
                  <TableCell align="center">{el.user.email}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={el.published}
                      onChange={event => handleChange(event.target.checked, el._id)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                    onClick={() => deleteHandler(el._id)}
                    >
                    Delete
                    </Button>
                  </TableCell>
                  </>)
                : <TableCell align="center">
                  {el.published === true ? 'Published' : 'Pending to approve'}
                  </TableCell>
              }

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default Panel;