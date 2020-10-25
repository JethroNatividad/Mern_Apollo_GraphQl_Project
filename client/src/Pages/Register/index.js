import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import './index.css';
function Register(props) {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [registerUser, { loading }] = useMutation(registerMutation, {
    variables: values,
    update(_, res) {
      console.log(res);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };
  const DisplayErrors = () =>
    Object.values(errors).map((e) => <li key={e}>{e}</li>);
  return (
    <div className='register'>
      <Form
        onSubmit={handleSubmit}
        noValidate
        autocomplete='0'
        className={`register__form ${loading && 'loading'}`}
      >
        <h2 className='register__title'>Create an account</h2>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          value={values.username}
          onChange={handleChange}
          error={errors.username && true}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          value={values.email}
          onChange={handleChange}
          error={errors.email && true}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          type='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          error={errors.password && true}
        />
        <Form.Input
          label='Repeat Password'
          placeholder='Repeat Password'
          type='password'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword && true}
        />
        <Button type='submit'>Submit</Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>{DisplayErrors()}</ul>
        </div>
      )}
    </div>
  );
}
const registerMutation = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Register;
