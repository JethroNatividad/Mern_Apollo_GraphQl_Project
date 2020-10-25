import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import './index.css';
import { useForm } from '../../util/hooks';
import { useAuthContext } from '../../Context/AuthContext';
function Register(props) {
  const { addUser } = useAuthContext();
  const { values, handleSubmit, handleChange } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [_registerUser, { loading }] = useMutation(registerMutation, {
    variables: values,
    update(_, res) {
      addUser(res.data.register);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });
  function registerUser() {
    _registerUser();
  }
  const [errors, setErrors] = useState({});
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
