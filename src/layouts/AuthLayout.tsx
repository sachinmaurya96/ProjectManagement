
export interface LayoutProps {
    children: React.ReactNode;
  }
 function AuthLayout(props:LayoutProps) {
  return (
    <div className="w-full h-[100vh] grid grid-cols-2">
      <div className="flex items-center justify-center ">
        {props.children}
      </div>
      <div className="w-full h-full ">
       <img src="/login.svg" alt="" className="w-[90%]"/>
      </div>
    </div>
  )
}
export default AuthLayout