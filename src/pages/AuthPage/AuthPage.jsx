import React, { useState, useContext } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './AuthPage.scss';

export default function AuthPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();

  const { login } = useContext(AuthContext);

  const changeHandler = (event) => {
    // setForm((state) => {
    //   return { ...state, [event.target.name]: event.target.value };
    // });
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      await axios
        .post(
          '/api/auth/registration',
          { ...form },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(() => history.push('/'));
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = async () => {
    try {
      await axios
        .post(
          '/api/auth/login',
          { ...form },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => login(response.data.token, response.data.userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <>
          <div className="container">
            <div className="auth-page">
              <Route path="/login">
                <h3>Авторизация</h3>
                <form
                  className="form from-login"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="email"
                        name="email"
                        className="validate"
                        onChange={changeHandler}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        type="password"
                        name="password"
                        className="validate"
                        onChange={changeHandler}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <button
                      className="waves-effect waves-light btn blue"
                      onClick={loginHandler}
                    >
                      Войти
                    </button>
                    <Link to="/registration" className="btn-outline btn-reg">
                      Нет аккаунта?
                    </Link>
                  </div>
                </form>
              </Route>

              <Route path="/registration">
                <h3>Регистрация</h3>
                <form
                  className="form from-login"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="email"
                        name="email"
                        className="validate"
                        onChange={changeHandler}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={changeHandler}
                        type="password"
                        name="password"
                        className="validate"
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <button
                      className="waves-effect waves-light btn blue"
                      onClick={registerHandler}
                    >
                      Регистрация
                    </button>
                    <Link to="/login" className="btn-outline btn-reg">
                      Уже есть аккаунт?
                    </Link>
                  </div>
                </form>
              </Route>
            </div>
          </div>
        </>
      </Switch>
    </BrowserRouter>
  );
}
