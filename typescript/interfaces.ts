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
    
    export interface ArrayEx<T> extends Array<T>, IAeqObject
    {
        forEach(callback: forEachArrayCallback<T>): void
    }
}
