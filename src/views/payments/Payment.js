import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "../../components/Table/Table";
// import services from "services";
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

export default function Payment() {
    const classes = useStyles();
    const columns = [
        {
            field: "id",
            headerName: "ID",
            hide: true,
        },
        {
            field: "Name",
            headerName: "Name",
            width: 150,
        },
        {
            field: "Email",
            headerName: "Email",
            width: 150,
        },
        {
            field: "Address",
            headerName: "Address",
            width: 150,
        },
        {
            field: "Zip",
            headerName: "Zip Code",
            width: 150,
        },
        {
            field: "payment",
            headerName: "Payment",
            width: 200,
        },
        {
            field: "status",
            headerName: "Status",
            width: 130,
        },
    ];
    const rows = [
        {
            id: "1",
            Name: "Talal",
            Email: "talal@gmail.com",
            Address: "Pakistan",
            Zip: "52350",
            payment: "$200",
            Action: "Delete",
            status: "Paid"
        },
        {
            id: "2",
            Name: "Talal",
            Email: "talal@gmail.com",
            Address: "Pakistan",
            Zip: "52350",
            payment: "$200",
            Action: "Delete",
            status: "Paid"
        },
        {
            id: "3",
            Name: "Talal",
            Email: "talal@gmail.com",
            Address: "Pakistan",
            Zip: "52350",
            payment: "$200",
            Action: "Delete",
            status: "Pending"
        },
        {
            id: "4",
            Name: "Talal",
            Email: "talal@gmail.com",
            Address: "Pakistan",
            Zip: "52350",
            payment: "$200",
            Action: "Delete",
            status: "Paid"
        },
    ];
    // services.admin.getPayments().then(response => {
    //     console.log(response)
    // })
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Payment Record</h4>
                    </CardHeader>
                    <CardBody>
                        <Table rowsData={rows} colsData={columns} />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
