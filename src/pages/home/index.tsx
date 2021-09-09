import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import {
    Box,
    Dialog,
    IconButton,
    DialogContent,
    DialogActions,
    DialogContentText,
    TableHead,
    TableRow,
    TableBody,
    Table,
    TableCell,
    Button,
    makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import userService from '../../services/userService';
import history from '../../history';

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px',
        paddingLeft: '50px',
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF',
        },
    },
    row: {
        '& > *': {
            fontSize: 18,
        },
    },
});

function Home() {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [users, setUsers] = useState<any[]>([]);

    const [selectedRow, setSelectedRow] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        hobbies: '',
    });

    const creatingUser = async () => {
        try {
            const data = await userService.createUser({
                name,
                phoneNumber,
                email,
                hobbies,
            });
            setName('');
            setPhoneNumber('');
            setEmail('');
            setHobbies('');
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUserList = async () => {
        try {
            const data = await userService.getAllUser();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async (id: any) => {
        try {
            const data = await userService.deleteUser(id);
            if (data) {
                alert('Deleted user successfully');
            }
            window.location = window.location;
            history.push('/home');
        } catch (error) {
            console.log(error);
        }
    };

    const sendEmail = (e: any) => {
        e.preventDefault();
        window.location.href = 'mailto:' + 'uttampatro786@gmail.com';
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    const [showDialog, setShowDialog] = useState(false);

    const openDialog = () => setShowDialog(true);
    const closeDialog = () => setShowDialog(false);

    return (
        <div className="home">
            <div className="homeHeader">
                <h2>User Details</h2>
                <Button variant="contained" onClick={openDialog}>
                    Add User
                </Button>
                <Dialog open={showDialog}>
                    <div className="userDetails_closeButton">
                        {closeDialog ? (
                            <IconButton
                                aria-label="close"
                                className="closeButton"
                                onClick={closeDialog}
                            >
                                <CloseIcon className="closeButton" />
                            </IconButton>
                        ) : null}
                        <h2 className="dialogContent_p">Add User</h2>
                    </div>
                    <form onSubmit={closeDialog} action="">
                        <DialogContent dividers>
                            <Box width="400px" height="300px">
                                <DialogContentText>
                                    <div className="dialog_form">
                                        <h5>Name</h5>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            required
                                            onChange={e =>
                                                setName(e.target.value)
                                            }
                                        />
                                        <h5>Phone Number</h5>
                                        <input
                                            type="number"
                                            placeholder="Phone Number"
                                            value={phoneNumber}
                                            required
                                            onChange={e =>
                                                setPhoneNumber(e.target.value)
                                            }
                                        />
                                        <h5>Email</h5>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            required
                                            onChange={e =>
                                                setEmail(e.target.value)
                                            }
                                        />

                                        <h5>Hobbies</h5>
                                        <input
                                            type="text"
                                            placeholder="Hobbies"
                                            value={hobbies}
                                            required
                                            onChange={e =>
                                                setHobbies(e.target.value)
                                            }
                                        />
                                    </div>
                                </DialogContentText>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <button
                                onClick={creatingUser}
                                type="submit"
                                className="home_addUserButton"
                            >
                                Create User
                            </button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>

            <form method="post">
                <div className="home_body">
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.thead}>
                                <TableCell></TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Hobbies</TableCell>
                                <TableCell>Update/Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow
                                    className={classes.row}
                                    key={user._id}
                                >
                                    <TableCell>
                                        <input
                                            style={{ cursor: 'pointer' }}
                                            type="checkbox"
                                        />
                                    </TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.hobbies}</TableCell>
                                    <TableCell>
                                        <Link to={`/updateUser/${user._id}`}>
                                            <Button
                                                key={user._id}
                                                color="primary"
                                                variant="contained"
                                            >
                                                Update
                                            </Button>
                                        </Link>{' '}
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="home_footer">
                    <Button
                        onClick={sendEmail}
                        variant="contained"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Home;
