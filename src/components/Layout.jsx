import SideNav from './SideNav'

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-primary-white">
      <SideNav />
      <section className="flex flex-col md:pb-16">{children}</section>
    </div>
  )
}

export default Layout
