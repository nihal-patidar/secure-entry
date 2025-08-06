import { devLog } from "../../devLog";

function Func(index) {
    let Questions = ["text", "single selection", "multiple selection", "Dropdown selection", "multiple selection", "Dropdown selection", "text", "Timer"];
    let Options = [];
    
    function Duplicate(index)
    {    
        let type = Questions[index];
        if(type === "single selection" || type === "multiple selection" || type === "Dropdown selection"){   
         
            const updated1 = [...Questions];
            const valueToDuplicate1 = updated1[index];
            updated1.splice(index + 1, 0, valueToDuplicate1);    
            Questions = updated1;
         
         
            const updated2 = [...Options];
            const valueToDuplicate2 = updated2[index];
            updated2.splice(index + 1, 0, valueToDuplicate2);    
            Options =  updated2;
         
        }
        else{    
            {
                const updated1 = [...Questions];
                const valueToDuplicate1 = updated1[index];
                updated1.splice(index + 1, 0, valueToDuplicate1);    
                Questions = updated1;
                
                
                const updated2 = [...Options];
                const valueToDuplicate2 = updated2[index];
                updated2.splice(index + 1, 0, valueToDuplicate2);    
                Options =  updated2;
            };
        }
    }


    function Remove(index) {
        Questions = (Questions.filter((_, i) => i !== index));
        Options = (Options.filter((_, i) => i !== index));

        // devLog.log(index);
        // devLog.log(Questions);
    }

    function Display(){
        // for(let i = 0;i < Questions.length;i++){
            devLog.log(Questions);
            devLog.log(Options);
        // }
    }
Options = [[], ["A", "B", "C"], ["A", "B", "C", "D", "E"], ["A", "B", "C", "D"], ["A", "B", "C", "D", "E"], ["A", "B", "C", "D"], [], []];

    Display();
    Duplicate(1);
    Display();
    Duplicate(3);
    Display();
    Duplicate(0);
    Display();
    Duplicate(1);
    Duplicate(6);
    Display();
    Remove(4);
    Display();
    Remove(0);
    Display();
    Remove(6);
    Display();
    
}

Func();