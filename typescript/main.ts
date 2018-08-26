namespace _aeq
{
    // TODO: need to special case this during compilation
    export const thisObj: any = null;

    export function main(selector:string|NativeAeObject|IAeqObject, context?:NativeAeObject) : IAeqObject
    {
        if (isAeqObject(selector)) {
            return selector as IAeqObject;
        }
        
        if (typeof selector === 'string') {
            return selectByCss(selector, context);
        }
    
        if (isArray(selector)) {
            return arrayEx(selector as any);
        }
        
        switch(getNativeAeObjectType(selector as NativeAeObject))
        {
            case AeType.Project: return new ProjectEx(selector as Project);
            // etc.
            default:
                throw new Error(`The selector object passed in is not a native AE Object`);
        }
    }

    function isAeqObject(obj: any) {
        return obj.isAeq;
    }

    export function isArray(obj: any) {
        return Object.prototype.toString.call( obj ) === '[object Array]';
    }

    export function selectByCss(selector:string, context?:NativeAeObject) {
        // TODO
        return arrayEx([]);
    }

    export function forEach(obj: any, callback: forEachMemberCallback, fromIndex?: number)
    {
        if (isArray(obj))
        {
            let i = fromIndex || 0;
            const length = obj.length;
            
            for (; i < length; i++ ) {
                if (callback(obj[i], i, obj) === false ) {
                    break;
                }
            }
        } else {
            for (const m in obj ) {
                if ( obj.hasOwnProperty( m ) ) {
                    if ( callback( m, obj[m], obj ) === false ) {
                        break;
                    }
                }
            }
        }

        return obj;
    }

    export function getNativeAeObjectType(o:NativeAeObject)
    {
        if (o instanceof Project) return AeType.Project;
        if (o instanceof CompItem) return AeType.CompItem;
        if (o instanceof FolderItem) return AeType.FolderItem;
        if (o instanceof Layer) return AeType.Layer;
        if (o instanceof Property) return AeType.Property;

        // etc.

        throw new Error(`The object is not a native AE object`);
    }
}