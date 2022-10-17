import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
  useRef,
} from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";

const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: re.test(action.val)};
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: re.test(state.value)};
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  const authContext = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isValid: emailIsValid } = emailState; // array destructuring
  const { isValid: passwordIsValid } = passwordState;

  const emailChangeHandler = (event) => {
    setEmailTouched(true);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    setPasswordTouched(true);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailOnBlurHandler = () => {
    setEmailTouched(true);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordOnBlurHandler = () => {
    setPasswordTouched(true);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    if (emailIsValid && passwordIsValid) {
      authContext.onLogin(emailState.value, passwordState.value);
      setEmailTouched(false);
      setPasswordTouched(false);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailIsValid}
          wasTouched={emailTouched}
          label="E-Mail"
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailOnBlurHandler}
        />
        {!emailIsValid && emailTouched && <p>Invalid e-mail.</p>}
        <Input
          ref={passwordInputRef}
          isValid={passwordIsValid}
          wasTouched={passwordTouched}
          label="Password"
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordOnBlurHandler}
        />
        {!passwordIsValid && passwordTouched && <p>Invalid password.</p>}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
