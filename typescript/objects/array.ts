namespace _aeq
{
    export function arrayEx<T = any>(arr: T[]) : ArrayEx<T>
    {
        const arrEx = arr as ArrayEx<T>;
    
        arrEx.isAeq = true;
    
        arrEx.forEach = function(callback: forEachArrayCallback<T>)
        {
            const len = this.length;
    
            for ( let i = 0; i < len; i++ ) {
                callback( this[i], i, this );
            }
        }
    
        // etc.
    
        return arrEx;
    }
}