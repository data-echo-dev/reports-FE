import SideNav from "./SideNav";


function Layout(props) {
  

  return (
    <div className="flex flex-col min-h-screen">

          <SideNav />
      <main className="flex w-full mx-auto md:pb-16">
        {props.children}
      </main>
    </div>
  );
}

export default Layout;