import * as _ from 'lodash';
import moment from 'moment';
import Driver, { DataStruct, ID } from '../driver';

export declare type Status = 'NEW' | 'IN PROGRESS' | 'QA' | 'FINISH' | 'FIXED';

export declare type ConfiguratorProps = {
    id?: ID;
    [key:string]: any;
}

const dataStruct:DataStruct ={
    type: 'STORAGE',
    collectionName: 'Configurator',
    connectionString: '',
};

export class Configurator extends Driver {

        public props: ConfiguratorProps = {};
        private logError: Array<string> = [];
        public loadingPending = true;

        constructor(props:ConfiguratorProps){            
            super(dataStruct);
            if(props.id) {
                // props.id not defined yet. please load
                this.props = props;
            }else{
                this.props = { id:Math.random()*1000000, ...props};
                this.loadingPending= false;
            }
        }

        public static getAll = async (queryData?: ConfiguratorProps) => {
            let collection = await Configurator.getCollection(dataStruct);
            if(queryData) {
                collection = collection.filter((el:ConfiguratorProps) => {
                    let isFiltered = true;
                    Object.keys(queryData).forEach((item)=>{
                        isFiltered = isFiltered && queryData[item] === el[item];
                    });
                    return isFiltered;
                });
            }
            return collection.map((el:ConfiguratorProps) => el);
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
            if(_.isEmpty(this.props)) {
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

}
