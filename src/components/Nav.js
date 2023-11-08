
import { Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';

export default function Nav() {
  const handleLogout = ()=>{
    localStorage.removeItem('uToken');
    localStorage.removeItem('username');
    window.location.reload();
  }  
  return (
    <Navbar fluid rounded>
      
      <div className="flex md:order-2" style={{display:'flex' , justifyContent: 'flex-end', width:'100%'}}>
        <Button onClick={handleLogout}>LogOut</Button>
      </div>
    </Navbar>
  );
}
