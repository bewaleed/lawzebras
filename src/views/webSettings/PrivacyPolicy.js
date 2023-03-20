import React, {useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Loader from "react-loader-spinner";
import Icon from '@material-ui/core/Icon';
import { Markup } from 'interweave';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { CKEditor } from 'ckeditor4-react';
import Services from '../../services';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    snackbar: {
        backgroundColor: "#29abe1",
        color: "#fff"
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
    },
    boxMargin:{
        margin:"20px 0"
    },
    buttonNew: {
        background:"#29abe1 !important",
        color:"#fff",
        padding:"10px 20px"
    },
    editorResult: {
        fontSize:"14px"
    },
    editorResultHeading: {
        fontSize:"18px",
        marginBottom:"10px",
        fontWeight:"600"
    }
}));

export default function PrivacyPolicy() {
    const [showEditor , setEditor] = useState(false)
    const [showLoader , setLoader] = useState(false)
    const [description , setquestion] = useState('')
    const [loadingId, setLoadingId] = useState({})
    const [showResult , setResult] = useState([])
    const classes = useStyles()
    const location = useLocation()
    const setLocation = location.pathname=="/admin/privacyPolicy"
    const getLocationName = setLocation?"privacy policy":
    location.pathname=="/admin/disclaimer"?"disclaimer":
    location.pathname=="/admin/about-us"? "about us" : "terms & conditions"
    useEffect(() => {
        setLoader(true);
        Services.admin.getPrivacy(getLocationName).then(response => {
            setResult(response.data.data)
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoader(false);
        })
    }, [])
    const addData = (id) => {
        setEleLoader(true,id)
        Services.admin.updatePrivacy(description.toString(),getLocationName).then(response => {
            if(showResult.length>0){
                showResult.splice(0, 1)
                setResult(showResult.concat(response.data.data))
            }else{
                setResult(showResult.concat(response.data.data))
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setEleLoader(false,id)
            setEditor(false)
        })
    }
    const setEleLoader = (type , target) => {
        const id  = target;
        setLoadingId(ids => ({
            ...ids,
            [id]: type==true?true:false
        }));
    }
    const eleLoader = () => {
        return(
            <Box align="right">
                <Loader
                    type="ThreeDots"
                    color="#29abe1"
                    height={40}
                    width={40}
                />
            </Box>
        )
    }
    const delItem = (id) => {
        setEleLoader(true,id)
        Services.admin.deletePrivacy(id,getLocationName).then(response => {
            console.log(response);
            setResult(showResult=>showResult.filter(i => i._id !== id));
          }).catch((error) => {
            console.log(error);
            setEleLoader(false,id)
          }).finally(() => {
            setEleLoader(false,id)
        })
    }
    return (
        <div className={classes.root}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite} style={{margin:"0",textTransform:"capitalize"}}>
                        {getLocationName=="terms"?"Terms & Conditions":getLocationName}
                    </h4>
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
                    <Box align="right" className={classes.boxMargin}>
                        <Button className={classes.buttonNew}
                            onClick={(()=>setEditor(!showEditor))}>
                            <Icon fontSize="medium" style={{marginRight:"5px"}}>
                                <EditIcon size={10} />
                            </Icon>
                            Edit {getLocationName=="terms"?"Terms & Conditions":getLocationName}
                        </Button>
                    </Box>
                    {showEditor?
                    <Box className={classes.boxMargin}>
                      <CKEditor initData={showResult.length>0?
                        <Markup content={showResult[0].description} />:null}
                        onChange={((evt)=>setquestion(evt.editor.getData()))} />
                        <Box align="right" my={4}>
                            {loadingId['saveTo1'] ? eleLoader
                                :
                                <Button id="saveTo1" className={classes.buttonNew}
                                    onClick={(()=>addData('saveTo1'))}>
                                    Save
                                </Button>
                            }
                        </Box>
                    </Box>
                    :null}
                    <Box my={4}>
                        {showResult.length>0?
                            showResult.map((item,key) => {
                                return(
                                    <>
                                        <Box align="right">
                                            {loadingId[item._id] ? eleLoader
                                            :
                                                <Button id={item._id} variant="contained"
                                                    onClick={()=>delItem(item._id)}>  
                                                    <Icon id={item._id} color="secondary">
                                                        <DeleteIcon style={{fontSize:"22px"}}  />
                                                    </Icon>
                                                </Button> 
                                            }
                                        </Box> 
                                        <Markup key={key} content={item.description} />
                                    </>
                                )
                            })
                        :   <Typography variant="h6" align="center" className={classes.notFound}>
                              {getLocationName=="terms"?"Terms & Conditions":getLocationName + " Not Added Yet"}
                            </Typography>
                        }
                    </Box>
                </CardBody>}
            </Card>
        </div>
    );
}
