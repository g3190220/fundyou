import React from "react";

// reactstrap components

// core components
import IndexNavbar from "views/index-sections/IndexNavbar.js";
import IndexHeader from "views/index-sections/IndexHeader.js";
import DemoFooter from "views/index-sections/DemoFooter.js";
// index sections

import SectionCarousel from "views/index-sections/SectionCarousel.js";
import SectionLogin from "views/index-sections/SectionLogin.js";


function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
    {/*主頁排序 */}
      <IndexNavbar />
      <IndexHeader />
      <div className="main">
        <SectionCarousel/>
        <SectionLogin />   
        <DemoFooter />
      </div>
    </>
  );
}

export default Index;
