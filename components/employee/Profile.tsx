'use client';
import { useState } from 'react';
import { Button, Card, Input, Textarea, Pill, Avatar } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import Image from 'next/image';
import profilePic from '@/public/m.png';

const PROFILE = {
  name: 'A M Rashid Ashef Hossain',
  role: 'IT Manager',
  team: 'IT Team',
  email: 'rashid@tvsl-bd.com',
  phone: '+88 01711-000000',
  joined: 'January 15, 2022',
  location: 'Dhaka, Bangladesh',
  bio: 'Experienced IT Manager overseeing TVSL\'s internal infrastructure, helpdesk operations, and IT security protocols. Skilled in network administration, Linux systems, and enterprise IT support. Passionate about building reliable, secure technology environments.',
  skills: ['Network Admin', 'IT Security', 'Linux', 'Python', 'Cisco IOS', 'Monitoring', 'Help Desk', 'Active Directory'],
  education: 'BSc Computer Science & Engineering, BUET (2018)',
  id: 'EMP-0042',
};

export default function EmployeeProfile() {
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(PROFILE.phone);
  const [bio, setBio] = useState(PROFILE.bio);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 32px 80px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'oklch(0.18 0.02 260)', margin: 0, letterSpacing: '-0.025em', fontFamily: 'var(--font-display)' }}>My Profile</h1>
          <p style={{ color: 'oklch(0.52 0.012 250)', fontSize: 14, margin: '4px 0 0' }}>View and manage your personal information</p>
        </div>
        {saved && <Pill tone="success"><Icon name="check" size={12}/> Saved successfully</Pill>}
      </div>

      {/* Profile card */}
      <Card style={{ padding: 0, overflow: 'hidden', boxShadow: '0 4px 24px oklch(0.32 0.18 260 / 0.08)' }}>
        <div style={{
            height: 70,
            background:'linear-gradient(135deg, oklch(0.28 0.18 260) 0%, oklch(0.42 0.15 280) 100%)', }} />

<div style={{ padding: '20px 28px 28px' }}> </div> <div style={{ padding: '0 28px 28px', marginTop: -52 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ width: 90, height: 90, borderRadius: '50%', border: '4px solid white', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 16px oklch(0 0 0 / 0.15)' }}>
              <Avatar name={PROFILE.name} size={90}/>
            </div>
            <Button variant={editing ? 'primary' : 'outline'} size="sm" onClick={editing ? handleSave : () => setEditing(true)} style={{ marginBottom: 4 }}>
              <Icon name={editing ? 'check' : 'edit'} size={14}/>
              {editing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'oklch(0.18 0.02 260)', margin: '0 0 4px', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>{PROFILE.name}</h2>
          <p style={{ color: 'oklch(0.42 0.02 260)', margin: '0 0 12px', fontSize: 15, fontWeight: 500 }}>{PROFILE.role} · {PROFILE.team}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Pill tone="primary">{PROFILE.team}</Pill>
            <Pill tone="neutral">{PROFILE.id}</Pill>
            <Pill tone="success">Active</Pill>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Contact info */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'oklch(0.18 0.02 260)', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '-0.01em' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'oklch(0.94 0.03 260)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="user" size={14} color="oklch(0.32 0.18 260)"/>
            </div>
            Contact Information
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InfoRow icon="mail" label="Email" value={PROFILE.email} muted/>
            <InfoRow icon="phone" label="Phone">
              {editing
                ? <Input value={phone} onChange={e => setPhone(e.target.value)} style={{ fontSize: 14, padding: '6px 10px' }}/>
                : <span style={{ color: 'oklch(0.22 0.02 260)', fontSize: 14, fontWeight: 500 }}>{phone}</span>
              }
            </InfoRow>
            <InfoRow icon="mapPin" label="Location" value={PROFILE.location} muted/>
            <InfoRow icon="calendar" label="Joined" value={PROFILE.joined} muted/>
          </div>
        </Card>

        {/* About */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'oklch(0.18 0.02 260)', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '-0.01em' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'oklch(0.94 0.03 260)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="user" size={14} color="oklch(0.32 0.18 260)"/>
            </div>
            About Me
          </h3>
          {editing
            ? <Textarea value={bio} onChange={e => setBio(e.target.value)} rows={6} style={{ fontSize: 14, width: '100%', boxSizing: 'border-box' }}/>
            : <p style={{ color: 'oklch(0.42 0.015 260)', fontSize: 14, lineHeight: 1.75, margin: 0 }}>{bio}</p>
          }
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Skills */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'oklch(0.18 0.02 260)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '-0.01em' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'oklch(0.94 0.03 260)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="sparkle" size={14} color="oklch(0.32 0.18 260)"/>
            </div>
            Skills
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PROFILE.skills.map(s => (
              <span key={s} style={{ background: 'oklch(0.94 0.03 260)', color: 'oklch(0.28 0.18 260)', border: '1px solid oklch(0.86 0.06 260)', borderRadius: 99, padding: '5px 13px', fontSize: 13, fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </Card>

        {/* Education */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'oklch(0.18 0.02 260)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '-0.01em' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'oklch(0.94 0.03 260)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="briefcase" size={14} color="oklch(0.32 0.18 260)"/>
            </div>
            Education
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'oklch(0.94 0.03 260)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="briefcase" size={20} color="oklch(0.32 0.18 260)"/>
            </div>
            <div>
              <p style={{ color: 'oklch(0.18 0.02 260)', fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>BSc Computer Science & Engineering</p>
              <p style={{ color: 'oklch(0.42 0.015 260)', margin: '0 0 3px', fontSize: 13 }}>Bangladesh University of Engineering and Technology (BUET)</p>
              <p style={{ color: 'oklch(0.62 0.01 260)', margin: 0, fontSize: 12 }}>Graduated 2018</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Security */}
      <Card style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'oklch(0.18 0.02 260)', margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '-0.01em' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'oklch(0.94 0.03 260)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="shield" size={14} color="oklch(0.32 0.18 260)"/>
          </div>
          Security & Account
        </h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button variant="outline" size="sm"><Icon name="key" size={14}/>Change Password</Button>
          <Button variant="ghost" size="sm"><Icon name="shield" size={14}/>Two-Factor Auth</Button>
          <Button variant="ghost" size="sm"><Icon name="logout" size={14}/>Active Sessions</Button>
        </div>
      </Card>
    </div>
  );
}

function InfoRow({ icon, label, value, muted, children }: { icon: string; label: string; value?: string; muted?: boolean; children?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, background: 'oklch(0.96 0.006 260)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid oklch(0.91 0.008 260)' }}>
        <Icon name={icon} size={15} color="oklch(0.32 0.18 260)"/>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ color: 'oklch(0.62 0.01 260)', fontSize: 11, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{label}</p>
        {children || <p style={{ color: muted ? 'oklch(0.42 0.015 260)' : 'oklch(0.22 0.02 260)', fontSize: 14, margin: 0, fontWeight: 500 }}>{value}</p>}
      </div>
    </div>
  );
}
