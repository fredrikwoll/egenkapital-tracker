import { NavigationItem } from "./Navigation";

type MobileNavigation = {
    navigation: NavigationItem[]
    handleQuickAdd: () => void;
}

const MobileNavigation = ({navigation, handleQuickAdd}: MobileNavigation) => {
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-2200">
        <div className="grid grid-cols-6 h-16">
          {navigation.slice(0, 2).map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`
                flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors
                ${item.current
                  ? 'text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
                }
              `}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px]">{item.name}</span>
            </a>
          ))}
          
          {/* Quick Add Button */}
          <div className="col-span-2 flex items-center justify-center">
            <button
              onClick={handleQuickAdd}
              className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {navigation.slice(2, 4).map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`
                flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors
                ${item.current
                  ? 'text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
                }
              `}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px]">{item.name}</span>
            </a>
          ))}
        </div>
      </div> );
}
 
export default MobileNavigation;