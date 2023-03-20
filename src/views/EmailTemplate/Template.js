import React,{useEffect} from 'react'
import { CKEditor } from 'ckeditor4-react';
import { Markup } from 'interweave';
import Button from '@material-ui/core/Button';
import Services from '../../services';
import Box from '@material-ui/core/Box';
import SnackbarComponent from '../components/SnackbarComponent';
import CircularProgress from '@material-ui/core/CircularProgress';
const Template = (props) => {
    const [openAlert, setopenAlert] = React.useState(false);
    const [btnLoader, setBtnLoader] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [tempateValue, setTempateValue] = React.useState();
    const [loader, setLoader] = React.useState(false);
    const {request , classes } = props
    const initalData = request=="welcome"?"<p><b>Welcome - <%= Name %></b></p><br />":
    request=="forgotPassword"?
    "<p>Hi <b><%= Name %></b> click on this link to reset your password <a href='<% Reset_Link>'> <% Reset_Link></a></p><br />":
    request=="notification"?"<p>Hi <b><%= From %></b> <br /><b><%= Tittle %><b> <br /> <%= Body %></p>":request=="newBooking"?
    "<p>Hi <b><%= To %></b> you have been booked by <b><%= From %><b><br /></p>":null;
    const [welcomeTemplateData,setWelcomeTemplate] = React.useState('');
    const addData = (locationRoute,type) => {
        setBtnLoader(true);
        const bodyData =
        welcomeTemplateData.replace(/&lt;%= Name %&gt;/gi, "<%= Name %>").replace(/&lt;% Reset_Link&gt;/gi, "<%= Reset_Link %>").
        replace(/&lt;%= Tittle %&gt;/gi, "<%= Tittle %>").replace(/&lt;%= Body %&gt;/gi, "<%= Body %>")
        .replace(/&lt;%= To %&gt;/gi, "<%= To %>").replace(/&lt;%= From %&gt;/gi, "<%= From %>");
        Services.admin.addWelcomeEmail(bodyData,locationRoute,type).then(response => {
            console.log(response);
            setMessage('Email Template Added Successfully')
            setopenAlert(true)
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
            setBtnLoader(false);
        })
    }
    const getStateData = (data) => {
        setopenAlert(data)
    }
    useEffect(() => {
        setLoader(true)
        Services.admin.getTemplate(request).then(response => {
            setTempateValue(response.data.data);
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
            setLoader(false)
        })
    }, [])
    return (
        <>
            {!loader?
            <>
                <CKEditor
                    initData={<Markup content={tempateValue?tempateValue['template']:initalData} />}
                    onChange={((evt)=>setWelcomeTemplate(evt.editor.getData()))}
                />
                <Box align="right" mt={3}>
                    <Button className={classes} 
                        onClick={(()=>addData('post-email', request))} disabled={btnLoader?true:false}>
                        {btnLoader?   
                        <Box className="btn-loader-mui">   
                            <CircularProgress color="white" /> 
                        </Box> 
                        :"Save"}
                    </Button>
                </Box> 
            </>
            :
            <Box align="center" my={4}>
                <CircularProgress style={{color:"#29abe1"}} />
            </Box>}
            <SnackbarComponent message={message} visible={openAlert} getStateData={getStateData} />
        </>
    )
}
export default Template