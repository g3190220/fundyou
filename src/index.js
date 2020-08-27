import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Redirect, Switch,withRouter } from "react-router-dom";

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
// others

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/index" render={props => <Index {...props} />} />
      
      <Route
        path="/register-page"
        render={props => <RegisterPage {...props} />}
      />

      <Route
        path="/personalize-page/:member_id"//個人化頁面
        render={props => <PersonalizePage {...props} />}  //個人化頁面
      />

      <Route
        path="/allfund-page/:member_id"//基金總覽頁面、登入後首頁
        render={props => <AllFundPage {...props} />}  //基金總覽頁面、登入後首頁
      />
      <Route
        // path="/detailfund-page/:member_id/:member_session/:fundid"//基金詳細頁面
        path="/detailfund-page/:fundid"//基金詳細頁面
        render={props => <DetailFund {...props} />}  //基金詳細頁面
      />
      <Route
        path="/personal-data-page/:member_id"//更改個資頁面
        render={props => <PersonalDataPage {...props} />}  //更改個資頁面
      />   
      <Route
        path="/page-myFund/:member_id"//我的基金子頁面
        render={props => <PageMyFund {...props} />} //我的基金子頁面
      />
      <Route
        path="/page-myTag/:member_id"//我的TAG子頁面
        render={props => <PageMyTag {...props} />} //我的TAG子頁面
      />
      <Route
        path="/page-compare"//多筆基金子頁面
        render={props => <ComparePage {...props} />} 
      />
      <Route
        path="/page-characterAnalysis/:member_id"//性格分析子頁面
        render={props => <PageCharacterAnalysis {...props} />} //性格分析子頁面
      />
      <Route
        path="/page-pig/:member_id"//豬豬小助理子頁面
        render={props => <PagePig {...props} />} //豬豬小助理子頁面
      />
      <Route
        path="/page-tag/:member_id/:fundid"//tag頁面
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
      <Redirect to="/index" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
