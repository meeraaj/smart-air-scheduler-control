import { useState } from "react"
import { 
  Thermometer, 
  Calendar, 
  BarChart3, 
  Settings,
  Home,
  Wind
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { 
    title: "AC Remote", 
    url: "/", 
    icon: Thermometer,
    description: "Control your AC"
  },
  { 
    title: "Scheduler", 
    url: "/scheduler", 
    icon: Calendar,
    description: "Set AC schedule"
  },
  { 
    title: "Analytics", 
    url: "/analytics", 
    icon: BarChart3,
    description: "Usage statistics"
  },
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings,
    description: "App preferences"
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/"
    }
    return currentPath.startsWith(path)
  }

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-r-2 border-primary shadow-sm" 
      : "hover:bg-muted/50 transition-colors"

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r border-border bg-gradient-background`}
      collapsible="icon"
    >
      <SidebarContent className="pt-6">
        {/* App Header */}
        <div className={`px-4 pb-6 ${collapsed ? "text-center" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-cool">
              <Wind className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-foreground">Smart AC</h1>
                <p className="text-sm text-muted-foreground">Remote Controller</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={getNavCls}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Status */}
        {!collapsed && (
          <div className="mt-auto p-4">
            <div className="bg-card rounded-lg p-3 shadow-card border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium text-foreground">AC Status</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Connected & Running
              </p>
              <p className="text-sm font-semibold text-primary">22°C</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}