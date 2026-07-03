"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, CalendarCheck, BarChart3, Settings,
  ExternalLink, Search, Bell, Menu, X,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "CRM · Leads", href: "/crm", icon: Users },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Bookings", href: "/admin#bookings", icon: CalendarCheck },
];

export default function AdminShell({ title, subtitle, children, actions }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { ["/admin", "/crm", "/analytics"].forEach((r) => router.prefetch(r)); }, [router]);

  const go = (href) => {
    setOpen(false);
    if (href.startsWith("/admin#")) {
      if (pathname !== "/admin") { router.push(href); return; }
      const el = document.querySelector(href.slice(6));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    router.push(href);
  };

  const isActive = (href) => !href.includes("#") && pathname === href;

  const SideContent = () => (
    <>
      <div className="flex items-center gap-2.5 px-5 pb-8 pt-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-indigo font-display text-lg font-semibold text-white">V</div>
        <div>
          <div className="font-display text-lg leading-none tracking-[0.14em] text-mist">THE VIVI</div>
          <div className="mt-0.5 text-[0.6rem] uppercase tracking-[0.22em] text-silver/45">Operations</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((n) => {
          const active = isActive(n.href);
          return (
            <button key={n.href} onClick={() => go(n.href)}
              className={`relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${active ? "text-white" : "text-silver/60 hover:text-mist"}`}>
              {active && <motion.span layoutId="admin-active" className="absolute inset-0 rounded-xl border border-sky/20 bg-gradient-to-r from-electric/20 to-transparent" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
              <n.icon size={18} className="relative shrink-0" />
              <span className="relative">{n.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="space-y-1 px-3 pb-5">
        <button onClick={() => router.push("/")} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-silver/60 transition hover:text-mist">
          <ExternalLink size={18} /> View Live Site
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-silver/60 transition hover:text-mist">
          <Settings size={18} /> Settings
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-base text-mist">
      {/* desktop sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[248px] flex-col border-r border-white/8 bg-panel/50 backdrop-blur-2xl lg:flex">
        <SideContent />
      </aside>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-base/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} className="absolute left-0 top-0 flex h-full w-[248px] flex-col border-r border-white/8 bg-panel">
            <button onClick={() => setOpen(false)} className="absolute right-3 top-4 rounded-lg border border-white/10 p-2 text-silver"><X size={16} /></button>
            <SideContent />
          </motion.aside>
        </div>
      )}

      <div className="lg:pl-[248px]">
        {/* topbar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-white/8 bg-base/70 px-5 py-4 backdrop-blur-2xl md:px-8">
          <button onClick={() => setOpen(true)} className="rounded-lg border border-white/10 p-2 text-silver lg:hidden"><Menu size={18} /></button>
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl text-mist md:text-3xl">{title}</h1>
            {subtitle && <p className="truncate text-xs text-silver/50">{subtitle}</p>}
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-panel/60 px-3.5 py-2 text-sm text-silver/50 md:flex">
              <Search size={14} /> <span className="text-xs">Search…</span>
            </div>
            {actions}
            <button className="relative rounded-full border border-white/10 bg-panel/60 p-2.5 text-silver/70 hover:text-mist">
              <Bell size={16} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-sky" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-sm font-medium text-white">EA</div>
          </div>
        </header>

        <main className="px-5 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
