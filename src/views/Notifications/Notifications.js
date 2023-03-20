/*eslint-disable*/
import React,{useEffect,useState} from "react";
import Services from '../../services';
import Box from "@material-ui/core/Box";
import Loader from "react-loader-spinner";
import ReactPaginate from 'react-paginate';
import Typography from '@material-ui/core/Typography';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import GavelOutlinedIcon from "@material-ui/icons/GavelOutlined";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
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

export default function Notifications() {
  const classes = useStyles()
  const [notifications,setNotifications] = useState("")
  const [showLoader,setLoader] = useState(false)
  const [currentPage, setPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [openAlert, setopenAlert] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setLoader(true)
    Services.admin.getNotifications().then(response => {
      setNotifications(response.data.data) 
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoader(false)
    })
  }, [])
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = notifications.slice(indexOfFirstPost, indexOfLastPost);
  const setPageNumber = (number) => {
    setPage(number.selected + 1)
  }
  const handleClose = (id) => {
    Services.admin.deleteNotification(id).then(response => {
      setMessage(response.data.data)
      setNotifications(notifications=>notifications.filter(i => i._id !== id));
      setopenAlert(true);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
    })
  }
  const getStateData = (data) => {
    setopenAlert(data)
  }
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>All Notifications</h4>
      </CardHeader>
      <CardBody> 
        <GridContainer>
          <GridItem xs={12}>
            <br />
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
              notifications.length>0?
                <>
                  {currentPosts.map((list,key) => {
                    return (
                      <SnackbarContent
                        key={key}
                        message={list.body}
                        close
                        hanldeEvent={()=>handleClose(list._id)}
                        icon={list.title=="user_sign_up"?PersonAddIcon:
                          list.title=="lawyer_sign_up"?GavelOutlinedIcon:AddAlert
                        }
                      />
                    )
                  })}
                  <Box className="pagination-custom-area" mt={5}>
                    <ReactPaginate
                      pageCount  = { notifications.length / postsPerPage }
                      pageRangeDisplayed = {postsPerPage}
                      onPageChange = { number => setPageNumber(number) }
                      previousLabel={"<"}
                      nextLabel={">"}
                    />
                  </Box>
                </>
              :
              <Box mt={5}>
                <Typography variant="h6" align="center">
                  No Record Found
                </Typography>
              </Box>
            }
          </GridItem>
        </GridContainer>
        <br />
      </CardBody>
      <SnackbarComponent message={message} visible={openAlert} getStateData={getStateData} />
    </Card>
  );
}
