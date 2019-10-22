import { Props } from './types';
import AsyncStorage from '@react-native-community/async-storage';
export const STORAGE: string = 'STORAGE';
export const SQL: string = 'SQL';
export const GRAPHQL: string = 'GRAPHQL';
export declare type ID = string | number | undefined;

export interface DataStruct {
    type: typeof SQL | typeof GRAPHQL | typeof STORAGE;
    collectionName: string;
    connectionString: string;
};

export default abstract class Driver {

    protected dataStruct: DataStruct;
    private connector: DriverConnector;
    private debugMode: boolean = false;
    protected loadedItem: boolean = false;

    constructor(dataStruct: DataStruct){
        this.dataStruct = dataStruct;
        this.connector = new DriverConnector(this.dataStruct.type, this.dataStruct.collectionName );
        this.init();
    }

    protected init = () => {
        if(this.debugMode) console.log('init data');
    } 

    protected onSave = async (data: Props) => {
        let collection = await this.connector.getCollection();
        if(!this.loadedItem){
            collection.push(data);        
        }else{
            collection = [...collection.filter((item:any) => item.id !== data.id), data];
        }
        return await this.connector.setCollection(collection);
    }

    protected onDelete = async (data: Props) => {
        let collection = await this.connector.getCollection();
        collection = collection.filter((item:any) => item.id !== data.id);
        this.connector.setCollection(collection);
    }

    protected getData = async (id:ID) => {
        const collection = await this.connector.getCollection();
        if(!id) return collection;
        const [item] = collection.filter((item:any) => item.id === id);
        return item;
    } 

    public static getCollection = (dataStruct: DataStruct) => {
        const connector = new DriverConnector(dataStruct.type, dataStruct.collectionName );
        return connector.getCollection();
    } 
    
}

class DriverConnector {
    private connectionInstance?: StorageConnector;
    private key:string = '';

    constructor(type:string, key: string) {
        this.key = key;        
        switch (type) {
            case STORAGE:
                //storage initiation
                this.connectionInstance = new StorageConnector();
                break;
            // case SQL:
            //     //sql initiation
            //     this.connectionInstance = new SQLConnector();                
            //     break;
            // case GRAPHQL:
            //     //graphql initiation
            //     this.connectionInstance = new GraphQLConnector();                
            //     break;                    
            default:
                break;
        }
    }

    public setCollection = (data: any) => {
        this.connectionInstance!.setData(this.key, data);
        return true;
    }

    public getCollection = async (query='') => {
        const data = await this.connectionInstance!.getData(this.key);
        return data;
    }
}

export class StorageConnector {

    public setData = async (key: string, data: any) => {
       return await AsyncStorage.setItem(key, JSON.stringify(data));
    }

    public getData = async (key: string) => {
        const item = await AsyncStorage.getItem(key);
        if(!item) return [];    
        return JSON.parse(item);
    }
    
    public static Purge = async () => {
        return await AsyncStorage.clear();
    }
}

class SQLConnector {}

class GraphQLConnector {}