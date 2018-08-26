function aeq(selector:string|_aeq.NativeAeObject, context?:_aeq.NativeAeObject)
{
    return _aeq.main(selector, context)
}

// List of all public members exposed by AEQuery
namespace aeq
{
    export const version = '0.6.0';
    export const arrayEx = _aeq.arrayEx;
    export const select = _aeq.selectByCss;

    // All classes should be listed here with ts-ignore above it
    
    // @ts-ignore
    export const ProjectX = _aeq.ProjectEx;
}