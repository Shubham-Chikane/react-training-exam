import type { FunctionComponent } from "react";
import React, { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedroute";
import Details from "./details";

const Home = React.lazy(() => import("./home"));
const About = React.lazy(() => import("./about"));
const Contact = React.lazy(() => import("./contact"));
const DashBoard = React.lazy(() => import("./dashboard"));
const Login = React.lazy(() => import("./login"));

const Launcher: FunctionComponent = () => {
  return (
    <>
      <hr></hr>
      <Link to={"/"}>Home</Link> {" | "}
      <Link to={"/about"}>About</Link> {" | "}
      <Link to={"/contact"}>Contact</Link> {" | "}
      <Link to={"/db"}>DashBoard</Link> {" | "}
      <Link to={"/login"}>Login</Link> {" | "}
      <hr></hr>
      <Suspense
        fallback={
          <div>
            <h1>Loading...</h1>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/db"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          >
            <Route path="/db/details/:id" element={<Details />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default Launcher;
