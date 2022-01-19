import { Link } from "react-router-dom";
import styled from "styled-components";
import AlertDialog from "./dialogdelete";
import SelectButton from "./selectbutton";

const RightContent = () => {
  return (
    <Container>
      <div>
        {/* Option sort List buton @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}
        <div className="row">
          <div className="col d-none d-md-block">
            <div>
              <h3>Posts</h3>
            </div>
          </div>
          <div className="col">
            <div className="d-flex justify-content-end px-3">
              <div style={{ width: "175px", height: "40px" }}>
                <select
                  className="form-select "
                  aria-label="Default select example"
                >
                  <option selected>Recently Created</option>
                  <option value="1">Most View</option>
                  <option value="2">Most reaction</option>
                  <option value="3">Most comment</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Item Post @@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@*/}
        <div className="wrap-post-card">
          <div className="row">
            <div className=" col-12 col-md-6">
              <div>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/"}
                >
                  <span className="spantitle">
                    Hello everyone,test my fist blog
                  </span>
                </Link>
              </div>
              <div>
                <span>
                  <strong style={{ color: "#717171" }}>Publisher</strong>: Jan8
                  {"    "}
                  <strong style={{ color: "#717171" }}>Edit</strong>: Jan8
                </span>
              </div>
            </div>

            <div className="col-6 col-md-3 ">
              <div className="row" style={{height:"100%"}}>
                <div className="col-auto">
                 
                  <span className="spanViewReact">
                    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      role="img"
                      aria-labelledby="aa2r27ks5a7szf14rfdc8horatga0e36"
                      className="crayons-icon mr-1"
                    >
                      <title id="aa2r27ks5a7szf14rfdc8horatga0e36">
                        Reactions
                      </title>
                      <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
                    </svg>
                    213
                  </span>
                 
                </div>

                <div className="col-auto">
                  <span className="spanViewReact">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      role="img"
                      aria-labelledby="a5tjol8kg3sunh029romim1kmocmy3fw"
                      className="crayons-icon mr-1"
                    >
                      <title id="a5tjol8kg3sunh029romim1kmocmy3fw">
                        Comments
                      </title>
                      <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
                    </svg>
                    214
                  </span>
                </div>
                <div className="col-auto">
                  <span className="spanViewReact">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-labelledby="as6uvtg2ss9eerrglob7wpmcliy7v1bt"
                      className="crayons-icon mr-1"
                    >
                      <title id="as6uvtg2ss9eerrglob7wpmcliy7v1bt">Views</title>
                      <path d="M12 5.5c3.987 0 7.304 2.802 8 6.5-.695 3.698-4.013 6.5-8 6.5S4.696 15.698 4 12c.695-3.698 4.013-6.5 8-6.5zm0 11.556a6.76 6.76 0 004.15-1.42A6.486 6.486 0 0018.49 12a6.487 6.487 0 00-2.341-3.633A6.76 6.76 0 0012 6.951c-1.507 0-2.97.499-4.149 1.416A6.487 6.487 0 005.51 12a6.486 6.486 0 002.34 3.636 6.76 6.76 0 004.15 1.42zm0-1.806a3.368 3.368 0 01-2.353-.952A3.212 3.212 0 018.673 12c0-.862.35-1.689.974-2.298A3.368 3.368 0 0112 8.75c.883 0 1.729.342 2.353.952.624.61.975 1.436.975 2.298 0 .862-.351 1.689-.975 2.298-.624.61-1.47.952-2.353.952zm0-1.444c.49 0 .96-.19 1.307-.53.347-.338.542-.797.542-1.276s-.195-.938-.542-1.277A1.871 1.871 0 0012 10.194c-.49 0-.96.19-1.307.53A1.785 1.785 0 0010.15 12c0 .479.195.938.542 1.277.347.338.817.529 1.307.529z"></path>
                    </svg>
                    267
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="row">
                <div className="col-auto">
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={"/"}
                  >
                    <div className="wrapbutton">Manage</div>
                  </Link>
                </div>
                <div className="col-auto">
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={"/"}
                  >
                    <div className="wrapbutton">Edit</div>
                  </Link>
                </div>

                <div className="col-auto">
                  <AlertDialog></AlertDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RightContent;

const Container = styled.div`
  .wrap-post-card {
    margin-bottom: 5px;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    :hover {
      background-color: #f9f9f9;
    }
  }
  .wrapbutton {
    padding: 5px 10px;
    border-radius: 5px;
    :hover {
      background-color: #f0f0f0;
    }
  }
  .spanViewReact {
    display: inline-block;
  }
  .spantitle {
    color: blue;
    font-size: 19px;
    font-weight: bold;
    cursor: pointer;
  }
`;
