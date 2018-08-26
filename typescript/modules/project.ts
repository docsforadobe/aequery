namespace _aeq
{
    export class ProjectEx
    {
        constructor(public proj: Project)
        {

        }

        isAeq = true

        /**
         * Saves current AEP to current path
         * @method
         * @memberof aeq.project
         * @return {File} File object of AEP
         */
        quickSave()
        {
            var file = this.proj.file!;

            return this.proj.save(file);
        }

        toString()
        {
            return '[object aeq.project]';
        }
    }
}