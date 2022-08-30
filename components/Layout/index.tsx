import Header from "~components/Header";

interface Props {
  children: JSX.Element;
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
