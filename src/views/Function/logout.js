import { logout_deletecookie,load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import React from "react";

function logout(){

    window.event.preventDefault();
    console.log(load_cookies("member_id"))
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://140.115.87.192:8090/Logout";
    //console.log(data)
    fetch(proxyurl + url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userid: load_cookies("member_id")
          })
          
    
    })
    .then((response) => {return response.json();})
    .then((jsonData) => {
      console.log(jsonData)
      //console.log(jsonData.StatusCode)
      if(jsonData.StatusCode==200){
        //清除cookie
        
        //跳回首頁
        window.location.href = '/#/index' 
        
        //this.props.history.push("/index")
        logout_deletecookie()
      

      }
    
      else{
        alert("error")
      }
    })
}

    
        
    
  


export default logout;
