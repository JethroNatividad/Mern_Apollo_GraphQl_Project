import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import './index.css';
import { useForm } from '../../util/hooks';
import { useAuthContext } from '../../Context/AuthContext';
function Login(props) {
  const { addUser } = useAuthContext();
  const { values, handleSubmit, handleChange } = useForm(loginUser, {
    email: '',
    password: '',
  });
  const [_loginUser, { loading }] = useMutation(loginMutation, {
    variables: values,
    update(_, res) {
      addUser(res.data.login);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });
  function loginUser() {
    _loginUser();
  }
  const [errors, setErrors] = useState({});
  const DisplayErrors = () =>
    Object.values(errors).map((e) => <li key={e}>{e}</li>);
  return (
    <div className='login'>
      <Form
        onSubmit={handleSubmit}
        noValidate
        autocomplete='0'
        className={`login__form ${loading && 'loading'}`}
      >
        <h2 className='login__title'>Log in</h2>
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
const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Login;
