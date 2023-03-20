import React,{useState,useEffect} from "react";
import Services from '../../services';
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GavelOutlinedIcon from "@material-ui/icons/GavelOutlined";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
export default function Dashboard() {
  const [users , setUsers] = useState('');
  const [lawyers , setLawyers] = useState('');
  useEffect(() => {
    Services.admin.getUsers().then(response => {
      setUsers(response.data.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
    })

    Services.admin.getLawyers().then(response => {
      setLawyers(response.data.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
    })
  }, [])
  const classes = useStyles();
  const CardStyle = {
    minHeight: "135px",
  };
  const FontStyle = {
    fontWeight: "700",
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card style={CardStyle}>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <GavelOutlinedIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Lawyers</p>
              <h3 className={classes.cardTitle} style={FontStyle}>
                {lawyers?lawyers.length:0}
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card style={CardStyle}>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <PeopleOutlineIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Customers</p>
              <h3 className={classes.cardTitle} style={FontStyle}>
                {users?users.length:0}
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card style={CardStyle}>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <AccountBalanceOutlinedIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Revenue</p>
              <h3 className={classes.cardTitle} style={FontStyle}>
                $34,245
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
