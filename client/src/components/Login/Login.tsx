import React, { FormEvent, ChangeEvent, useState } from 'react';  
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../../redux/slices/authAndRegSlice';

const Login: React.FC = () => {
  const [inputsState, setInputState] = useState({email: '', password: ''});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const changeHandler = (e: ChangeEvent) => {
    setInputState((prev) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
    }))
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const responce = await fetch('http://localhost:3005/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(inputsState),
    });
    if (responce.ok) {
      const { name, id } = await responce.json();
      dispatch(authUser({ name, id }));
      navigate('/');
    } else { alert('произошла ошибка') }
  };

  return (
    <section className="vh-100" id="reg-block">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log in</p>

                    <form onSubmit={submitHandler} className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input onChange={changeHandler} name="email" value={inputsState.email} type="email" id="form3Example3c" className="form-control" />
                          <span className="form-label">Введите вашу почту</span>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input onChange={changeHandler} name="password" value={inputsState.password} type="password" id="form3Example4c" className="form-control" />
                          <span className="form-label">Введите ваш пароль</span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Log in</button>
                      </div>

                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample"
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login