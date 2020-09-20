import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter, Route, Redirect, Switch, withRouter } from "react-router-dom";
import { Router, browserHistory as historyProvider, match } from 'react-router';
import { createBrowserHistory } from "history";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
// pages
import Index from "views/Index.js";
import RegisterPage from "views/RegisterPage/RegisterPage2.js";
import PersonalizePage from "views/PersonalizePage/PersonalizePage.js";
import PageMyFund from "views/PersonalizePage/PageMyFund.js";
import PageMyTag from "views/PersonalizePage/PageMyTag.js";
import PageCharacterAnalysis from "views/PersonalizePage/PageCharacterAnalysis.js";
import PagePig from "views/PersonalizePage/PagePig.js";
import AllFundPage from "views/FundPage/AllFund.js";
import DetailFund from "views/FundPage/DetailFund.js";
import TAGPage from "views/TagPage/Tag.js";
import PersonalDataPage from "views/EditPersonalData/PersonalDataPage.js";
import ComparePage from "views/FundPage/CompareFund.js"
import PageSurvey from "views/SurveyPage/Survey.js"
import PageSurvey_2 from "views/SurveyPage/Survey_2.js"
import PageSurvey_3 from "views/SurveyPage/Survey_3.js"
import PageSurvey_4 from "views/SurveyPage/Survey_4.js"
import PageSurvey_5 from "views/SurveyPage/Survey_5.js"
import LineLinking from "views/LinePage/LineLinking.js"
import LineAllFundPage from "views/LinePage/LineAllFund.js";
import LiffLogin from "views/LinePage/LiffLogin.js";
import LiffRegister from "views/LinePage/LiffRegister.js";
import LineDetailFund from "views/LinePage/LineDetailFund.js";
import LiffMyFund from "views/LinePage/LiffMyFund.js";
import LineSurvey from "views/LinePage/LineSurvey.js";
import LineSurvey2 from "views/LinePage/LineSurvey_2.js";
import LineSurvey3 from "views/LinePage/LineSurvey_3.js";
import LineSurvey4 from "views/LinePage/LineSurvey_4.js";
import LineSurvey5 from "views/LinePage/LineSurvey_5.js";


// others
const BrowserHistory = createBrowserHistory()
ReactDOM.render(
  <Router history={BrowserHistory}>
    <Switch>
      <Route path="/index" render={props => <Index {...props} />} />
      
      <Route
        path="/register-page" //註冊頁面
        render={props => <RegisterPage {...props} />} //註冊頁面
      />

      <Route
        path="/personalize-page"//個人化頁面
        render={props => <PersonalizePage {...props} />}  //個人化頁面
      />

      <Route
        path="/allfund-page"//基金總覽頁面、登入後首頁
        render={props => <AllFundPage {...props} />}  //基金總覽頁面、登入後首頁
      />
      <Route
        // path="/detailfund-page/:member_id/:member_session/:fundid"//基金詳細頁面
        path="/detailfund-page/:fundid"//基金詳細頁面
        render={props => <DetailFund {...props} />}  //基金詳細頁面
      />
      <Route
        path="/personal-data-page"//更改個資頁面
        render={props => <PersonalDataPage {...props} />}  //更改個資頁面
      />   
      <Route
        path="/page-myFund"//我的基金子頁面
        render={props => <PageMyFund {...props} />} //我的基金子頁面
      />
      <Route
        path="/page-myTag"//我的TAG子頁面
        render={props => <PageMyTag {...props} />} //我的TAG子頁面
      />
      <Route
        path="/page-compare"//多筆基金子頁面
        render={props => <ComparePage {...props} />} 
      />
      <Route
        path="/page-characterAnalysis"//性格分析子頁面
        render={props => <PageCharacterAnalysis {...props} />} //性格分析子頁面
      />
      <Route
        path="/page-pig"//豬豬小助理子頁面
        render={props => <PagePig {...props} />} //豬豬小助理子頁面
      />
      <Route
        path="/page-tag/:fundid"//tag頁面
        render={props => <TAGPage {...props} />} 
      />
      <Route
        path="/page-survey"//性格分析問卷頁面
        render={props => <PageSurvey {...props} />} 
      />
      <Route
        path="/page-survey-2"//性格分析問卷頁面_2
        render={props => <PageSurvey_2 {...props} />} 
      />
      <Route
        path="/page-survey-3"//性格分析問卷頁面_3
        render={props => <PageSurvey_3 {...props} />} 
      />
      <Route
        path="/page-survey-4"//性格分析問卷頁面_4
        render={props => <PageSurvey_4 {...props} />} 
      />
      <Route
        path="/page-survey-5"//性格分析問卷頁面_5
        render={props => <PageSurvey_5 {...props} />} 
      />
      <Route
        path="/account-linkng"//LineBot-Accountlinking頁面
        render={props => <LineLinking {...props} />} 
      />
      <Route
        path="/line-allfund-page"//LineBot-Liff基金總覽頁面
        render={props => <LineAllFundPage {...props} />} 
      />
      <Route
        path="/liff-linking"//LineBot-Liff登入頁面
        render={props => <LiffLogin {...props} />} 
      />
      <Route
        path="/liff-register"//LineBot-Liff註冊頁面
        render={props => <LiffRegister {...props} />} 
      />
      <Route
        path="/line-detailfund/:fundid"//LineBot-Liff基金詳細頁面
        render={props => <LineDetailFund {...props} />} 
      />
      <Route
        path="/liff-page-myfund"//LineBot-Liff追蹤基金頁面
        render={props => <LiffMyFund {...props} />} 
      />
       <Route
        path="/liff-survey"//LineBot-Liff問卷頁面
        render={props => <LineSurvey {...props} />} 
      />
      <Route
        path="/liff-survey2"//LineBot-Liff問卷頁面
        render={props => <LineSurvey2 {...props} />} 
      />
      <Route
        path="/liff-survey3"//LineBot-Liff問卷頁面
        render={props => <LineSurvey3 {...props} />} 
      />
      <Route
        path="/liff-survey4"//LineBot-Liff問卷頁面
        render={props => <LineSurvey4 {...props} />} 
      />
       <Route
        path="/liff-survey5"//LineBot-Liff問卷頁面
        render={props => <LineSurvey5 {...props} />} 
      />
      


      <Redirect to="/index"/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
