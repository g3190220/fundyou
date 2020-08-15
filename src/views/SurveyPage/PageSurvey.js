import React from "react";
import ReactDOM from "react-dom";
import * as Survey from "survey-react"; //參考網址：https://reurl.cc/KjK5Nq
import "survey-react/survey.css";

Survey.JsonObject.metaData.addProperty("itemvalue", { name: "score:number" });
Survey.matrixDropdownColumnTypes.rating = {
  properties: ["rateValues"]
};
class PageSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCompleted: false };

    this.onCompleteComponent = this.onCompleteComponent.bind(this);
    this.select = this.select.bind(this);
  }

  /*********** prettey checkbox**************** */

  preetycheckbox = survey => {
    survey.getAllQuestions().forEach(question => {
      if (question.getType() === "checkbox") {
        question.renderAs = "prettycheckbox";
      }
      question.updateCustomWidget();
    });
  };

  onUpdateQuestionCssClasses = (survey, options) => {
    var classes = options.cssClasses;

    classes.title = "sq-title";

    if (options.question.getType() === "imagepicker") {
      classes.root += " sq-root-ip";
      classes.item += " sq-item-ip";
      classes.itemChecked += " sq-itemchecked-ip";
      classes.itemInline += " sq-iteminline-ip";
      classes.label += " sq-label-ip";
      classes.itemControl += " sq-itemcontrol-ip";
      classes.image += " sq-image-ip";
      classes.itemText += " sq-itemtext-ip";
      classes.clearButton += " sq-clearbutton-ip";
      classes.column += " sq-column-ip";
    } else {
      //classes.mainRoot += " sv_qstn";
      classes.root += " sq-root";
      classes.item += " sq-item";
      classes.label += " sq-label";

      if (options.question.isRequired) {
        classes.title += " sq-title-required";
        classes.root += " sq-root-required";
      }

      if (options.question.getType() === "checkbox") {
        classes.root += " sq-root-cb";
      }
      /* if (options.question.getType() === "matrixdropdown") {
        classes.root += " sq-root-rat";
    }*/

      if (options.question.getType() === "radiogroup") {
        classes.root += " sq-root-cb";
      }
    }
  };

  onCompleteComponent() {
    this.setState({ isCompleted: true });
  }

  select(sender, options){
    var el = document.getElementById(options.name);
    if (el) {
        el.value = options.value;
    }
    alert(el);
  }
  render() {
    let json = {
      pages: [
        {
          name: "page1",
          elements: [
            {
              title: "個人資料",
              type: "panel",
              name: "panel1",

              elements: [
                {
                  type: "radiogroup",
                  name: "q1",
                  title: "請選擇 您的年齡區間",
                  isRequired: true,
                  //renderAs: "prettycheckbox",
                  choices: [
                    {
                        value:1,
                        text: "未滿 20 歲/70 歲(含)以上"
                    }, 
                    {
                        value:2,
                        text: "60 歲(含)以上〜70 歲"
                    },
                    {
                        value:3,
                        text: "50 歲(含)以上〜60 歲"
                    },
                    {
                        value:4,
                        text: "40 歲(含)以上〜50 歲"
                    },
                    {
                        value:5,
                        text: "20 歲(含)以上〜40 歲"
                    },
                  ],
                  colCount: 3
                },
                {
                    type: "radiogroup",
                    name: "job",
                    title:"請選擇 您的職業",
                    isRequired: true,
                    //renderAs: "prettycheckbox",
                    choices: [
                      {
                          value:1,
                          text: "待業中"
                      }, 
                      {
                          value:2,
                          text: "學生"
                      },
                      {
                          value:3,
                          text: "家管"
                      },
                      {
                          value:4,
                          text: "退休人士"
                      },
                      {
                          value:5,
                          text: "生產事業"
                      },
                      {
                        value:6,
                        text: "軍公教人員"
                    },
                    {
                        value:7,
                        text: "金融保險業"
                    },
                    {
                        value:8,
                        text: "專業人士（醫生、律師、會計師等等）"
                    },
                    {
                        value:9,
                        text: "其他"
                    },
                    
                    ],
                    colCount: 4
                  },
                  {
                    type: "radiogroup",
                    name: "q2",
                    title:"請選擇 您的年所得區間",
                    isRequired: true,
                    choices: [
                      {
                          value:1,
                          text: "50 萬以下"
                      }, 
                      {
                          value:2,
                          text: "50 萬(含)〜100 萬"
                      },
                      {
                          value:3,
                          text: "100 萬(含)〜150 萬"
                      },
                      {
                          value:4,
                          text: "150 萬(含)〜200 萬"
                      },
                      {
                          value:5,
                          text: "200 萬(含)以上"
                      },
                    
                    ],
                    colCount: 3
                  },
                  {
                    type: "radiogroup",
                    name: "q3",
                    title:"請選擇 您的最高學歷",
                    isRequired: true,
                    choices: [
                      {
                          value:1,
                          text: "識字有限"
                      }, 
                      {
                          value:2,
                          text: "國中含以下"
                      },
                      {
                          value:3,
                          text: "高中職"
                      },
                      {
                          value:4,
                          text: "專科 大學"
                      },
                      {
                          value:5,
                          text: "研究所以上"
                      },
                    
                    ],
                    colCount: 3
                  },

                
              ]
            }
          ]
        },

        {
          name: "page2",
          elements: [
            {
              title: "投資目的",
              type: "panel",
              name: "panel2",
              elements: [
              {
                type: "radiogroup",
                name: "q4",
                title: "請問您投資金融商品最主要的考量因素為何？",
                isRequired: true,
                //renderAs: "prettycheckbox",
                choices: [
                    {
                        value:1,
                        text: "儲蓄（保本不虧錢）"
                    }, 
                    {
                        value:2,
                        text: "有穩定收入（賺小錢）"
                    },
                    {
                        value:3,
                        text: "賺大錢"
                    },
                ],
                colCount: 3,
              },
              {
                type: "radiogroup",
                name: "q5",
                title: "請問您投資目的為何？",
                isRequired: true,
                //renderAs: "prettycheckbox",
                choices: [
                    {
                        value:1,
                        text: "養老基金"
                    }, 
                    {
                        value:2,
                        text: "結婚基金"
                    },
                    {
                        value:3,
                        text: "教育基金"
                    },
                    {
                      value:4,
                      text: "購屋基金"
                    },
                    {
                      value:5,
                      text: "其他"
                    },
                ],
                colCount: 5,
              },
              {
                type: "radiogroup",
                name: "q6",
                title: "您希望在多久以內達到期望報酬？",
                isRequired: true,
                //renderAs: "prettycheckbox",
                choices: [
                    {
                        value:1,
                        text: "1年以下"
                    }, 
                    {
                        value:5,
                        text: "1〜5年"
                    },
                    {
                        value:10,
                        text: "5〜10年"
                    },
                    {
                      value:15,
                      text: "10年以上"
                    },
                    
                ],
                colCount: 4,
              },
              {
                name: "q7",
                type: "radiogroup",
                title: "您想要的投資方式",
                
                isRequired: true,
                colCount: 0,
                choices: ["單筆", "定期定額"]
            },
            
          {
            name: "q7-simple",
            type: "text",
            title: "您單筆想要投資多少錢？",
            
            isRequired: true,
            visibleIf: "{q7} = '單筆'"
        },
        {
          name: "q7-regular",
          type: "text",
          title: "您想要定期定額每年投資多少錢？",
          
          isRequired: true,
          visibleIf: "{q7} = '定期定額'"
        },
            
          ]
        }]},
        
        {
          name: "page3",
          elements: [
            {
              title: "投資經驗",
              type: "panel",
              name: "panel3",

              elements: [
                {
                  type: "radiogroup",
                  name: "q8",
                  title: "請問您的投資基金的經驗為何？",
                  isRequired: true,
                  //renderAs: "prettycheckbox",
                  choices: [
                      {
                          value:1,
                          text: "1年以下"
                      }, 
                      {
                          value:2,
                          text: "1〜5年"
                      },
                      {
                          value:3,
                          text: "5〜10年"
                      },
                      {
                        value:4,
                        text: "10年以上"
                    },
                  ],
                  colCount: 4,
                },
                {
                  type: "checkbox",
                  name: "q9",
                  title: "請問您曾經或現在投資過那些金融商品(可複選)？",
                  isRequired: true,
                  choices: [
                      {
                          value:1,
                          text: "台外幣存款、貨幣型基金、儲蓄型保險"
                      }, 
                      {
                          value:2,
                          text: "債券、債券型基金"
                      },
                      {
                          value:3,
                          text: "股票、股票型基金"
                      },
                      {
                        value:4,
                        text: "結構型商品、投資型保單"
                    },
                    {
                      value:5,
                      text: "期貨、選擇權或其他衍生性金融商品"
                    },
                  ],
                  colCount: 3,
                },
                
            ]
          }]},

        {
          name: "page4",
          elements: [
            {
              title: "風險承受力評估",
              type: "panel",
              name: "panel4",
              elements: [
                {
                  type: "radiogroup",
                  name: "q10",
                  title: "假如你今天有(100萬元)要拿去投資基金，請問你最多可以接受多少錢的損失？",
                  isRequired: true,
                  //renderAs: "prettycheckbox",
                  choices: [
                      {
                          value:1,
                          text: "5萬元以下"
                      }, 
                      {
                          value:2,
                          text: "5萬元〜10萬元"
                      },
                      {
                          value:3,
                          text: "10萬元〜20萬元"
                      },
                      {
                        value:4,
                        text: "20萬元以上"
                    },
                  ],

                },
                {
                  type: "radiogroup",
                  name: "q11",
                  title: "呈上題，如果你損失超過(15萬元)，對你的生活影響程度為？",
                  isRequired: true,
                  choices: [
                    {
                      value:1,
                      text: "無法承受，會破產"
                    }, 
                    {
                      value:2,
                      text: "影響程度大"
                    },
                    {
                      value:3,
                      text: "中度影響"
                    },
                    {
                      value:4,
                      text: "幾乎無影響"
                    },
                  ],
    
                },
                {
                  type: "radiogroup",
                  name: "q12",
                  title: "當你賺多少錢之後才會想把基金賣出？",
                  isRequired: true,
                  choices: [
                    {
                      value:1,
                      text: "賺 5萬元〜10萬元"
                    }, 
                    {
                      value:2,
                      text: "賺 10萬元〜15萬元"
                    },
                    {
                      value:3,
                      text: "賺 15萬元〜20萬元"
                    },
                    {
                      value:4,
                      text: "賺 20萬元〜25萬元"
                    },
                  ],
    
                },
              ]
            }
          ]
        },

        {
          name: "page5",
         
          elements: [
            { 
              title: "風險偏好評估",
              type: "panel",
              name: "panel5",

              elements: [
                {
                  type: "radiogroup",
                  name: "q14",
                  title: "當您的投資超過你可以接受的損失時（停損點），你會採取那種處置方式？",
                  isRequired: true,
                  choices: [
                    {
                      value:1,
                      text: "立即賣出所有部位"
                    }, 
                    {
                      value:2,
                      text: "先賣出一半或一半以上部位"
                    },
                    {
                      value:3,
                      text: "先賣出一半以內部位"
                    },
                    {
                      value:4,
                      text: "暫時觀望,視情況再因應"
                    },
                    {
                      value:5,
                      text: "繼續持有至回本或不漲為止"
                    },
                  ],
    
                },
                {
                  type: "radiogroup",
                  name: "q15",
                  title: "當您的投資達到你預先設定的目標利益（停利點），請問您會採取那種處置方式？",
                  isRequired: true,
                  choices: [
                    {
                      value:1,
                      text: "立即賣出所有部位"
                    }, 
                    {
                      value:2,
                      text: "先賣出一半或一半以上部位"
                    },
                    {
                      value:3,
                      text: "先賣出一半以內部位"
                    },
                    {
                      value:4,
                      text: "暫時觀望,視情況再因應"
                    },
                    {
                      value:5,
                      text: "繼續持有至回本或不漲為止"
                    },
                  ],
    
                },
                
              ]
            }
          ]
        }

        /******************************* End of Likelihood ********************************** */
      ],
      showQuestionNumbers: "off",
      completedHtml: "<p><h4>Security Profile Results !!</h4></p>"
    };
    var myCss = {   //暫時沒用
      matrix: {
          root: "table table-striped"
      },
      navigationButton: "button btn-lg"
    };

    var surveyValueChanged = function (result) {
  //    var el = document.getElementById(options.name);
    //  if (el) {
      //    el.value = options.value;
      //}

      alert(result.data);
  };

    var surveyRender = !this.state.isCompleted ? (
      <Survey.Survey
        json={json}
        showCompletedPage={false}
        onComplete={this.onCompleteComponent}
        preetycheckbox={this.preetycheckbox}
        css={myCss}
        onValueChanged={this.select}
        //onUpdateQuestionCssClasses={this.onUpdateQuestionCssClasses}
      />
    ) : null;
    var onCompleteComponent = this.state.isCompleted ? (
      <div>The component after onComplete event</div>
    ) : null;

    return (
      <div>
        {surveyRender}
        {onCompleteComponent}
      </div>
    );
  }
}
export default PageSurvey;