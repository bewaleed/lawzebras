import React,{useState,useEffect} from "react";
import Services from '../../services';
import Loader from "react-loader-spinner";
import Avatar from '@material-ui/core/Avatar';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from 'material-table';
const styles = {
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
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const [users , setUsers] = useState();
  const [showLoader , setLoader] = useState(false);
  const [loadingId, setLoadingId] = useState({});
  const getUsers = () => {
    setLoader(true);
    Services.admin.getLawyers().then(response => {
      // console.log(response.data.data)
      setUsers(response.data.data.filter((x)=>x.user.status!=="delete"));     
      setLoader(false);
    }).catch((error) => {
      console.log(error);
      setLoader(false);
    }).finally(() => {
    })
  }
  useEffect(() => {
    getUsers()
  }, [])
  const setStatus = (e,status) => {
    const { id } = e.currentTarget;
    setLoadingId(ids => ({
      ...ids,
      [id]: true
    }));
    Services.admin.lawyerStatus(status , id).then(response => {
      console.log(response)
      if(status=="delete"){
        setUsers(users.filter((x)=>x.user._id!==id))
      }else{
        const index = users.findIndex(x=> x.user._id === id)
        let updateObject = users[index]
        updateObject['status'] = status
        setUsers(
          [
           ...users.slice(0,index),
            updateObject,
            ...users.slice(index+1)
          ]
        );
      }
      setLoadingId(ids => ({
        ...ids,
        [id]: false
      }));
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
    })
  }
  const objectData = (data) => {
    return(
      Object.entries(data).map(function([keyName, value]) {
        return(value?<Box mb={2} key={value}>{<b>{keyName.replace(/_/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase())} : <br/></b>}{value}</Box>:null)
      })
    )
  }
  const columns = [
    { field: 'user.full_name', title: 'Full name'},
    { field: 'user.image', title: 'Image',render: 
     rowData => 
     <Avatar alt={rowData.user.full_name} src={rowData.user.image.url} style={{width:"50px",height:"50px"}} />},
    { field: 'user.email', title: 'Email'},
    { field: 'user.phone_number', title: 'Phone number',width: 200,
    render: rowData => rowData.phone_number ? "Verified":"Not provided" },
    { field: 'address.line_one', title: 'Address'},
    { field: 'address.state', title: 'State'},
    { field: 'user.qualifications', title: 'Qualifications',render: 
      rowData => objectData(rowData.qualifications)
    },
    { field: 'education', title: 'Education', render: 
      rowData => objectData(rowData.education)
    },
    { field: 'free_consultatios.initial_consultations', title: 'Free Consultations', render: rowData => rowData.free_consultatios.initial_consultations ? "Yes":"No"},
    { field: 'specialities_array', title: 'specialites',width:200, render: rowData => rowData.specialities_array.map((item,index)=>{return(<Box key={index}>{index+1+"- "}{item.speciality}</Box>)})},
    { field: 'user.status', title: 'Status', 
      render: rowData => loadingId[rowData.user._id] ? <Loader
        type="ThreeDots"
        color="#29abe1"
        height={40}
        width={40}
      />:
      <Box display="flex">{rowData.status!=="approved"?
      <Box mr={2}>
        <Button variant="contained" id={rowData.user._id} onClick={((e)=>setStatus(e,'approved'))} color="primary">Approve</Button>
      </Box>:null}{rowData.status!=="declined"?
      <Button variant="contained" id={rowData.user._id}  onClick={((e)=>setStatus(e,'declined'))}>Reject</Button>
      :null}
      <Button
        id={rowData.user._id}
        variant="contained"
        style={{marginLeft:"10px"}}
        onClick={(e) => setStatus(e, "delete" )}
        color="secondary"
      >
        Delete
      </Button>
      </Box>
    },
  ];
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Lawyers</h4>
          </CardHeader>
          <CardBody>
            {showLoader && !users?
              <Box align="center" my={4}>
                <Loader
                  type="Puff"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  timeout={3000}
                />
              </Box>:
              <MaterialTable  columns={columns}
                title={false}
                data={users}
                options={{
                  exportButton: true,
                  sorting: true,
                  filter: true,
                }} 
              />
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
