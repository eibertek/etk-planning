import * as _ from 'lodash';
import moment from 'moment';
import Driver, { DataStruct, ID } from '../driver';

export declare type Status = 'NEW' | 'IN PROGRESS' | 'QA' | 'FINISH' | 'FIXED';

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
        private logError: Array<string> = [];
        public loadingPending = true;

        constructor(props:TaskProps){            
            super(dataStruct);
            if(props.id) {
                // props.id not defined yet. please load
                this.props = props;
            }else{
                this.props = { id:Math.random()*1000000, ...props};
                this.loadingPending= false;
            }
        }

        public static getAll = async (queryData?: TaskProps) => {
            let collection = await Task.getCollection(dataStruct);
            if(queryData) {
                collection = collection.filter((el:TaskProps) => {
                    let isFiltered = true;
                    Object.keys(queryData).forEach((item)=>{
                        isFiltered = isFiltered && queryData[item] === el[item];
                    });
                    return isFiltered;
                });
            }
            return collection.map((el:TaskProps) => el);
        }

        public load = async () => {
            const loadedProps = await this.getData(this.props.id);
            if(!loadedProps) {
                this.loadedItem = false;
                return this.props;
            }
            this.loadedItem = true;
            this.loadingPending = false;
            loadedProps.estimated = moment(loadedProps.estimated);
            return loadedProps;
        }

        public isLoaded = () => this.loadedItem;

        public save = async () => {
           try{
                this.validations();
                const result = this.onSave(this.props);
                this.loadedItem = true;
                return result;
           }catch(e){
               this.logError.push(e);
               return false;
           }           
        }

        private validations = () => {
            if(!this.props.id || this.loadingPending) {
                throw new Error('Model not initialized correctly');
            }
            if(_.isEmpty(this.props) || _.isEmpty(this.props.name) || _.isEmpty(this.props.description) || _.isEmpty(this.props.estimated)) {
                throw new Error('Model has empty values');
            }
        }

        public getErrors = () => this.logError.join(',');
        public set = ([prop, value]:[string, any]) => {
            this.props[prop] = value;
        }

        public get = (value?: string) => {
            return value ? this.props[value] : this.props;
        }
        
        public delete = async () => {
            return await this.onDelete(this.props);
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
            const momentTime = moment(this.props.estimated);
            return moment.duration(momentTime.diff(moment())).asHours();
        }

}
