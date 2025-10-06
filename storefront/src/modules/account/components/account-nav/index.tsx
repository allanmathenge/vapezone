"use client"

import { clx } from "@medusajs/ui"
import { useParams, usePathname } from "next/navigation"
import { 
  FiUser, 
  FiMapPin, 
  FiPackage, 
  FiLogOut,
  FiChevronRight,
  FiHome
} from "react-icons/fi"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  const menuItems = [
    { href: "/account", label: "Overview", icon: FiHome, testId: "overview-link" },
    { href: "/account/profile", label: "Profile", icon: FiUser, testId: "profile-link" },
    { href: "/account/addresses", label: "Addresses", icon: FiMapPin, testId: "addresses-link" },
    { href: "/account/orders", label: "Orders", icon: FiPackage, testId: "orders-link" },
  ]

  return (
    <div className="w-full small:px-4">
      {/* Mobile View */}
      <div className="lg:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-3 text-sm font-medium text-ui-fg-subtle hover:text-ui-fg-base transition-colors py-3 px-4 bg-ui-bg-subtle rounded-lg"
            data-testid="account-main-link"
          >
            <FiChevronRight className="transform -rotate-90 text-ui-fg-muted" size={16} />
            <span>Back to Account</span>
          </LocalizedClientLink>
        ) : (
          <div className="space-y-1">
            <div className="px-4 py-6 bg-gradient-to-r from-ui-bg-base to-ui-bg-subtle border-b border-ui-border-base">
              <h1 className="text-2xl font-semibold text-ui-fg-base mb-1">
                Hello, {customer?.first_name || "Customer"}
              </h1>
              <p className="text-sm text-ui-fg-subtle">Manage your account settings</p>
            </div>
            
            <nav className="px-2">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <LocalizedClientLink
                      href={item.href}
                      className="flex items-center justify-between py-4 px-4 rounded-lg hover:bg-ui-bg-subtle transition-colors group"
                      data-testid={item.testId}
                    >
                      <div className="flex items-center gap-x-3">
                        <item.icon 
                          size={20} 
                          className="text-ui-fg-muted group-hover:text-ui-fg-base transition-colors" 
                        />
                        <span className="font-medium text-ui-fg-base">{item.label}</span>
                      </div>
                      <FiChevronRight className="text-ui-fg-muted transform -rotate-90" size={16} />
                    </LocalizedClientLink>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center justify-between w-full py-4 px-4 rounded-lg hover:bg-ui-bg-subtle transition-colors group text-ui-fg-error"
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-3">
                      <FiLogOut 
                        size={20} 
                        className="text-ui-fg-error/70 group-hover:text-ui-fg-error transition-colors" 
                      />
                      <span className="font-medium">Log out</span>
                    </div>
                    <FiChevronRight className="text-ui-fg-muted transform -rotate-90" size={16} />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block" data-testid="account-nav">
        <div className="space-y-6">
          <div className="pb-2 border-b border-ui-border-base">
            <h3 className="text-lg font-semibold text-ui-fg-base">Account</h3>
            <p className="text-sm text-ui-fg-subtle mt-1">
              Welcome back, {customer?.first_name}
            </p>
          </div>
          
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <AccountNavLink
                    href={item.href}
                    route={route!}
                    icon={item.icon}
                    data-testid={item.testId}
                  >
                    {item.label}
                  </AccountNavLink>
                </li>
              ))}
              <li className="pt-4 mt-4 border-t border-ui-border-base">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-x-3 w-full px-3 py-2 text-ui-fg-error hover:bg-ui-bg-subtle rounded-lg transition-colors group"
                  data-testid="logout-button"
                >
                  <FiLogOut 
                    size={18} 
                    className="text-ui-fg-error/70 group-hover:text-ui-fg-error transition-colors" 
                  />
                  <span className="font-medium">Log out</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  icon: Icon,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()
  const active = route.split(countryCode)[1] === href

  return (
    <LocalizedClientLink
      href={href}
      className={clx(
        "flex items-center gap-x-3 px-3 py-2 rounded-lg transition-all duration-200",
        {
          "bg-ui-bg-base shadow-sm border border-ui-border-base font-semibold text-ui-fg-base": active,
          "text-ui-fg-subtle hover:text-ui-fg-base hover:bg-ui-bg-subtle": !active,
        }
      )}
      data-testid={dataTestId}
    >
      <Icon 
        size={18} 
        className={clx({
          "text-ui-fg-base": active,
          "text-ui-fg-muted": !active,
        })} 
      />
      <span>{children}</span>
    </LocalizedClientLink>
  )
}

export default AccountNav