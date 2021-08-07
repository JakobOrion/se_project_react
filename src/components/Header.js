function Header(props) {
  const { logo } = props;

  return (
    <header className="header">
      <img className="logo" src={logo} alt="Around the U.S. logo" />
    </header>
  );
}

export default Header;
