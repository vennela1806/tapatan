import React, { Component } from "react";
import { pushRoute } from "../Services/pushRoute";
import Joi from "joi-browser";
import Form from "../common/form";
import { toast } from "react-toastify";
import auth from "../Services/authService";
import { Navigate } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    passwordtoggle: false,
    errors: {},
    btnDisabled: false,
  };

  schema = {
    email: Joi.string()
      .email()
      .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)

      .error(() => {
        return {
          message: "Email must be valid & should not contain capital letters",
        };
      })
      .required()
      .label("Email")
      .min(5)
      .max(250),

    password: Joi.string()
      .required()
      .error(() => {
        return {
          message:
            "Password Should Contain At Least 1 Capital Letter, 1 Small Letter, 1 Number, and 1 Special Character",
        };
      })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      .label("Password")
      .min(8)
      .max(1024),
  };

  doSubmit = async () => {
    this.setState({ btnDisabled: true });
    try {
      setTimeout(() => {
        this.setState({ btnDisabled: false });
      }, 2000);
      const { data } = this.state;
      const { navigate } = this.props;

      const response = await auth.login(data.email, data.password);
      navigate("/startGame");

      toast.success("Logged in Successfully", {
        className: "custom-toast",
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  handlePasswordToggle = () => {
    this.setState((prevState) => ({
      passwordtoggle: !prevState.passwordtoggle,
    }));
  };

  render() {
    const { navigate } = this.props;
    if (auth.getCurrentUser()) {
      return <Navigate to="/startGame" />;
    }
    const { data, errors, passwordtoggle, btnDisabled } = this.state;

    return (
      <div className="main">
        <div className="content-w3ls">
          <div className="content-bottom">
            <h4 className="loginh">Login To Tapaton!</h4>

            <form onSubmit={this.handleSubmit} className="">
              <div className="field-group">
                <span className="fa fa-user fa-lg" aria-hidden="true"></span>

                <div className="wthree-field">
                  <input
                    value={data.email}
                    onChange={this.handleChange}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Please Enter Your Email"
                    aria-describedby="email"
                  />
                </div>
              </div>
              {errors.email && <div className="alertwarn">{errors.email}</div>}

              <div className="field-group">
                <span className="fa fa-lock fa-lg" aria-hidden="true"></span>

                <div className="wthree-field">
                  <input
                    value={data.password}
                    onChange={this.handleChange}
                    type={passwordtoggle ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Please Enter Your Password"
                    aria-describedby="password"
                  />

                  <span
                    className="login-eye-symbol-container"
                    onClick={this.handlePasswordToggle}
                  >
                    <i
                      className={`login-eye-symbol fa-regular ${
                        passwordtoggle ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </span>
                </div>
              </div>
              {errors.password && (
                <div className="alertwarn">{errors.password}</div>
              )}

              <div className="wthree-field">
                <button className="btn" type="submit" disabled={btnDisabled}>
                  Sign In
                </button>
              </div>
            </form>

            <div>
              <span className="list-login-bottom">
                Don't have an account ?
                <span
                  className="signin"
                  onClick={() => navigate("/registerForm")}
                >
                  Signup !
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default pushRoute(LoginForm);
