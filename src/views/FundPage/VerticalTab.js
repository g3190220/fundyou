import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
    
  },
      

}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="淨值" {...a11yProps(0)} />
        <Tab label="績效" {...a11yProps(1)} />
        <Tab label="風險" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
          該基金之單位淨值；歷史資料為各月底數值，但當月份至月底前係採用目前該檔基金最近一日的資料。
      </TabPanel>
      <TabPanel value={value} index={1}>
          Sharpe Ratio：夏普指數，為衡量基金承擔每單位總風險所得之超額報酬。
          Treynor Ratio：崔納指數，為衡量基金承擔每單位市場風險所得之超額報酬。
      </TabPanel>
      <TabPanel value={value} index={2}>
          SD(Standard Deviation)：標準差，以近12個月的單月報酬率所計算之年化標準差；成立未滿12個月者不予計算。
      </TabPanel>
    </div>
  );
}
