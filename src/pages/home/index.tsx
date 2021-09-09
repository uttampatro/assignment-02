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
import TableSortLabel from '@material-ui/core/TableSortLabel';

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px',
        paddingLeft: '50px',
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: 'lightgray',
        },
    },
    row: {
        '& > *': {
            fontSize: 18,
        },
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});

function Home() {
    const classes = useStyles();
    const [users, setUsers] = useState<any[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc' | undefined>('asc');
    const [orderBy, setOrderBy] = useState<string>('');
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [currentRow, setCurrentRow] = useState<any>({
        _id: '',
        name: '',
        phoneNumber: '',
        email: '',
        hobbies: '',
    });
    const [newUser, setNewUser] = useState<any>({
        name: '',
        phoneNumber: '',
        email: '',
        hobbies: '',
    });

    const createUser = async (e: any) => {
        e.preventDefault();
        try {
            await userService.createUser(newUser);
            setNewUser({
                name: '',
                phoneNumber: '',
                email: '',
                hobbies: '',
            });
            fetchUserList();
            closeAddUserDialog();
        } catch (error) {
            console.log(error);
            alert('something went wrong');
        }
    };

    const updateUser = async (e: any) => {
        e.preventDefault();
        try {
            await userService.updateUser(currentRow._id, {
                name: currentRow.name,
                phoneNumber: currentRow.phoneNumber,
                email: currentRow.email,
                hobbies: currentRow.hobbies,
            });
            setCurrentRow({
                _id: '',
                name: '',
                phoneNumber: '',
                email: '',
                hobbies: '',
            });
            fetchUserList();
            closeUpdateUserDialog();
        } catch (error) {
            console.log(error);
            alert('something went wrong');
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
        let body = ``;
        selectedRows.forEach((row, i) => {
            if (i > 0) body += `%0D`;
            body += `Name: ${row.name}, Phone: ${row.phoneNumber}, Email: ${row.email}, Hobbies: ${row.hobbies}`;
        });
        console.log(body);
        window.location.href = `mailto:info@redpositive.in?subject=${'Data'}&body=${body}`;
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    const [showAddUserDialog, setAddUserDialog] = useState(false);

    const openAddUserDialog = () => setAddUserDialog(true);
    const closeAddUserDialog = () => setAddUserDialog(false);

    const [showUpdateUserDialog, setUpdateUserDialog] = useState(false);

    const openUpdateUserDialog = (user: any) => {
        setCurrentRow(user);
        setUpdateUserDialog(true);
    };
    const closeUpdateUserDialog = () => setUpdateUserDialog(false);

    const onCheckBoxClick = (row: any) => {
        const rows = [...selectedRows];
        rows.push(row);
        setSelectedRows(rows);
    };

    const onAddInputChange = (e: any) => {
        setNewUser((prev: any) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const onUpdateInputChange = (e: any) => {
        setCurrentRow((prev: any) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const createSortHandler = (property: any) => (event: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const headCells = [
        { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        {
            id: 'phoneNumber',
            numeric: false,
            disablePadding: false,
            label: '  Phone Number',
        },
        { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
        {
            id: 'hobbies',
            numeric: false,
            disablePadding: false,
            label: 'Hobbies',
        },
    ];

    function descendingComparator(a: any, b: any, orderBy: any) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order: any, orderBy: any) {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array: any, comparator: any) {
        const stabilizedThis = array.map((el: any, index: any) => [el, index]);
        stabilizedThis.sort((a: any, b: any) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el: any) => el[0]);
    }

    return (
        <div className="home">
            <div className="homeHeader">
                <h2>User Details</h2>
                <Button variant="contained" onClick={openAddUserDialog}>
                    Add User
                </Button>
            </div>

            <form method="post">
                <div className="home_body">
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.thead}>
                                <TableCell padding="checkbox"></TableCell>

                                {headCells.map(headCell => (
                                    <TableCell
                                        key={headCell.id}
                                        align={
                                            headCell.numeric ? 'right' : 'left'
                                        }
                                        padding={
                                            headCell.disablePadding
                                                ? 'none'
                                                : 'normal'
                                        }
                                        sortDirection={
                                            orderBy === headCell.id
                                                ? order
                                                : false
                                        }
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={
                                                orderBy === headCell.id
                                                    ? order
                                                    : 'asc'
                                            }
                                            onClick={createSortHandler(
                                                headCell.id
                                            )}
                                        >
                                            {headCell.label}
                                            {orderBy === headCell.id ? (
                                                <span
                                                    className={
                                                        classes.visuallyHidden
                                                    }
                                                >
                                                    {order === 'desc'
                                                        ? 'sorted descending'
                                                        : 'sorted ascending'}
                                                </span>
                                            ) : null}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                <TableCell>Update/Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(
                                users,
                                getComparator(order, orderBy)
                            ).map((user: any) => {
                                return (
                                    <TableRow
                                        className={classes.row}
                                        key={user._id}
                                    >
                                        <TableCell>
                                            <input
                                                onClick={() =>
                                                    onCheckBoxClick(user)
                                                }
                                                style={{ cursor: 'pointer' }}
                                                type="checkbox"
                                            />
                                        </TableCell>
                                        <TableCell>{user._id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>
                                            {user.phoneNumber}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.hobbies}</TableCell>
                                        <TableCell>
                                            <Button
                                                style={{ marginBottom: '10px' }}
                                                onClick={() =>
                                                    openUpdateUserDialog(user)
                                                }
                                                key={user._id}
                                                color="primary"
                                                variant="contained"
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                onClick={() =>
                                                    deleteUser(user._id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                <div className="home_footer">
                    <Button
                        disabled={selectedRows.length === 0}
                        onClick={sendEmail}
                        variant="contained"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        Send
                    </Button>
                </div>
            </form>

            {/* Add User */}
            <Dialog open={showAddUserDialog}>
                <div className="userDetails_closeButton">
                    {closeAddUserDialog ? (
                        <IconButton
                            aria-label="close"
                            className="closeButton"
                            onClick={closeAddUserDialog}
                        >
                            <CloseIcon className="closeButton" />
                        </IconButton>
                    ) : null}
                    <h2 className="dialogContent_p">Add User</h2>
                </div>
                <form onSubmit={closeAddUserDialog} action="">
                    <DialogContent dividers>
                        <Box width="400px" height="300px">
                            <DialogContentText>
                                <div className="dialog_form">
                                    <h5>Name</h5>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={newUser.name}
                                        required
                                        name="name"
                                        onChange={onAddInputChange}
                                    />
                                    <h5>Phone Number</h5>
                                    <input
                                        type="number"
                                        placeholder="Phone Number"
                                        value={newUser.phoneNumber}
                                        required
                                        name="phoneNumber"
                                        onChange={onAddInputChange}
                                    />
                                    <h5>Email</h5>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={newUser.email}
                                        required
                                        name="email"
                                        onChange={onAddInputChange}
                                    />

                                    <h5>Hobbies</h5>
                                    <input
                                        type="text"
                                        placeholder="Hobbies"
                                        value={newUser.hobbies}
                                        required
                                        name="hobbies"
                                        onChange={onAddInputChange}
                                    />
                                </div>
                            </DialogContentText>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <button
                            onClick={createUser}
                            type="submit"
                            className="home_addUserButton"
                        >
                            Create User
                        </button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Update User  */}
            <Dialog open={showUpdateUserDialog}>
                <div className="userDetails_closeButton">
                    {closeUpdateUserDialog ? (
                        <IconButton
                            aria-label="close"
                            className="closeButton"
                            onClick={closeUpdateUserDialog}
                        >
                            <CloseIcon className="closeButton" />
                        </IconButton>
                    ) : null}
                    <h2 className="dialogContent_p">Update User</h2>
                </div>
                <form onSubmit={closeUpdateUserDialog} action="">
                    <DialogContent dividers>
                        <Box width="400px" height="300px">
                            <DialogContentText>
                                <div className="dialog_form">
                                    <h5>Name</h5>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={currentRow.name}
                                        name="name"
                                        required
                                        onChange={onUpdateInputChange}
                                    />
                                    <h5>Phone Number</h5>
                                    <input
                                        type="number"
                                        placeholder="Phone Number"
                                        value={currentRow.phoneNumber}
                                        required
                                        name="phoneNumber"
                                        onChange={onUpdateInputChange}
                                    />
                                    <h5>Email</h5>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={currentRow.email}
                                        required
                                        name="email"
                                        onChange={onUpdateInputChange}
                                    />

                                    <h5>Hobbies</h5>
                                    <input
                                        type="text"
                                        placeholder="Hobbies"
                                        value={currentRow.hobbies}
                                        required
                                        name="hobbies"
                                        onChange={onUpdateInputChange}
                                    />
                                </div>
                            </DialogContentText>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <button
                            onClick={updateUser}
                            type="submit"
                            className="home_addUserButton"
                        >
                            Update User
                        </button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default Home;
