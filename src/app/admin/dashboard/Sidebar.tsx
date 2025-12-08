import Link from 'next/link';

const sidebarItems = [
  { label: 'Dashboard Home', href: '/admin/dashboard' },
  { label: 'Contestants', href: '/admin/dashboard/contestants' },
  { label: 'Votes', href: '/admin/dashboard/votes' },
  { label: 'Students', href: '/admin/dashboard/students' },
  { label: 'Sponsors', href: '/admin/dashboard/sponsors' },
  { label: 'Database Resources', href: '/admin/dashboard/database' },
  { label: 'Settings', href: '/admin/dashboard/settings' },
  { label: 'Logout', href: '/admin/dashboard/logout' },
];

export default function Sidebar() {
  return (
    <aside style={{ width: 220, background: '#1e293b', color: '#fff', display: 'flex', flexDirection: 'column', padding: '2rem 1rem', gap: '1rem' }}>
      {sidebarItems.map(item => (
        <Link key={item.label} href={item.href} style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, padding: '0.5rem 1rem', borderRadius: 6, transition: 'background 0.2s' }}>
          {item.label}
        </Link>
      ))}
    </aside>
  );
}
