import React, { Component } from "react";
import { pushRoute } from "../Services/pushRoute";
import Joi from "joi-browser";
import Form from "../common/form";
import { toast } from "react-toastify";
import auth from "../Services/authService";

class Register extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmpassword: "",
    },

    errors: {},
    confirmpassworderrors: "",
    passwordtoggle: false,
    confpasswordtoggle: false,
    btnDisabled: false,
  };

  schema = {
    firstName: Joi.string()
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .error(() => {
        return {
          message:
            "Should not contain spaces at end, numbers  and special characters  and min 3 characters",
        };
      })
      .required()
      .label("First Name")
      .min(3)
      .max(55),
    lastName: Joi.string()
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .error(() => {
        return {
          message:
            "should not contain spaces at end ,numbers and special characters  and min 3 characters",
        };
      })
      .required()
      .label("Last Name")
      .min(3)
      .max(55),
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
            "Password Should Contain At Least one uppercase , lowercase, number and a Special Character",
        };
      })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      .label("Password")
      .min(8)
      .max(1024),

    confirmpassword: Joi.string().required().label("Confirm Password"),
  };

  doSubmit = async (e) => {
    this.setState({ btnDisabled: true });
    const { navigate } = this.props;
    try {
      setTimeout(() => {
        this.setState({ btnDisabled: false });
      }, 3000);
      const { data } = this.state;

      if (data.firstName === data.lastName) {
        toast.error("First name and last name should not be same");
      } else if (data.password !== data.confirmpassword) {
        toast.error("Both Password and Confirm Passwords should be same ");
      } else {
        const response = await auth.register(
          data.firstName,
          data.lastName,
          data.email,
          data.password,
          data.confirmpassword
        );
        toast.success("Registered successfully");
        navigate("/loginForm");
      }
    } catch (ex) {
      setTimeout(() => {
        this.setState({ btnDisabled: false });
      }, 2000);
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data, {
          className: "custom-toast",
        });
      }
    }
  };

  handlePasswordToggle = () => {
    this.setState((prevState) => ({
      passwordtoggle: !prevState.passwordtoggle,
    }));
  };

  handleconfPasswordToggle = () => {
    this.setState((prevState) => ({
      confpasswordtoggle: !prevState.confpasswordtoggle,
    }));
  };

  render() {
    const { data, errors, passwordtoggle, confpasswordtoggle, btnDisabled } =
      this.state;
    const { navigate } = this.props;

    return (
      <div className="main">
        <div className="content-w3ls">
          <div className="content-bottom">
            <h4 className="loginh">Register to Tapaton!</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="field-group">
                <span className="fa fa-user" aria-hidden="true"></span>

                <div className="wthree-field">
                  <input
                    value={data.firstName}
                    onChange={this.handleChange}
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Please Enter Your First Name"
                    aria-describedby="firstName"
                  />
                </div>
              </div>
              {errors.firstName && (
                <div className="alertwarn">{errors.firstName}</div>
              )}

              <div className="field-group">
                <span className="fa fa-user" aria-hidden="true"></span>

                <div className="wthree-field">
                  <input
                    value={data.lastName}
                    onChange={this.handleChange}
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Please Enter your last Name"
                    aria-describedby="lastName"
                  />
                </div>
              </div>
              {errors.lastName && (
                <div className="alertwarn">{errors.lastName}</div>
              )}

              <div className="field-group">
                <span className="fa fa-envelope" aria-hidden="true"></span>

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
                <span className="fa fa-lock" aria-hidden="true"></span>

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
                    className="register-eye-symbol-container"
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

              <div className="field-group">
                <span className="fa fa-lock " aria-hidden="true"></span>

                <div className="wthree-field">
                  <input
                    value={data.confirmpassword}
                    onChange={this.handleChange}
                    type={confpasswordtoggle ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder="Please Re-enter the Password"
                    aria-describedby="confirmpassword"
                  />
                  <span
                    className="register-eye-symbol-container"
                    onClick={this.handleconfPasswordToggle}
                  >
                    <i
                      className={`login-eye-symbol fa-regular ${
                        confpasswordtoggle ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </span>
                </div>
              </div>
              {errors.confirmpassword && (
                <div className="alertwarn">{errors.confirmpassword}</div>
              )}

              <div className="wthree-field">
                <button className="btn" type="submit" disabled={btnDisabled}>
                  Register Now
                </button>
              </div>
            </form>
            <br />
            <div>
              <span className="list-login-bottom">
                Already have an account ?{" "}
                <span className="signin" onClick={() => navigate("/loginForm")}>
                  SignIn !
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default pushRoute(Register);
