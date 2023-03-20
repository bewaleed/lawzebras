import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Template from './Template'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 140,
  },
  buttonNew: {
    background: "#29abe1 !important",
    color: "#fff",
    padding: "10px 20px"
  },
  indicator: {
    backgroundColor: '#29abe1',
  },
  label:{
    color:'#000'
  }
}));
const theme = createMuiTheme({
  overrides: {
    MuiTabs: {
      indicator: {
        backgroundColor: '#29abe1'
      }
    },
    MuiTab: {
      root: {
        "&:hover": {
          color: '#29abe1'
        }
      },
      selected: {
        color: '#29abe1',
        "&:hover": {
          backgroundColor: '#29abe1',
          color: '#29abe1'
        }
      }
    }
  }
});
export default function EmailTemplate() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  return (

    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleTabChange}
            classes={{
              indicator: classes.indicator
            }}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab classes={{
              textColor: classes.label
            }} label="Welcome Email" {...a11yProps(0)} />
            <Tab label="Forgot Password Email" {...a11yProps(1)} />
            <Tab label="Notification Email" {...a11yProps(2)} />
            <Tab label="New Booking" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Template request="welcome" classes={classes.buttonNew} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Template request="forgotPassword" classes={classes.buttonNew} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Template request="notification" classes={classes.buttonNew} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Template request="newBooking" classes={classes.buttonNew} />
        </TabPanel>
      </div>
    </MuiThemeProvider>
  );
}
