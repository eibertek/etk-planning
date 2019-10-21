import * as _ from 'lodash';
import moment from 'moment';
import Driver, { DataStruct, ID } from '../driver';

declare type Status = 'NEW' | 'IN PROGRESS' | 'QA' | 'FINISH' | 'FIXED';

export declare type TaskProps = {
    id?: ID;
    parentId?: number;
    sprintId?: Array<number>;
    name?: string;
    description?: string;
    estimated?: moment.Moment;
    charge?: number;
    status?: Status;
    [key:string]: any;
}

const dataStruct:DataStruct ={
    type: 'STORAGE',
    collectionName: 'Tasks',
    connectionString: '',
};

export class Task extends Driver {

        public props: TaskProps = {};

        constructor(props:TaskProps){            
            super(dataStruct);
            if(props.id) {
                this.load(props).then(dataProps => this.props = dataProps);
            }else{
                this.props = { id:Math.random()*1000000, ...props};
            }
        }

        public static getAll = async () => {
            const collection = await Task.getCollection(dataStruct);
            console.log('static getAll', collection);
            return collection.map((el:TaskProps) => new Task(el));

        }

        private load = async (props: TaskProps) => {
            const loadedProps = await this.getData(props.id);
            if(!loadedProps) {
                this.loadedItem = false;
                return props;
            }
            this.loadedItem = true;
            loadedProps.estimated = moment(loadedProps.estimated);
            return loadedProps;
        }

        public isLoaded = () => this.loadedItem;

        public save = () => {
            this.onSave(this.props);
            this.loadedItem = true;
        }

        public set = ([prop, value]:[string, any]) => {
            this.props[prop] = value;
        }

        public get = (value?: string) => {
            return value ? this.props[value] : this.props;
        }
        
        public delete = () => {
            this.onDelete(this.props);
        }

        public changeTime = ({amount, time='hours'}:{amount:number, time?:any}) => {
            if(!this.props.estimated) throw new Error('Model doesnt have estimated value. its empty?');
            if(amount > 0) {
                this.props.estimated.add(amount, time);
            }else{
                this.props.estimated.subtract(amount, time);
            }
        }

        private validateStatus = (status: Status) => {
            const oldStatus = this.props.status;
            switch (status) {
                case 'FIXED':
                    if(oldStatus !== 'QA' && oldStatus !== 'NEW' )
                        throw "You cant change to FIXED if not NEW or QA";
                    break;                                    
                case 'QA':
                    if(oldStatus !== 'IN PROGRESS')
                        throw "You cant change to QA if old status is not IN PROGRESS";
                    break;                                        
                default:
                    break;
            }
        }   

        public changeStatus = (status: Status) => {
            try{
                this.validateStatus(status);
            }catch(e){
                return e;
            }
            this.props.status = status;
            return;
        }

        public isFinished = () => {
            if(!this.props.estimated) throw new Error('Model doesnt have estimated value. its empty?');
            return moment.duration(this.props.estimated.diff(moment())).asHours();
        }

}
