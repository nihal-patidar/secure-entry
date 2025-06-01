import NavRouter from './NavRouter.jsx'
import Aside from "./Aside.jsx";
import FoRm from "./Form.jsx"


// export let miniDB = {};

export default function CreateVisitorForm(){
    return(
        <> 
            <NavRouter></NavRouter>
            <div className="flex">
                <Aside></Aside>
                {/* <FoRm></FoRm> */}
            </div>
        </>
    )
}