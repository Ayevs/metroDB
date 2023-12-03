export default function Navbar() {
  const backgroundColor = {
    backgroundColor: "transparent",
  };
  return (
    <nav className="Main-Nav">
      <a href="/">
        <img
          style={backgroundColor}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Metro_Inc._logo.svg/300px-Metro_Inc._logo.svg.png"
          alt="Metro Logo"
        />
      </a>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/sale">On sale</a>
        </li>
        <li>
          <a href="/checkout">Check Out</a>
        </li>
      </ul>
    </nav>
  );
}
