const LoginPage = () => {
  return (
    <>
      <h1>Sign In</h1>
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <input type="button" value="Login" role="button" />
      <label htmlFor="remember-me">Remember me</label>
      <input type="checkbox" name="Remember me" id="remember-me" />
      <a href="#">Forgot Password</a>
    </>
  );
};

export default LoginPage;
