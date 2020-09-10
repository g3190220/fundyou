import React from 'react';

//引入Sidebar
import Sidebar from "react-sidebar";

//引入material-ui list
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

//引入Avatar
import Avatar from '@material-ui/core/Avatar';

//處理個人資料取得
import {load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import isEmpty from 'views/Function/isEmpty.js'

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter
    } from "react-router-dom";

//覆寫CSS
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = () =>({
  sidebarIcon: {
    '&span': {
      fontWeight: 800,
    }
  }
})


const mql = window.matchMedia(`(min-width: 800px)`);

class PersonalizeMenu2 extends React.Component{
    state = {
    }
    constructor(props) {
        super(props)
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.state = {
          //fields: {},
          errors: {},
          flag:false,
          sidebarDocked: mql.matches,
          sidebarOpen: false
      }}
    
    //處理sidebar
    componentWillMount() {
      mql.addListener(this.mediaQueryChanged);
    }
   
    componentWillUnmount() {
      this.state.mql.removeListener(this.mediaQueryChanged);
    }
   
    onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
    }
   
    mediaQueryChanged() {
      this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }

    
    render(){
    const { classes } = this.props;
    
    return(
      
      <Sidebar
      sidebar={<b>Sidebar content</b>}
      open={this.state.sidebarOpen}
      docked={this.state.sidebarDocked}
      onSetOpen={this.onSetSidebarOpen}
      classes={{root: classes.sidebarIcon}}
    >
      <b>SIDEBAR</b>
    </Sidebar>
      

    )}
}

PersonalizeMenu2.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PersonalizeMenu2);

// export default withRouter(PersonalizeMenu2);
