import React, { useEffect, useState } from "react";
import Services from '../../services';
import Loader from "react-loader-spinner";
import Avatar from '@material-ui/core/Avatar';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CancelIcon from '@material-ui/icons/Cancel';
// @material-ui/core components
import MaterialTable from 'material-table';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControl from '@material-ui/core/FormControl';
import { SortData } from "views/components/UseFullScripts";
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
    position: 'relative',
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
  innerHeading: {
    marginBottom: theme.spacing(2.5),
    marginTop: theme.spacing(2.5),
    fontSize:"15px",
    fontWeight:"500",
    color:"#535151"
  },
  mainHeading: {
    fontWeight:"700",
    marginBottom:theme.spacing(0)
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function UserRoles() {
  const [users, setUsers] = useState();
  const [showLoader , setLoader] = useState(false);
  const [loadingId, setLoadingId] = useState({});
  const [open, setOpen] = useState(false);
  const [rolesArray, setRolesArray] = useState([]);
  const classes = useStyles();
  const getUsers = () => {
    setLoader(true);
    Services.admin.getUsers().then(response => {
      setUsers(SortData(response.data.data)) 
      setLoader(false);
    }).catch((error) => {
      console.log(error);
      setLoader(false);
    }).finally(() => {
    })
  }
  useEffect(() => {
    const rolesData = [{
      "role_name":"role1",
      "dashboard":{
        view_dashboard:false,
      },
      "lawyer":{
        view_dashboard:false,
        approve_decline_laywers :false,
        block_laywers :false,
      },
      "customer_management":{
        view_customers:false,
        block_customers :false,
      },
      "payment_history":{
        view_payment_history:false,
      },
      "faqs":{
        view_faqs:false,
        faqs_actions:false,
      },
      "website_settings":{
        view_website_settings:false,
        website_settings_actions:false,
      },
      "notifications":{
        view_notifications:false,
        delete_notifications:false,
      }
    }]
    setRolesArray(rolesData)
    getUsers()
  }, [])
  const setStatus = (e , userId , status) => {
    const { id } = e.currentTarget;
    setLoadingId(ids => ({
      ...ids,
      [id]: true
    }));
    Services.admin.userStatus(userId , status).then(response => {
      console.log(response)
      const index = users.findIndex(x=> x._id === id)
      let updateObject = users[index]
      updateObject['status'] = status
      setUsers(
        [
         ...users.slice(0,index),
          updateObject,
          ...users.slice(index+1)
        ]
      );
      setLoadingId(ids => ({
        ...ids,
        [id]: false
      }));
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
    })
  }
  const setSelection = (value,category,type) => {
    rolesArray[0].dashboard.view_dashboard = value;
    console.log(rolesArray[0])
    
    console.log(value +" "+ type);
  }
  const saveRoles = () => {
    console.log(rolesArray)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  // const rolesArray = { 
  //   "category" :"dashboard",
  //   "sub_categories" : ["view-dashboard" , "edit-dashboard"],
  //   "category" :"lawyer",
  //   "sub_categories" : ["view-lawyer" , "edit-lawyer"]
  // }
  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { field: 'full_name', title: 'Full name', width: 130 },
    { field: 'image', title: 'Image',render: rowData => 
     <Avatar alt={rowData.full_name} src={rowData.image.url} style={{width:"50px",height:"50px"}} />
    },
    { field: 'email', title: 'Email', width: 130 },
    { field: 'phone_number', title: 'Phone number', width: 130,
    render: rowData => rowData.phone_number ? "Verified":"Not provided" },
    {field: 'is_verified', title: 'Verified', render: rowData => rowData.is_verified ? <VerifiedUserIcon style={{color:"#37e218"}} />:<CancelIcon style={{color:"#c10447"}} />},
    {field: 'status', title: 'Status', render: rowData => 
      loadingId[rowData._id] ?
      <Loader
        type="ThreeDots"
        color="#29abe1"
        height={40}
        width={40}
      />:
      <Box display="flex">{rowData.status!=="active"?
      <Box mr={2}><Button variant="contained" id={rowData._id} onClick={((e)=>setStatus(e, rowData._id,'active'))} color="primary">Active</Button>
      </Box>:null}{rowData.status!=="blocked"?<Button id={rowData._id} variant="contained" onClick={((e)=>setStatus(e, rowData._id,'blocked'))}
      color="secondary">Block</Button>:null}
      </Box>
    },
  ];

  return (
    <>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>User Roles</h4>
          </CardHeader>
          <CardBody>
            {showLoader?   
            <Box align="center" my={4}>
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000}
              />
            </Box>
            :
              <>
                <Box align="right" my={4}>
                  <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    <AddCircleIcon style={{marginRight:"10px",fontSize:"20px"}}  /> Add new Role
                  </Button>
                </Box>
                <MaterialTable  columns={columns}
                  title={false}
                  data={users}
                  options={{
                    exportButton: true,
                    sorting: true,
                    filter: true,
                  }} 
                />
              </>
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add new Role
          </Typography>
          <Button autoFocus color="inherit" onClick={saveRoles}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Box mt={5} px={5} pt={5} style={{maxWidth:"700px",marginLeft:"auto",marginRight:"auto"}}>
        <GridContainer>
          <GridItem xs={12}>
            <Box mb={4}>
              <TextField
                label="Role Name"
                defaultValue=""
                variant="outlined"
                fullWidth
              />
            </Box>
          </GridItem>
        </GridContainer>
        <Typography variant="h6" className={classes.mainHeading}>
            Roles
        </Typography>
        <FormControl component="fieldset">
            <Typography className={classes.innerHeading}>
                Dashboard
                <br />
            </Typography>
            <FormControlLabel control={<Checkbox color="primary" onChange={(e)=>setSelection(e.target.checked,"dashboard","view_dashboard")} />} label="Can view dashboard" />
            <Typography className={classes.innerHeading}>
                Lawyer Management
                <br />
            </Typography>
            <FormGroup row>
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can view lawyers " />
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can approve/decline lawyers" />
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can block lawyer" />
            </FormGroup>
            <Typography className={classes.innerHeading}>
                Customer Management
                <br />
            </Typography>
            <FormGroup row>
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can view customers" />
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can block customers" />
            </FormGroup>
            <Typography className={classes.innerHeading}>
                Payment History 
                <br />
            </Typography>
            <FormGroup row>
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can view payment history" />
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can view payment history" />
            </FormGroup>
            <Typography className={classes.innerHeading}>
                Reviews & Ratings
                <br />
            </Typography>
            <FormGroup row>
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can view Reviews & Ratings" />
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can approve/decline Reviews & Ratings" />
            </FormGroup>
            <Typography className={classes.innerHeading}>
                Faqs
                <br />
            </Typography>
            <FormGroup row>
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can view FAQs" />
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can add/edit/delete FAQs" />
            </FormGroup>
            <Typography className={classes.innerHeading}>
                Website Settings
                <br />
            </Typography>
            <FormGroup row>
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can view website settings" />
                <FormControlLabel  control={<Checkbox color="primary" />} label="Can add/edit/delete website settings" />
            </FormGroup>
            <Typography className={classes.innerHeading}>
                Notifications
                <br />
            </Typography>
            <Box mb={4}>
                <FormGroup row>
                    <FormControlLabel   control={<Checkbox color="primary" />} label="Can view notifications " />
                    <FormControlLabel  control={<Checkbox color="primary" />} label="Can delete notifications" />
                </FormGroup>
            </Box>
        </FormControl>
      </Box>
    </Dialog>
    </>
  );
}
