import { Book } from "lucide-react";

export const Logo = () => {
    return (
    <div className="flex items-center gap-x-2">
        <p className="text-2xl font-bold">
           
            <span className="text-violet-800 flex ">
                <Book className="mt-1"/>&nbsp;Corp&nbsp;Ed
            </span>
            
        </p>
    </div> );
}