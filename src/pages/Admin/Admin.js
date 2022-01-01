import {
   Button,
   Container,
   Pagination,
   Slider,
   TextField,
   Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { axiosInstance } from '../../utils/AxiosInstance';
import { Box } from '@mui/system';
import { useAuth } from '../../hooks/useAuth';

const Admin = () => {
   const [users, setUsers] = useState([]);
   const [displayUser, setDisplayUser] = useState([]);
   const [pageCount, setPageCount] = useState(0);
   const [page, setPage] = useState(1);
   const [searchTerm, setSearchTerm] = useState('');
   const [range, setRange] = useState([]);

   const [selectedUsers, setSelectedUsers] = useState([]);

   useEffect(() => {
      axiosInstance.get(`/users?page=${page}&&size=10`).then(({ data }) => {
         setUsers(data.users);
         setDisplayUser(data.users);
         const pageNumbers = Math.ceil(data.count / 10);
         setPageCount(pageNumbers);
      });
   }, [page]);

   const handlePageChange = (event, value) => {
      setPage(value);
   };

   const searchTermChangeHandler = (event) => {
      setSearchTerm(event.target.value);
      const filteredUsers = users.filter((user) => {
         return (
            user.userEmail
               .toLowerCase()
               .includes(event.target.value.toLowerCase()) ||
            user.userName
               .toLowerCase()
               .includes(event.target.value.toLowerCase()) ||
            user.userPhone
               .toLowerCase()
               .includes(event.target.value.toLowerCase())
         );
      });

      setDisplayUser(filteredUsers);
   };

   const handleRangedUsers = () => {
      if (range.length === 0 || range.length === 1) {
         setDisplayUser(users);
      } else {
         const minAge = range[0];
         const maxAge = range[1];
         const filteredUsers = displayUser.filter((user) => {
            return user.userAge >= minAge && user.userAge <= maxAge;
         });

         setDisplayUser(filteredUsers);
      }
   };

   const handleDeleteUser = (uid, _id) => {
      console.log(uid);
      axiosInstance.delete(`/user?uid=${uid}&&_id=${_id}`).then(({ data }) => {
         if (data.deletedCount === 1) {
            const filteredUsers = displayUser.filter((user) => {
               return user.uid !== uid;
            });
            setDisplayUser(filteredUsers);
         }
      });
   };

   const handleChange = (e, uid, _id) => {
      const userToDelete = { uid, _id };

      if (e.target.checked) {
         setSelectedUsers([...selectedUsers, userToDelete]);
      } else {
         setSelectedUsers(selectedUsers.filter((user) => user.uid !== uid));
      }
   };

   console.log(selectedUsers);

   const deleteUsersHandler = () => {
      console.log('deleting users');
      axiosInstance
         .delete(`/users`, { data: selectedUsers })
         .then(({ data }) => {
            console.log(data);
            if (data.deletedCountFromFirebase > 0) {
               const filteredUsers = displayUser.filter((user) => {
                  return selectedUsers.every((selectedUser) => {
                     return user._id !== selectedUser._id;
                  });
               });
               setDisplayUser(filteredUsers);
               setSelectedUsers([]);
            }
         });
   };

   return (
      <div>
         <Header />
         <Container maxWidth='lg'>
            <Typography
               sx={{ textAlign: 'center', fontWeight: 'bold', my: 5 }}
               variant='h4'
               color='primary'
            >
               User List
            </Typography>
            <Box
               sx={{
                  boxShadow: '0 4px 20px rgba(0,0,0,.12)',
                  p: 2,
                  mb: 2,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
               }}
            >
               <TextField
                  label='Search by user name, email or phone'
                  size='small'
                  sx={{ minWidth: '320px', mr: 2 }}
                  onChange={searchTermChangeHandler}
               />
               <TextField
                  label='Filter by age range ex: 19-25'
                  size='small'
                  sx={{ minWidth: '320px', mr: 2 }}
                  onChange={(e) => setRange(e.target.value.split('-'))}
               />
               <Button onClick={handleRangedUsers}>Set Range</Button>
            </Box>
            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                     <TableRow>
                        <TableCell align='left'>Select</TableCell>
                        <TableCell align='center'>Name</TableCell>
                        <TableCell align='right'>Email</TableCell>
                        <TableCell align='right'>Phone</TableCell>
                        <TableCell align='right'>Age</TableCell>
                        <TableCell align='right'>Type</TableCell>
                        <TableCell align='right'>Working Area</TableCell>
                        <TableCell align='right'>Action</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {displayUser.map(
                        ({
                           _id,
                           userName,
                           userEmail,
                           userPhone,
                           userAge,
                           workingArea,
                           type,
                           uid,
                        }) => (
                           <TableRow
                              key={_id}
                              sx={{
                                 '&:last-child td, &:last-child th': {
                                    border: 0,
                                 },
                              }}
                           >
                              <TableCell component='th' scope='row'>
                                 <input
                                    type='checkbox'
                                    onChange={(e) => handleChange(e, uid, _id)}
                                 />
                              </TableCell>
                              <TableCell align='center'>{userName}</TableCell>
                              <TableCell align='right'>{userEmail}</TableCell>
                              <TableCell align='right'>{userPhone}</TableCell>
                              <TableCell align='right'>{userAge}</TableCell>
                              <TableCell align='right'>{type}</TableCell>
                              <TableCell align='right'>
                                 {workingArea ? workingArea : 'n/a'}
                              </TableCell>
                              <TableCell align='right'>
                                 <RemoveCircleIcon
                                    sx={{ cursor: 'pointer' }}
                                    titleAccess='user will not be able to access to their account'
                                    onClick={() => handleDeleteUser(uid, _id)}
                                 />
                              </TableCell>
                           </TableRow>
                        )
                     )}
                  </TableBody>
               </Table>
            </TableContainer>
            {selectedUsers.length > 1 && (
               <>
                  <Button
                     color='error'
                     variant='contained'
                     sx={{ mt: 2 }}
                     onClick={deleteUsersHandler}
                  >
                     Delete All
                  </Button>
                  <Typography color='error'>
                     Deleted Users will not be able to access their account and
                     also their data will be deleted from database!
                  </Typography>
               </>
            )}
            <Pagination
               count={pageCount}
               variant='outlined'
               color='primary'
               page={page}
               onChange={handlePageChange}
               sx={{ '& ul': { justifyContent: 'center' }, my: 3 }}
            />
         </Container>
      </div>
   );
};

export default Admin;
