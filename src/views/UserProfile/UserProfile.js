import React,{useState} from "react";
import Keys from '../../constant/keys';
import Services from '../../services';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
// core components
import Avatar from "@material-ui/core/Avatar";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CircularProgress from '@material-ui/core/CircularProgress';
// import Services from '../../services';
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  buttonAlign: {
    justifyContent: "flex-end",
  },
  error:{
    color:"#ef0000",
    fontSize:"16px",
    fontWeight:"500"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem(Keys.Preference.USER))
  const [userName,setName] = useState(user['full_name'])
  const [email,setEmail] = useState(user['email'])
  const [password,setPassword] = useState('')
  const [cpassword,setCPassword] = useState('')
  const [image,setImage] = useState('')
  const [message,setMessage] = useState('')
  const [userImage,setUserImage] = useState(user.image.url)
  const [loader,setLoader] = useState(false)
  const update = () => {
    if(password==cpassword){
      setLoader(true)
      const form = new FormData()
      form.append("image", image)
      form.append("full_name", userName)
      form.append("password", password)
      Services.admin.updateProfile(form).then(response => {
        let updateObject = user
        updateObject.full_name = response.data.data.full_name
        updateObject.image.url = response.data.data.image.url
        localStorage.setItem(Keys.Preference.USER,JSON.stringify(updateObject))
        setLoader(false)
        window.location.reload()
      }).catch((error) => {
        const {response} = error
        setMessage(response.data.message);
        setLoader(false)
      })
    }else{
      setMessage('Password and Confirm password did not matched');
    }
  }
  const profileImage = (file) => {
    if(file.files[0]){
      setImage(file.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file.files[0]);
      reader.onload = function () {
        const blobResult = URL.createObjectURL(file.files[0])
        setUserImage(blobResult)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Account Settings</h4>
            </CardHeader>
            <CardBody>
              {message?
                <Box my={3} className={classes.error}>
                  {message}
                </Box>
              :null}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Full Name"
                    id="first-name"
                    inputProps={{
                      value:userName,
                      onChange:((e)=>setName(e.target.value))
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    inputProps={{
                      value:email,
                      onChange:((e)=>setEmail(e.target.value))
                    }}
                    formControlProps={{
                      fullWidth: true,
                      disabled:true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    inputProps={{
                      type: "password",
                      value:password,
                      onChange:((e)=>setPassword(e.target.value))
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Confirm Password"
                    id="password"
                    inputProps={{
                      type: "password",
                      value:cpassword,
                      onChange:((e)=>setCPassword(e.target.value))
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Box mt={4}>
                    <InputLabel>Upload Profile Image</InputLabel>
                    <Box my={4}>
                      <Avatar alt={user.full_name} src={userImage} style={{width:"100px",height:"100px"}} />
                    </Box>
                    <Box mt={2}>
                      <Button variant="contained" component="label">
                        Upload Image
                        <input type="file" onChange={((e)=>profileImage(e.target))}
                         accept="image/*" hidden 
                        />
                      </Button>
                    </Box>
                  </Box>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter className={classes.buttonAlign}>
              <Box justifyContent="end"
                display="flex" alignItems="center" mb={3} mr={2}>
                {!loader? 
                <Button color="primary"
                 onClick={update}>Update Profile</Button>:
                <CircularProgress style={{color:"#29abe1"}} />}
              </Box>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
