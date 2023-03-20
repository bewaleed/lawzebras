import React, { useEffect, useState } from "react";
import Services from "../../services";
import Loader from "react-loader-spinner";
import Avatar from "@material-ui/core/Avatar";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import CancelIcon from "@material-ui/icons/Cancel";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
// @material-ui/core components
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import { SortData } from "views/components/UseFullScripts";
import swal from 'sweetalert';
const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  formControl: {
    margin: theme.spacing(0),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AdminUsers() {
  const [users, setUsers] = useState();
  const [showLoader, setLoader] = useState(false);
  const [loadingId, setLoadingId] = useState({});
  const [open, setOpen] = useState(false);
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const getUsers = () => {
    setLoader(true);
    Services.admin
      .getUsers()
      .then((response) => {
        setUsers(response.data.data.filter((x)=>x.status!=="delete"));
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      })
      .finally(() => {});
  };
  useEffect(() => {
    getUsers();
  }, []);
  const setStatus = (e, userId, status) => {
    const { id } = e.currentTarget;
    setLoadingId((ids) => ({
      ...ids,
      [id]: true,
    }));
    Services.admin
      .userStatus(userId, status)
      .then((response) => {
        if(status=="delete"){
          setUsers(users.filter((x)=>x._id!==userId))
        }else{
          const index = users.findIndex((x) => x._id === id);
          let updateObject = users[index];
          updateObject["status"] = status;
          setUsers([
            ...users.slice(0, index),
            updateObject,
            ...users.slice(index + 1),
          ]);
        }
        console.log(response.data)
        setLoadingId((ids) => ({
          ...ids,
          [id]: false,
        }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const SwalAlert = (text,icon)=> {
    swal({
      text: text,
      icon: icon,
    });
  }
  const addNewUser = (e) => {
    const { id } = e.currentTarget;
    setLoadingId((ids) => ({
      ...ids,
      [id]: true,
    }));
    Services.admin
      .addUser(email, full_name, "controls")
      .then((response) => {
        // setUsers(SortData(response.data.data));
        console.log(response);
        SwalAlert("User created successfully",'success')
      })
      .catch((error) => {
        const {response} = error
        SwalAlert(response.data.message,'error')
      })
      .finally(() => {
        setLoadingId((ids) => ({
          ...ids,
          [id]: false,
        }));
      });
  };
  const columns = [
    { field: "full_name", title: "Full name", width: 130 },
    {
      field: "image",
      title: "Image",
      render: (rowData) => (
        <Avatar
          alt={rowData.full_name}
          src={rowData.image.url}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    { field: "email", title: "Email", width: 130 },
    {
      field: "phone_number",
      title: "Phone number",
      width: 130,
      render: (rowData) => (rowData.phone_number ? "Verified" : "Not provided"),
    },
    {
      field: "is_verified",
      title: "Verified",
      render: (rowData) =>
        rowData.is_verified ? (
          <VerifiedUserIcon style={{ color: "#37e218" }} />
        ) : (
          <CancelIcon style={{ color: "#c10447" }} />
        ),
    },
    {
      field: "status",
      title: "Status",
      render: (rowData) =>
        loadingId[rowData._id] ? (
          <Loader type="ThreeDots" color="#29abe1" height={40} width={40} />
        ) : (
          <Box display="flex">
            {rowData.status !== "active" ? (
              <Box mr={2}>
                <Button
                  variant="contained"
                  id={rowData._id}
                  onClick={(e) => setStatus(e, rowData._id, "active")}
                  color="primary"
                >
                  Active
                </Button>
              </Box>
            ) : null}
            {rowData.status !== "blocked" ? (
              <Button
                id={rowData._id}
                variant="contained"
                onClick={(e) => setStatus(e, rowData._id, "blocked")}
                
              >
                Block
              </Button>
            ) : null}
            <Button
              id={rowData._id}
              variant="contained"
              style={{marginLeft:"10px"}}
              onClick={(e) => setStatus(e, rowData._id, "delete")}
              color="secondary"
            >
              Delete
            </Button>
          </Box>
        ),
    },
  ];

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Admin Users</h4>
            </CardHeader>
            <CardBody>
              {showLoader ? (
                <Box align="center" my={4}>
                  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000}
                  />
                </Box>
              ) : (
                <>
                  <Box align="right" my={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClickOpen}
                    >
                      <PersonAddIcon
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      />{" "}
                      Add new user
                    </Button>
                  </Box>
                  <MaterialTable
                    columns={columns}
                    title={false}
                    data={users}
                    options={{
                      exportButton: true,
                      sorting: true,
                      filter: true,
                    }}
                  />
                </>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              disabled={loadingId["sav_user"] ? true:false}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add New User
            </Typography>
            {loadingId["sav_user"] ? (
              <Loader type="ThreeDots" color="#fff" height={40} width={40} />
            ) : (
              <Button
                autoFocus
                color="inherit"
                id="sav_user"
                onClick={addNewUser}
              >
                save
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Box
          mt={5}
          px={5}
          pt={5}
          style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
        >
          <GridContainer>
            <GridItem xs={12} md={6}>
              <Box mb={4}>
                <TextField
                  label="Full Name"
                  value={full_name}
                  defaultValue=""
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Box>
            </GridItem>
            <GridItem xs={12} md={6}>
              <Box mb={4}>
                <TextField
                  label="Email"
                  defaultValue=""
                  value={email}
                  variant="outlined"
                  fullWidth
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
            </GridItem>
            <GridItem xs={12} md={6}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="select-role">Select Role</InputLabel>
                <Select labelId="select-role" fullWidth label="Select Role">
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
          </GridContainer>
        </Box>
      </Dialog>
    </>
  );
}
