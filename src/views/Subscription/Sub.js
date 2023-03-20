import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from 'material-table';
import Loader from "react-loader-spinner";
import Box from '@material-ui/core/Box';
import services from "services";
import { SortData } from "views/components/UseFullScripts";
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

export default function Sub() {
  const classes = useStyles();
  const [subData,setSubData] = useState([]);
  const [showLoader , setLoader] = useState(false);
  const columns = [
    {
      field: "full_name",
      title: "Full Name",
    },
    {
      field: "email",
      title: "Email",
      width: 150,
    },
    {
      field: "phone_number",
      title: "Phone Number",
      width: 150,
    },
    {
      field: "priceType",
      title: "Price Type",
      width: 200,
    },
    {
      field: "plan",
      title: "Subscribed Plan",
      width: 200,
    },
    {
      field: "price",
      title: "Price",
      width: 200,
      render: rowData => rowData.price?'$'+rowData.price:"$0"
    },
    {
      field: "payDate",
      title: "Paid Date",
      width: 200,
      render: rowData => getDataObject(rowData.payDate)
    }
  ];
  const getDataObject = (passedDate) => {
    let dateObj = new Date(passedDate);
    let myDate = (dateObj.getUTCFullYear()) + "/" + (dateObj.getMonth() + 1)+ "/" + (dateObj.getUTCDate());
    return myDate;
  }
  useEffect(() => {
    setLoader(true);
    services.admin.getPayments().then(response => {
      setSubData(SortData(response.data.data)) 
    }).finally(() => {
      setLoader(false);
    })
  }, [])
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Subscriptions</h4>
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
            <MaterialTable  columns={columns}
              title={false}
              data={subData}
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
