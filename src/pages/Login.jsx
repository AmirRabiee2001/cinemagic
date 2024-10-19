import { useState } from "react";
import styled from "styled-components";
import useLogin from "../hooks/useLogin";
import Loading from "../UI/Loading";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import toast from "react-hot-toast";

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const FormContainer = styled.div`
  background-color: rgba(200, 200, 200, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 1rem;
  display: flex;
  gap: 3rem;
  max-width: 34rem;
  overflow-x: hidden;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const LoginForm = styled.form`
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isShown === "signUp" ? "translateX(110%)" : "")};
`;

const SignUpForm = styled.form`
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isShown === "signUp" ? "translateX(110%)" : "")};
`;

const FormToggle = styled.div`
  width: 30rem;
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
  background-color: rgba(200, 200, 200, 0.3);
  border-radius: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    height: 100%;
    width: 50%;
    position: absolute;
    background-color: #8080807f;
    border-radius: 2rem;
    transition: transform 0.3s ease;
  }

  &.login::before {
    transform: translateX(50%);
  }

  &.signUp::before {
    transform: translateX(-50%);
  }

  button {
    border: none;
    height: 5rem;
    width: 50%;
    z-index: 1;
    background-color: transparent;
  }
`;

const FormGroup = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
  height: auto;
  input {
    background-color: var(--color-input-background);
    color: var(--color-input-text);
    border: none;
    padding: 1rem;
    border-radius: 1rem;
  }
  button {
    background-color: var(--color-primary);
    color: #fff;
    border: none;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: var(--shadow-md);
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formToggle, setFormToggle] = useState("login");

  const { login, isLoading: isLoginLoading } = useLogin();
  const { signup, isLoading: isSignupLoading } = useSignup();

  const loginFormHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("همه فیلد ها را پر کنید");
      return;
    }

    login({ email, password });
  };

  const signUpFormHandler = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error("لطفا همه فیلد ها را پر کنید");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("رمز عبور همخوانی ندارد");
      return;
    }

    signup({ email, password });
  };

  if (isLoginLoading || isSignupLoading) {
    return <Loading />;
  }

  return (
    <LoginPage>
      <FormContainer>
        <LoginForm onSubmit={loginFormHandler} isShown={formToggle}>
          <FormGroup>
            <label htmlFor="">ایمیل</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="">رمز عبور</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <button type="submit">ورود</button>
          </FormGroup>
        </LoginForm>

        <SignUpForm onSubmit={signUpFormHandler} isShown={formToggle}>
          <FormGroup>
            <label htmlFor="">ایمیل</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="">رمز عبور</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="">تکرار رمز عبور</label>
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <button type="submit">ایجاد حساب</button>
          </FormGroup>
        </SignUpForm>
      </FormContainer>

      <FormToggle className={formToggle === "signUp" ? "signUp" : "login"}>
        <button onClick={() => setFormToggle("login")}>ورود</button>
        <button onClick={() => setFormToggle("signUp")}>ثبت نام</button>
      </FormToggle>
      <Link to="/">بازگشت به صفحه اصلی</Link>
    </LoginPage>
  );
};

export default Login;
