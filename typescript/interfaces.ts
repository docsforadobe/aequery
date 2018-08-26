namespace _aeq
{
    export interface IAeqObject
    {
        isAeq: boolean
    }
    
    export enum AeType
    {
        Project = 'project',
        CompItem = 'comp',
        FolderItem = 'folder',
        Layer = 'layer',
        Property = 'property'
    
        // etc
    }
    
    export type NativeAeObject = Project | Item | Layer | Property;

    export type forEachMemberCallback = (member: any, value: any, obj: any) => boolean;
    export type forEachArrayCallback<T> = (item: T, idx: number, array: Array<T>) => void;
    
    export interface ArrayLike
    {
        [key: number]: any
        length: number
    }
    
    export interface ArrayEx<T> extends Array<T>, ArrayLike
    {
        isAeq: boolean;
        
        forEach(callback: forEachArrayCallback<T>): void
    }
}
