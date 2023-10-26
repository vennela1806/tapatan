import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import { isDisabled } from "@testing-library/user-event/dist/utils";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <div className="mb-3">
        <button
          disabled={this.validate()}
          className="btn btn-primary d-grid w-100"
          type="submit"
        >
          {label}
        </button>
      </div>
    );
  }

  renderInput(name, label, type, className, id, placeholder) {
    return (
      <Input
        label={label}
        value={this.state.data[name]}
        onChange={this.handleChange}
        type={type}
        className={className}
        // id={id}
        name={name}
        placeholder={placeholder}
        error={this.state.errors[name]}
        // autoFocus
      />
    );
  }
}

export default Form;
