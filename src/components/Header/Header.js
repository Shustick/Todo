import NewTaskForm from "../NewTaskForm";
import './Header.css'

const Header = () => {
    return (
        <header> 
            <h1 className="header">todos</h1>
            <NewTaskForm />
        </header>
    )
}

export default Header;
