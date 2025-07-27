'use client'
import Navigation from "./Navigation";
import { NavigationItem } from "./Navigation";


const Sidebar = ({navigation}: {navigation: NavigationItem[]}) => {


    return (<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-20 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r border-gray-200 px-3 py-20">
          {/* Navigation */}
          <Navigation navigation={navigation} />
        </div>
      </div> );
}

 
export default Sidebar;