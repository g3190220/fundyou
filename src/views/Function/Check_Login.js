//cookies
import {load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import isEmpty from "views/Function/isEmpty.js"
import React from 'react';

function getPDData(){
    const url = "https://fundu.ddns.net:8090/check_LoginStatus";////////改url
    //console.log(data)
    fetch(url, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    userid: load_cookies("member_id"),
                    userSession:load_cookies("member_session")
              })
              
        
        })
        .then((response) => {return response.json();})
        .then((jsonData) => {
          if(jsonData.StatusCode==200){
              return true;

        }
        else{
          return false;
        }
        })
}
export default getPDData;