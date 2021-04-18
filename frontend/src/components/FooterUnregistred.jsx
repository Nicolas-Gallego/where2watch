import "../css/footer.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FooterUnregistred = () => {
  const [myToken, setMyToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    console.log(myToken);
  }, [myToken]);

  return (
    // <div className="container-fluid footer">
    //   <div className="row">
    //     <div className="centerMenu d-flex justify-content-center">
    //       <div className="col-8 d-flex justify-content-between">
    //         <div className="col-10">
    //           <a href="/home" className="footerLogo">
    //             <img
    //               src="/w2w_logo_white.png"
    //               alt="w2w logo"
    //               className="footerLogo"
    //             />
    //             <h3>Where 2 Watch</h3>
    //           </a>
    //         </div>
    //         <div className="col-5">
    //           <a href="/home" className="footerLink">
    //             <h6>Home&thinsp;</h6>
    //           </a>
    //           <a href="/catalog" className="footerLink">
    //             <h6>Search&thinsp;</h6>
    //           </a>
    //           <a href="/login" className="footerLink">
    //             <h6>Login&thinsp;</h6>
    //           </a>
    //           <a href="/signup" className="footerLink">
    //             <h6>Sign Up&thinsp;</h6>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="d-flex justify-content-sm-end justify-content-center">
    //     <h6>Where 2 Watch©</h6>
    //   </div>
    // </div>
    <>
      <div className="container-fluid footer">
        <div className="row">
          <div className="col-12 d-flex justify-content-evenly ">
            <div className="d-flex flex-column align-items-center">
              <a href="/home" className="">
                <img
                  src="/w2w_logo_white.png"
                  alt="w2w logo"
                  className="footerLogo"
                />
              </a>
              <a href="/home" className="footerLogo">
                <h3>Where 2 Watch</h3>
              </a>
            </div>
            <div className="">
              <a href="/home" className="footerLink">
                <h6>Home&thinsp;</h6>
              </a>
              <a href="/catalog" className="footerLink">
                <h6>Search&thinsp;</h6>
              </a>
              <a href="/login" className="footerLink">
                <h6>Login&thinsp;</h6>
              </a>
              <a href="/signup" className="footerLink">
                <h6>Sign Up&thinsp;</h6>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="copiright">
        <h6>Where 2 Watch©</h6>
      </div>
    </>
  );
};
export default FooterUnregistred;
