
import React,{useEffect,useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import RateReview from '@material-ui/icons/RateReview';
import Person from '@material-ui/icons/Person';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Services from '../../services';
import Rating from 'material-ui-rating';
import Loader from "react-loader-spinner";
import SnackbarComponent from '../components/SnackbarComponent';
const styles = {
  snackbar: {
    backgroundColor:"#29abe1",
    color:"#fff"
  },
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
  }
};

const useStyles = makeStyles(styles);

export default function Reviews() {
  const classes = useStyles();
  // const [showLoader , setLoader] = useState(false)
  const [showResult , setResult] = useState([])
  const [loadingId, setLoadingId] = useState({})
  const [openAlert, setopenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [showLoader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    Services.admin.getReviews().then(response => {
      setResult(response.data.data)
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoader(false);
    })
  }, [])
  const updateStatus = (id,status) => {
    setEleLoader(true,id)
    Services.admin.updateReviewStatus(status,id).then(response => {
      setMessage(response.data.data);
      setResult(showResult=>showResult.filter(i => i._id !== id));
      setopenAlert(true);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setEleLoader(false,id)
    })
  }
  const setEleLoader = (type , target) => {
    const id  = target;
    setLoadingId(ids => ({
      ...ids,
      [id]: type==true?true:false
    }));
  }
  const getStateData = (data) => {
    setopenAlert(data)
  }
  const eleLoader = () => {
    return(
      <Box align="left" style={{marginTop:'16px'}}>
        <Loader
          type="ThreeDots"
          color="#29abe1"
          height={36}
          width={36}
        />
      </Box>
      )
    }
    return (
    <>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>All Ratings</h4>
        </CardHeader>
        {showLoader?
        <Box align="center" my={4}>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        </Box>:
        <CardBody> 
          <GridContainer>
            {showResult.length > 0 ?
            showResult.map((list,key) => {
              return(
                <GridItem md={6} key={key}>
                  <Card style={{overflow:'hidden'}}>
                    <CardBody style={{padding:0}}>  
                      <Box display="flex">
                        <Box px={3} py={3} display="flex" flexDirection="column" alignItems="center" 
                          justifyContent="center"
                          style={{background: "linear-gradient(60deg, #29abe1, #673ab7)",minWidth:"180px"}}> 
                          <Box>
                            <h3 style={{textAlign:"center",color:"#fff",fontWeight:"600",margin:0,fontSize:"50px"}}>{list.rating}</h3>
                          </Box>
                          <Rating
                            value={list.rating}
                            max={5}
                            readOnly={true}
                            
                          />
                        </Box>
                        <Box px={3} py={3}>
                          <Typography variant="h5" style={{margin:0,display:"flex",fontSize:"15px",fontWeight:500,color:"#a7a7a7"}}> 
                            <span><Person style={{fontSize:"19px",marginRight:"5px"}} /></span> 
                            <span>Reviewed User: <span style={{fontSize:"14px",fontWeight:400,display:"inline-block",wordBreak:"break-all"}}>{list.user.full_name}</span></span>
                          </Typography>
                          <Typography variant="h5" style={{margin:0,display:"flex",fontSize:"15px",fontWeight:500,color:"#a7a7a7",marginTop:"10px"}}> 
                            <span><Person style={{fontSize:"19px",marginRight:"5px"}} /></span> 
                            <span>Lawyer: <span style={{fontSize:"14px",fontWeight:400,display:"inline-block",wordBreak:"break-all"}}>{list.lawyer.full_name}</span></span>
                          </Typography>
                          <Typography variant="h5" style={{margin:0,display:"flex",fontSize:"15px",fontWeight:500,color:"#a7a7a7",marginTop:"15px"}}> 
                            <span><RateReview style={{fontSize:"19px",marginRight:"5px"}} /></span> 
                            <span>Review</span>
                          </Typography>
                          <Typography style={{fontSize:"13px",marginTop:"5px"}}>{list.comment}</Typography>
                          <Box mt={3}>
                            {loadingId[list._id] ? eleLoader
                            :
                              <Box align="left">
                                <Button variant="outlined" id={list._id} color="primary" onClick={(()=>updateStatus(list._id,'approved'))} style={{marginRight:"10px"}}>Approve</Button>
                                <Button variant="outlined" id={list._id} color="secondary" onClick={(()=>updateStatus(list._id,'declined'))}>Reject</Button>
                              </Box>
                            }
                          </Box>
                        </Box>
                      </Box>
                    </CardBody>
                  </Card>
                </GridItem>
              )
            })
            :
            <GridItem sm={12}>
              <Box mt={5}>
                <Typography variant="h6" align="center">
                  No Record Found
                </Typography>
              </Box>
            </GridItem>
            }
          </GridContainer>
          <br />
        </CardBody>
      }
      </Card>
      <SnackbarComponent message={message} visible={openAlert} getStateData={getStateData} />
    </>
  );
}
