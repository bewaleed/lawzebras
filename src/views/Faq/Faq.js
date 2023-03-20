import React, {useState, useEffect} from 'react';
import Services from '../../services';
import Loader from "react-loader-spinner";
import { Markup } from 'interweave';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { CKEditor } from 'ckeditor4-react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },
    notFound:{
        fontSize: theme.typography.pxToRem(18),
        padding:"20px"
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
    }
}));

export default function Faq() {
    const [showEditor , setEditor] = useState(false);
    const [loadingId, setLoadingId] = useState({});
    const [description , setquestion] = useState('');
    const [showLoader , setLoader] = useState(false);
    const [editContent , setEditContent] = useState({id:null,description:""});
    const [showFaqs , setResult] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        setLoader(true);
        Services.admin.getFaqs().then(response => {
            setResult(response.data.data);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoader(false);
        })
    }, [])
    const setEleLoader = (type , target) => {
        const id  = target;
        setLoadingId(ids => ({
            ...ids,
            [id]: type==true?true:false
        }));
    }
    const addQuestion = (id) => {
        setEleLoader(true,id)
        if(editContent['id']==null){
            Services.admin.AddFaqs(description.toString()).then(response => {
                setResult(showFaqs.concat(response.data.data));
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setEleLoader(false,id)
                setEditor(false)
            })
        }else{
            Services.admin.updateFaq(description.toString(),editContent['id']).then(response => {
               console.log(response)
               const index = showFaqs.findIndex(x=> x._id === editContent['id'])
               let updateObject = showFaqs[index]
               updateObject['description'] = description
               setResult(
                [
                  ...showFaqs.slice(0,index),
                   updateObject,
                   ...showFaqs.slice(index+1)
                ]
               );
               setEditContent({
                id:null,
                description:"",
              })
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setEleLoader(false,id)
                setEditor(false)
            })
        }
    }
    const delFaq = (faqId , key) => {
        setEleLoader(true,faqId)
        Services.admin.deleteFaq(faqId).then(response => {
            console.log(response);
            setResult(showFaqs=>showFaqs.filter(i => i._id !== key._id));
          }).catch((error) => {
            console.log(error);
            setEleLoader(false,faqId)
          }).finally(() => {
            setEleLoader(false,faqId)
        })
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
    const editFaq = (index) => {
        let content = showFaqs[index]
        setEditContent({
          id:content._id,
          description:content.description,
        })
        setEditor(true)
    }
    return (
        <div className={classes.root}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite} style={{margin:"0"}}>
                        Manage Faqs
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
                            <Icon fontSize="medium" style={{marginRight:"2px"}}>
                                <AddIcon size={12} />
                            </Icon>
                            Add New Faq
                        </Button>
                    </Box>
                    {showEditor?
                    <Box className={classes.boxMargin}>
                        <CKEditor 
                        initData={<Markup content={editContent['description']} />}
                        onChange={((evt)=>setquestion(evt.editor.getData()))} />
                        <Box align="right" my={4}>
                            {loadingId['saveTo1'] ? eleLoader
                                :
                                <Button id="saveTo1" className={classes.buttonNew}
                                    onClick={(()=>addQuestion('saveTo1'))}>
                                    Save
                                </Button>
                            }
                        </Box>
                    </Box>
                    :null}
                    {showFaqs.length>0?
                        showFaqs.map((list , key) => {
                        return(
                            <Accordion key={key}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                <Typography variant="h5" className={classes.heading}>
                                    Question {key+1}
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography style={{width:"100%"}}>
                                        <Box display="flex" justifyContent="flex-end">
                                            {loadingId[list._id] ? eleLoader
                                               :
                                                <>
                                                    <Button id={list._id} variant="contained"
                                                        style={{marginRight:"5px"}}  onClick={()=>editFaq(key)}>
                                                        <Icon 
                                                            style={{color:"rgba(0, 0, 0, 0.54)"}}>
                                                            <EditIcon style={{fontSize:"22px"}}/>
                                                        </Icon>
                                                    </Button>  
                                                    <Button id={list._id} variant="contained" onClick={()=>delFaq(list._id,list)}>  
                                                        <Icon id={list._id} color="secondary">
                                                            <DeleteIcon style={{fontSize:"22px"}}  />
                                                        </Icon>
                                                    </Button>    
                                                </>
                                            }
                                        </Box>
                                        <Markup content={list.description} />
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )
                    }): <Typography variant="h6" align="center" className={classes.notFound} >
                            NO FAQ Found
                        </Typography>
                    }
                </CardBody>
            }
            </Card>
        </div>
    );
}
