import * as _ from 'lodash';
import moment from 'moment';
import Driver, { DataStruct, ID } from '../driver';
import { SortingOptions } from '../Tasks';

export declare type Status = 'NEW' | 'IN PROGRESS' | 'QA' | 'FINISH' | 'FIXED';

export declare type Threshold = {
    color:string;
    limit:number;
};

export declare type ConfiguratorProps = {
    onTimeProps?:Threshold;
    warningProps?:Threshold;
    delayedProps?:Threshold;    
    sortingOptions?: Array<SortingOptions>;
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
            this.props = props;
            this.loadingPending= false;
        }

        public static getAll = async () => {
            let collection = await Configurator.getCollection(dataStruct);
            return collection;
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
            //    this.validations();
                const result = this.onSaveItem(this.props);
                this.loadedItem = true;
                return await result;
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
