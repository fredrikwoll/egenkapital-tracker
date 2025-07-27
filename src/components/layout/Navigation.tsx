
export type NavigationItem = {
  name: string;
  href: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  current: boolean;
}

const Navigation = ({navigation}: {navigation: NavigationItem[]}) => {
    return (
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`
                      group flex h-12 w-12 items-center justify-center rounded-lg text-sm font-medium transition-colors
                      ${item.current
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                      }
                    `}
                    title={item.name}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav> );
}
 
export default Navigation;