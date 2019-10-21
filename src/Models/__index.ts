import moment from 'moment';
import Task, { TaskProps } from './Tasks';

const options = {
    name: 'Danny',
    lastname: 'Rand',
    age: 34,
    degree: 'Lawyer',
    party: 'UC',
    stats: {
        honesty:20,
        loyalty:30,
        culture:30,
        intelligence:30,
        publicRelations: 30
    },
}
//const storage = localStorage.getItem('tasks');
//const character = new Character(options);
const newTaskProps: TaskProps = {
    //   id: 863444.5801060748,
    id: 911872.0679615744,
    parentId: 0,
    sprintId: [],
    name: '',
    description: 'this task is old',
    estimated: moment(),
    charge: 0,
    status: 'NEW',
};
const tasks = new Task(newTaskProps);
const allData = Task.getAll();
// debugElement.innerHTML = ` 
//     ${tasks.get('estimated').format('D-M-Y H:m')} <br />
//     <pre style="width:300px">${JSON.stringify(tasks.get())}</pre> <br />
//     ${localStorage.getItem('Tasks').length}
// `;