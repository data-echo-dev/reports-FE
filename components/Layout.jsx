import SideNav from "./SideNav";


function Layout(props) {
  

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex w-full mx-auto md:pb-16">
      <SideNav />
        {props.children}
      </main>
    </div>
  );
}

export default Layout;