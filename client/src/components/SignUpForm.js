/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const SingUpForm = ({ form, onChange, onSubmit, error }) => {
    return (
        <form onSubmit={onSubmit}>
            <h3>REGISTER FORM</h3>

            <div className="form-group">
                <TextField
                    autoComplete="username"
                    label="ID"
                    name="username"
                    onChange={onChange}
                    value={form.username}
                />
            </div>

            <div className="form-group">
                <TextField
                    autoComplete="new-password"
                    label="Password"
                    name="password"
                    onChange={onChange}
                    type="password"
                    value={form.password}
                />
            </div>

            <div className="form-group">
                <TextField
                    label="Password Check"
                    name="passwordConfirm"
                    onChange={onChange}
                    type="password"
                    value={form.passwordConfirm}
                />
            </div>
            <div className="form-group">
                <TextField
                    label="Email"
                    name="email"
                    onChange={onChange}
                    value={form.email}
                />
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <button className="btn btn-dark btn-lg btn-block">SUBMIT</button>
            <p className="forgot-password text-right">
                Already registered <a href="/">log in?</a>
            </p>
        </form>
    );
};
export default withRouter(SingUpForm);
