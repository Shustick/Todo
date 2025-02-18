import './App.css'
import Header from "../components/Header";
import TaskList from '../components/TaskList'
import Footer from '../components/Footer';
import { formatDistanceToNow } from 'date-fns';


const App = () => {
  let time = formatDistanceToNow(new Date());
  const taskData = [
    { taskClass: 'completed', description: 'Запустила Жука', created: `created ${time} ago`},
    { taskClass: 'editing', description: 'Доделать верстку', created: `created ${time} ago`},
    { taskClass: null, description: 'Поела', created: `created ${time} ago`},
  ];

  return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList props={taskData} />
          <Footer />
        </section>
      </section>
    )
}

export default App;