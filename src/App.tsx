import { useState } from 'react'
import {
  Plus, Filter, Trash2, Check, MoreVertical, ArrowRight, Search,
  Layers, Palette, Type, MousePointer2, TextCursorInput, TagIcon,
  Table, LayoutGrid, SidebarIcon, GitBranch, Bell, SquareStack, Box, Smile,
  Car, FileText, Truck, Building2, Users, Shield, Receipt, MapPin,
  Calendar, CheckCircle, BarChart3, ScrollText, Clock, Settings,
  Navigation, Key, AlertCircle, FileCheck,
  LayoutDashboard, Package, MoreHorizontal, Building, User,
  AlertTriangle, FolderOpen, FolderClosed, Pencil, Phone,
} from 'lucide-react'
import {
  Button, Input, Select, Textarea, Badge, Tag, Alert, Modal, DataTable, KpiCard,
  Timeline, Sidebar, Tabs, Breadcrumbs, XLinkLogo, SearchBox,
  // Estados & Loading
  ToastContainer, Snackbar, OfflineBanner, useToast,
  ErrorPage, KpiCardSkeleton, TableRowSkeleton, ListItemSkeleton, CardSkeleton,
  EmptyState,
  // Navegação & Feedback
  NotificationBell, NotificationPanel, useNotifications,
  BottomTabs, Drawer,
  // Formulários
  PasswordInput, DatePicker, FileUpload, MaskedInput, Checkbox, RadioGroup,
  StarRating, RatingWithComment,
  ConfirmModal,
  // Data Display
  TreeView, StateBadge,
  // Mapas & Tracking
  MapView, PODCapture,
} from './components'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-title text-xl font-bold mb-6 text-[var(--brand-darkest)] flex items-center gap-3 pl-4 border-l-[3px] border-l-[var(--brand-light)]">
      {children}
    </h2>
  )
}

const sideNavItems = [
  { id: 'marca', icon: <Layers size={16} />, label: 'Identidade' },
  { id: 'cores', icon: <Palette size={16} />, label: 'Cores' },
  { id: 'tipografia', icon: <Type size={16} />, label: 'Tipografia' },
  { id: 'botoes', icon: <MousePointer2 size={16} />, label: 'Botoes' },
  { id: 'inputs', icon: <TextCursorInput size={16} />, label: 'Inputs & Forms' },
  { id: 'badges', icon: <TagIcon size={16} />, label: 'Status & Badges' },
  { id: 'tabela', icon: <Table size={16} />, label: 'Data Table' },
  { id: 'cards', icon: <LayoutGrid size={16} />, label: 'Cards' },
  { id: 'nav', icon: <SidebarIcon size={16} />, label: 'Navegacao' },
  { id: 'timeline', icon: <GitBranch size={16} />, label: 'Timeline & Logs' },
  { id: 'alerts', icon: <Bell size={16} />, label: 'Alertas & Toasts' },
  { id: 'modais', icon: <SquareStack size={16} />, label: 'Modais' },
  { id: 'elevacao', icon: <Box size={16} />, label: 'Elevacao & Depth' },
  { id: 'icones', icon: <Smile size={16} />, label: 'Iconografia' },
  { id: 'estados', icon: <AlertCircle size={16} />, label: 'Estados & Loading' },
  { id: 'notificacoes', icon: <Bell size={16} />, label: 'Notificacoes' },
  { id: 'mobile', icon: <Phone size={16} />, label: 'Mobile Nav' },
  { id: 'forms-avancados', icon: <TextCursorInput size={16} />, label: 'Forms Avancados' },
  { id: 'tree', icon: <FolderOpen size={16} />, label: 'Tree View' },
  { id: 'mapa', icon: <MapPin size={16} />, label: 'Mapa & Tracking' },
  { id: 'pod', icon: <FileCheck size={16} />, label: 'POD Capture' },
]

const sidebarItems = [
  { icon: <LayoutDashboard size={16} />, label: 'Dashboard', active: true },
  { icon: <Users size={16} />, label: 'Clientes (CRM)' },
  { icon: <FileCheck size={16} />, label: 'Contratos' },
  { icon: <Car size={16} />, label: 'Mobilidade' },
  { icon: <Package size={16} />, label: 'Documentos' },
  { icon: <Truck size={16} />, label: 'Frota & Aluguel' },
  { icon: <Receipt size={16} />, label: 'Billing' },
  { icon: <BarChart3 size={16} />, label: 'Relatorios' },
  { icon: <Shield size={16} />, label: 'IAM & Acessos' },
  { icon: <ScrollText size={16} />, label: 'Auditoria' },
]

function App() {
  const [activeNav, setActiveNav] = useState('marca')
  const [justifyModal, setJustifyModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [offline, setOffline] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedTree, setSelectedTree] = useState<string>()
  const [radioVal, setRadioVal] = useState('')
  const [checkVal, setCheckVal] = useState(false)
  const { toasts, add: addToast, remove: removeToast } = useToast()
  const { notifications, markRead, markAllRead, dismiss: dismissNotif, add: addNotif } = useNotifications([
    { id: '1', variant: 'success', title: 'Contrato ativado', message: 'CTR-2025-00142 foi ativado com sucesso.', time: 'Agora mesmo', read: false },
    { id: '2', variant: 'warning', title: 'Aprovação pendente', message: '7 viagens aguardam aprovação.', time: '5 min atrás', read: false },
    { id: '3', variant: 'info', title: 'Novo catálogo disponível', message: 'Tabela de preços v4 publicada.', time: '1h atrás', read: true },
  ])

  const tableData = [
    { name: 'Acme Corporation', nif: 'NIF: 500 123 456', type: 'B2B', typeBg: 'bg-[#F1F5F9]', typeColor: 'text-[var(--text-secondary)]', country: 'Portugal', status: 'active' as const, contracts: 3, iconBg: 'bg-[var(--primary-lighter)]', iconColor: 'text-[var(--primary)]', icon: <Building2 size={15} /> },
    { name: 'Grupo Horizonte Holdings', nif: 'CNPJ: 12.345.678/0001-90', type: 'Holding', typeBg: 'bg-[#EEF2FF]', typeColor: 'text-[#4338CA]', country: 'Brasil', status: 'active' as const, contracts: 7, iconBg: 'bg-[#ECFDF5]', iconColor: 'text-[#059669]', icon: <Building size={15} /> },
    { name: 'LogiTrans S.A.', nif: 'NIF: 501 987 654', type: 'B2B', typeBg: 'bg-[#F1F5F9]', typeColor: 'text-[var(--text-secondary)]', country: 'Portugal', status: 'suspended' as const, contracts: 1, iconBg: 'bg-[var(--warning-bg)]', iconColor: 'text-[#D97706]', icon: <Building2 size={15} /> },
    { name: 'Carlos Mendes', nif: 'CPF: 123.456.789-00', type: 'B2C', typeBg: 'bg-[#FFF7ED]', typeColor: 'text-[#C2410C]', country: 'Brasil', status: 'closed' as const, contracts: 0, iconBg: 'bg-[var(--danger-bg)]', iconColor: 'text-[#DC2626]', icon: <User size={15} /> },
  ]

  const columns = [
    {
      key: 'name', header: 'Cliente',
      render: (row: typeof tableData[0]) => (
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 ${row.iconBg} rounded-lg flex items-center justify-center`}>
            <span className={row.iconColor}>{row.icon}</span>
          </div>
          <div>
            <span className="font-semibold text-[var(--text-primary)]">{row.name}</span>
            <br />
            <span className="text-[11px] text-[var(--text-muted)]">{row.nif}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'type', header: 'Tipo',
      render: (row: typeof tableData[0]) => (
        <span className={`text-[11px] font-semibold py-[3px] px-2 rounded-full ${row.typeBg} ${row.typeColor}`}>{row.type}</span>
      ),
    },
    { key: 'country', header: 'Pais', render: (row: typeof tableData[0]) => <span className="text-xs">{row.country}</span> },
    { key: 'status', header: 'Estado', render: (row: typeof tableData[0]) => <Badge variant={row.status}>{row.status === 'active' ? 'Ativo' : row.status === 'suspended' ? 'Suspenso' : 'Encerrado'}</Badge> },
    { key: 'contracts', header: 'Contratos', render: (row: typeof tableData[0]) => <span className="text-[13px] font-semibold">{row.contracts}</span> },
    {
      key: 'actions', header: 'Acoes', align: 'right' as const,
      render: () => <Button variant="ghost" size="sm" className="!py-1 !px-2"><MoreHorizontal size={15} /></Button>,
    },
  ]

  return (
    <div className="bg-grid bg-mesh-corporate relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 relative z-[1]">
        {/* HEADER */}
        <header className="mb-12 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-4">
            <img src="/logos/xcel-logo-color.png" alt="Xcel" className="h-10 w-auto object-contain" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--brand-dark)] opacity-70">Design System v1.0</span>
              <h1 className="font-title text-xl font-bold text-[var(--brand-darkest)] leading-tight mt-0.5">
                xLink
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="active">Producao</Badge>
            <span className="text-[11px] text-[var(--text-muted)]">Marco 2026</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* SIDE NAV */}
          <nav className="hidden md:block md:col-span-3 sticky top-6 h-fit">
            <ul className="flex flex-col gap-0.5 text-[13px] font-medium text-[var(--text-muted)] list-none p-0 m-0">
              {sideNavItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setActiveNav(item.id)}
                    className={`flex items-center gap-3 py-2 px-3 rounded-lg no-underline transition-colors ${
                      activeNav === item.id ? 'text-[var(--brand-light)] font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--brand-mid)]'
                    }`}
                  >
                    {item.icon} {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* MAIN */}
          <main className="md:col-span-9 space-y-24">
            {/* IDENTIDADE */}
            <section id="marca">
              <SectionTitle>Identidade de Marca</SectionTitle>
              <div className="space-y-5">
                {/* Logos em contexto */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="p-8 bg-white rounded-xl elevation-1 flex flex-col gap-4 items-center">
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider self-start">Cor — fundo claro</span>
                    <img src="/logos/xcel-logo-color.png" alt="Xcel logo cor" className="h-12 w-auto object-contain" />
                  </div>
                  <div className="p-8 rounded-xl flex flex-col gap-4 items-center" style={{ background: 'var(--brand-darkest)' }}>
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider self-start">Branco — fundo escuro</span>
                    <img src="/logos/xcel-logo-white.png" alt="Xcel logo branco" className="h-12 w-auto object-contain" />
                  </div>
                  <div className="p-8 bg-white rounded-xl elevation-1 flex flex-col gap-4 items-center">
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider self-start">Preto — fundo claro</span>
                    <img src="/logos/xcel-logo-black.png" alt="Xcel logo preto" className="h-12 w-auto object-contain" />
                  </div>
                </div>
                {/* Logo compacta — sem tagline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="p-8 rounded-xl flex flex-col gap-4 items-center" style={{ background: 'var(--brand-darkest)' }}>
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider self-start">Compacta — fundo escuro</span>
                    <img src="/logos/xcel-logo-icon.png" alt="Xcel logo compacta escuro" className="h-12 w-auto object-contain" />
                  </div>
                  <div className="p-8 bg-white rounded-xl elevation-1 flex flex-col gap-4 items-center">
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider self-start">Compacta — fundo claro</span>
                    <img src="/logos/xcel-logo-icon.png" alt="Xcel logo compacta claro" className="h-12 w-auto object-contain" />
                  </div>
                </div>
              </div>
            </section>

            {/* CORES */}
            <section id="cores">
              <SectionTitle>Paleta de Cores</SectionTitle>
              <div className="space-y-5">
                <div className="p-5 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Paleta Xcel — Escala Primária</span>
                  <div className="grid grid-cols-5 rounded-xl overflow-hidden border border-[var(--border)]">
                    {[
                      { name: 'DARKEST', hex: '#13293D', bg: 'var(--brand-darkest)', light: true },
                      { name: 'DARK', hex: '#006494', bg: 'var(--brand-dark)', light: true },
                      { name: 'MID', hex: '#247BA0', bg: 'var(--brand-mid)', light: true },
                      { name: 'LIGHT', hex: '#1B98E0', bg: 'var(--brand-light)', light: true },
                      { name: 'LIGHTEST', hex: '#E8F1F2', bg: 'var(--brand-lightest)', light: false },
                    ].map((c) => (
                      <div key={c.name} className="h-24 flex flex-col justify-end p-3" style={{ background: c.bg }}>
                        <span className={`text-[9px] font-bold ${c.light ? 'text-white/50' : 'text-[var(--brand-dark)]'}`}>{c.name}</span>
                        <span className={`text-[10px] font-semibold font-mono ${c.light ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>{c.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Semanticas</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { name: 'Sucesso', hex: '#10B981', bg: 'var(--success)', icon: <CheckCircle size={18} className="text-white" /> },
                      { name: 'Alerta', hex: '#F59E0B', bg: 'var(--warning)', icon: <AlertTriangle size={18} className="text-white" /> },
                      { name: 'Erro / Perigo', hex: '#EF4444', bg: 'var(--danger)', icon: <AlertCircle size={18} className="text-white" /> },
                      { name: 'Info', hex: '#6366F1', bg: 'var(--info)', icon: <AlertCircle size={18} className="text-white" /> },
                    ].map((c) => (
                      <div key={c.name} className="rounded-xl overflow-hidden border border-[var(--border)]">
                        <div className="h-12 flex items-center justify-center" style={{ background: c.bg }}>{c.icon}</div>
                        <div className="p-3 bg-white">
                          <p className="text-[11px] font-bold text-[var(--text-primary)]">{c.name}</p>
                          <p className="text-[10px] text-[var(--text-muted)] font-mono">{c.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* TIPOGRAFIA */}
            <section id="tipografia">
              <SectionTitle>Tipografia</SectionTitle>
              <div className="space-y-5">
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider">Sora — Titulos & Display</span>
                  <div className="mt-5 flex flex-col">
                    {[
                      { label: 'Display', text: 'Conectando pessoas', size: '44px', weight: 800, spec: '44px / ExtraBold' },
                      { label: 'H1', text: 'Dashboard Corporativo', size: '32px', weight: 700, spec: '32px / Bold' },
                      { label: 'H2', text: 'Gestao de Contratos', size: '24px', weight: 700, spec: '24px / Bold' },
                      { label: 'H3', text: 'Politica de Mobilidade', size: '18px', weight: 600, spec: '18px / SemiBold' },
                      { label: 'H4', text: 'Centros de Custo', size: '15px', weight: 600, spec: '15px / SemiBold' },
                    ].map((t, i) => (
                      <div key={t.label} className={`flex items-baseline justify-between py-4 ${i < 4 ? 'border-b border-[#F8FAFC]' : ''}`}>
                        <div className="flex items-baseline gap-4 min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-[var(--text-muted)] w-[52px] shrink-0">{t.label}</span>
                          <span className="font-title text-[var(--text-primary)] leading-tight overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: t.size, fontWeight: t.weight }}>{t.text}</span>
                        </div>
                        <code className="hidden sm:block text-[10px] text-[var(--text-muted)] bg-[#F8FAFC] py-[3px] px-2 rounded-md shrink-0">{t.spec}</code>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">DM Sans — Corpo & Interface</span>
                  <div className="mt-5 flex flex-col">
                    {[
                      { label: 'Body', text: 'Plataforma integrada de mobilidade corporativa e gestao financeira.', size: '15px', spec: '15px / Regular' },
                      { label: 'Small', text: 'Mais de 12 modulos operacionais integrados.', size: '13px', spec: '13px / Regular' },
                      { label: 'Caption', text: 'Atualizado em 19 mar 2026 · v1.0', size: '12px', spec: '12px / Regular', muted: true },
                      { label: 'Label', text: 'CENTRO DE CUSTO · FINANCEIRO', size: '11px', spec: '11px / SemiBold + caps', upper: true, bold: true },
                      { label: 'Overline', text: 'DESIGN SYSTEM V1.0 — XLINK', size: '10px', spec: '10px / Bold + caps', upper: true, bold: true, muted: true },
                    ].map((t, i) => (
                      <div key={t.label} className={`flex items-baseline justify-between py-3.5 ${i < 4 ? 'border-b border-[#F8FAFC]' : ''}`}>
                        <div className="flex items-baseline gap-4 flex-1">
                          <span className="text-[10px] font-bold text-[var(--text-muted)] w-[60px]">{t.label}</span>
                          <span
                            className={`${t.muted ? 'text-[var(--text-muted)]' : 'text-[var(--text-secondary)]'} ${t.upper ? 'uppercase' : ''} ${t.bold ? 'font-semibold' : ''}`}
                            style={{ fontSize: t.size, letterSpacing: t.upper ? '0.04em' : undefined }}
                          >{t.text}</span>
                        </div>
                        <code className="hidden sm:block text-[10px] text-[var(--text-muted)] bg-[#F8FAFC] py-[3px] px-2 rounded-md shrink-0">{t.spec}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* BOTOES */}
            <section id="botoes">
              <SectionTitle>Botoes</SectionTitle>
              <div className="space-y-5">
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-5">Variantes</span>
                  <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex flex-col gap-2"><span className="text-[10px] text-[var(--text-muted)] font-semibold">Primario</span><Button><Plus size={15} /> Criar Contrato</Button></div>
                    <div className="flex flex-col gap-2"><span className="text-[10px] text-[var(--text-muted)] font-semibold">Secundario</span><Button variant="secondary"><Filter size={15} /> Filtrar</Button></div>
                    <div className="flex flex-col gap-2"><span className="text-[10px] text-[var(--text-muted)] font-semibold">Outline</span><Button variant="outline">Exportar</Button></div>
                    <div className="flex flex-col gap-2"><span className="text-[10px] text-[var(--text-muted)] font-semibold">Ghost</span><Button variant="ghost">Cancelar</Button></div>
                    <div className="flex flex-col gap-2"><span className="text-[10px] text-[var(--text-muted)] font-semibold">Perigo</span><Button variant="danger"><Trash2 size={15} /> Excluir</Button></div>
                    <div className="flex flex-col gap-2"><span className="text-[10px] text-[var(--text-muted)] font-semibold">Sucesso</span><Button variant="success"><Check size={15} /> Aprovar</Button></div>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-5">Tamanhos & Formatos</span>
                  <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex flex-col gap-2"><span className="text-[10px] text-[var(--text-muted)] font-semibold">Small</span><Button size="sm">Detalhes</Button></div>
                    <div className="flex flex-col gap-2"><span className="text-[10px] text-[var(--text-muted)] font-semibold">Medium</span><Button>Detalhes</Button></div>
                    <div className="flex flex-col gap-2"><span className="text-[10px] text-[var(--text-muted)] font-semibold">Large</span><Button size="lg">Detalhes</Button></div>
                    <div className="flex flex-col gap-2"><span className="text-[10px] text-[var(--text-muted)] font-semibold">Pill</span><Button size="pill">Detalhes</Button></div>
                    <div className="flex flex-col gap-2"><span className="text-[10px] text-[var(--text-muted)] font-semibold">Icone</span><Button variant="outline" size="icon"><MoreVertical size={16} /></Button></div>
                    <div className="flex flex-col gap-2"><span className="text-[10px] text-[var(--text-muted)] font-semibold">Link</span><button className="text-[var(--primary)] font-semibold inline-flex items-center gap-1.5 text-[13px] bg-transparent border-none cursor-pointer">Ver todos <ArrowRight size={14} /></button></div>
                  </div>
                </div>
              </div>
            </section>

            {/* INPUTS */}
            <section id="inputs">
              <SectionTitle>Inputs & Forms</SectionTitle>
              <div className="space-y-5">
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Search simples</span>
                  <div className="max-w-[480px]">
                    <Input iconLeft={<Search size={16} />} placeholder="Buscar cliente, contrato ou servico..." />
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Search com dropdown agrupado</span>
                  <div className="max-w-[480px]">
                    <SearchBox
                      placeholder="Buscar cliente, contrato ou servico..."
                      groups={[
                        {
                          title: 'Clientes',
                          items: [
                            { id: '1', label: 'Acme Corporation', description: 'NIF: 500 123 456 · Portugal', icon: <Building2 size={15} /> },
                            { id: '2', label: 'Grupo Horizonte Holdings', description: 'CNPJ: 12.345.678/0001-90 · Brasil', icon: <Building size={15} /> },
                            { id: '3', label: 'LogiTrans S.A.', description: 'NIF: 501 987 654 · Portugal', icon: <Building2 size={15} /> },
                          ],
                        },
                        {
                          title: 'Contratos',
                          items: [
                            { id: '4', label: 'CTR-2025-00142', description: 'Acme Corporation · Mobilidade + Documentos', icon: <FileCheck size={15} /> },
                            { id: '5', label: 'CTR-2025-00089', description: 'Grupo Horizonte · Frota & Aluguel', icon: <FileCheck size={15} /> },
                          ],
                        },
                        {
                          title: 'Servicos',
                          items: [
                            { id: '6', label: 'Mobilidade Corporativa', description: '3 contratos ativos', icon: <Car size={15} /> },
                            { id: '7', label: 'Tramitacao Documental', description: '2 contratos ativos', icon: <FileText size={15} /> },
                          ],
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Text Inputs</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Nome da Empresa" placeholder="Ex: Acme Corp Ltda" helper="Nome legal da entidade" />
                    <Input label="NIF / CNPJ" placeholder="00.000.000/0001-00" />
                    <Input label="E-mail do Gestor" type="email" placeholder="gestor@empresa.com" />
                    <Input label="Centro de Custo — erro" error="Formato invalido. Use o codigo do centro de custo (ex: CC-001)." defaultValue="ABC" />
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Selects & Textarea</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Select label="Dominio de Servico" options={[
                      { value: '', label: 'Selecione o dominio', disabled: true },
                      { value: 'mob', label: 'Mobilidade Corporativa' },
                      { value: 'doc', label: 'Tramitacao de Documentos' },
                      { value: 'alug', label: 'Aluguel de Veiculos' },
                    ]} defaultValue="" />
                    <Select label="Estado do Contrato" options={[
                      { value: '', label: 'Selecione o estado', disabled: true },
                      { value: 'config', label: 'Em Configuracao' },
                      { value: 'ativo', label: 'Ativo' },
                      { value: 'suspenso', label: 'Suspenso' },
                      { value: 'encerrado', label: 'Encerrado' },
                    ]} defaultValue="" />
                    <div className="sm:col-span-2">
                      <Textarea label="Justificativa" rows={3} placeholder="Descreva a justificativa para a mudanca de estado..." />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* STATUS & BADGES */}
            <section id="badges">
              <SectionTitle>Status & Badges</SectionTitle>
              <div className="space-y-5">
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Estados de Entidade (State Machine)</span>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="config">Em Configuracao</Badge>
                    <Badge variant="active">Ativo</Badge>
                    <Badge variant="invited">Convidado</Badge>
                    <Badge variant="suspended">Suspenso</Badge>
                    <Badge variant="blocked">Bloqueado</Badge>
                    <Badge variant="closed">Encerrado</Badge>
                    <Badge variant="neutral">Desativado</Badge>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Transicoes de Estado — Exemplo: Usuario</span>
                  <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
                    <Badge variant="invited">Convidado</Badge>
                    <ArrowRight size={14} className="text-[var(--text-muted)]" />
                    <Badge variant="active">Ativo</Badge>
                    <ArrowRight size={14} className="text-[var(--text-muted)]" />
                    <Badge variant="suspended">Suspenso</Badge>
                    <ArrowRight size={14} className="text-[var(--text-muted)]" />
                    <Badge variant="active">Ativo</Badge>
                    <ArrowRight size={14} className="text-[var(--text-muted)]" />
                    <Badge variant="closed">Desativado</Badge>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Tags de Dominio / Servico</span>
                  <div className="flex flex-wrap gap-2">
                    <Tag color="primary">Mobilidade Corporativa</Tag>
                    <Tag color="green">Aluguel de Veiculos</Tag>
                    <Tag color="orange">Tramitacao Documental</Tag>
                    <Tag color="indigo">Billing & Faturacao</Tag>
                    <Tag color="pink">CRM Enterprise</Tag>
                  </div>
                </div>
              </div>
            </section>

            {/* DATA TABLE */}
            <section id="tabela">
              <SectionTitle>Data Table</SectionTitle>
              <div className="bg-white rounded-xl elevation-2 overflow-hidden">
                <div className="py-4 px-5 flex items-center justify-between border-b border-[var(--border)] gap-3 flex-wrap">
                  <div className="font-title text-[15px] font-semibold text-[var(--text-primary)]">Clientes Corporativos</div>
                  <div className="flex gap-2 items-center">
                    <div className="w-[220px]">
                      <Input iconLeft={<Search size={14} />} placeholder="Buscar cliente..." className="!py-[7px] !px-3 !pl-[34px] !text-xs !rounded-[var(--radius-sm)]" />
                    </div>
                    <Button variant="secondary" size="sm"><Filter size={13} /> Filtrar</Button>
                    <Button size="sm"><Plus size={13} /> Novo</Button>
                  </div>
                </div>
                <DataTable columns={columns} data={tableData} />
                <div className="py-3 px-5 flex items-center justify-between border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
                  <span>Mostrando 1–4 de 128 clientes</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="!py-1 !px-2.5" disabled>&laquo;</Button>
                    <Button size="sm" className="!py-1 !px-2.5">1</Button>
                    <Button variant="ghost" size="sm" className="!py-1 !px-2.5">2</Button>
                    <Button variant="ghost" size="sm" className="!py-1 !px-2.5">3</Button>
                    <Button variant="ghost" size="sm" className="!py-1 !px-2.5">&raquo;</Button>
                  </div>
                </div>
              </div>
            </section>

            {/* CARDS */}
            <section id="cards">
              <SectionTitle>Cards</SectionTitle>
              <div className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <KpiCard icon={<Car size={18} className="text-[var(--primary)]" />} value="1.247" label="Viagens este mes" trend={{ value: '+12%', positive: true }} />
                  <KpiCard icon={<FileText size={18} className="text-[#059669]" />} iconBg="bg-[#ECFDF5]" value="384" label="Entregas documentais" trend={{ value: '+5%', positive: true }} />
                  <KpiCard icon={<Clock size={18} className="text-[#D97706]" />} iconBg="bg-[var(--warning-bg)]" value="98.2%" label="SLA cumprido" trend={{ value: '-3%', positive: false }} />
                  <KpiCard icon={<AlertCircle size={18} className="text-[var(--danger)]" />} iconBg="bg-[var(--danger-bg)]" value="7" label="Aprovacoes pendentes" />
                </div>

                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">Cards de Servico & Entidade</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Viagem Card */}
                  <div className="bg-white rounded-xl elevation-1 overflow-hidden card-hover">
                    <div className="px-4 h-12 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, var(--primary-lighter), var(--primary-light))' }}>
                      <div className="flex items-center gap-2">
                        <Car size={16} className="text-[var(--primary)]" />
                        <span className="text-[11px] font-bold text-[var(--primary)] uppercase tracking-wider">Viagem Corporativa</span>
                      </div>
                      <Badge variant="active" pulseDot className="!text-[10px]">Em Andamento</Badge>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div><span className="text-sm font-bold text-[var(--text-primary)]">VG-2026-04821</span><br /><span className="text-xs text-[var(--text-muted)]">Joao Silva · Dept. Comercial</span></div>
                        <span className="text-[13px] font-bold text-[var(--text-primary)]">€ 24,50</span>
                      </div>
                      <div className="flex gap-4 text-xs text-[var(--text-muted)]">
                        <span className="flex items-center gap-1"><MapPin size={13} /> Aeroporto → Escritorio</span>
                        <span className="flex items-center gap-1"><Clock size={13} /> 14:32</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">Detalhes</Button>
                        <Button size="sm" className="flex-1">Tracking</Button>
                      </div>
                    </div>
                  </div>
                  {/* Contrato Card */}
                  <div className="bg-white rounded-xl elevation-1 overflow-hidden card-hover">
                    <div className="px-4 h-12 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #EEF2FF, #DBEAFE)' }}>
                      <div className="flex items-center gap-2">
                        <FileCheck size={16} className="text-[#4338CA]" />
                        <span className="text-[11px] font-bold text-[#4338CA] uppercase tracking-wider">Contrato</span>
                      </div>
                      <Badge variant="active">Ativo</Badge>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                      <div><span className="text-sm font-bold text-[var(--text-primary)]">CTR-2025-00142</span><br /><span className="text-xs text-[var(--text-muted)]">Acme Corporation · Mobilidade + Documentos</span></div>
                      <div className="flex gap-4 text-xs text-[var(--text-muted)]">
                        <span className="flex items-center gap-1"><Calendar size={13} /> 01/01/2025 → 31/12/2025</span>
                        <span className="flex items-center gap-1"><Layers size={13} /> v3</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">Ver Contrato</Button>
                        <Button variant="secondary" size="sm" className="flex-1">Versionar</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer 360 */}
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">Customer 360º — Preview</span>
                <div className="bg-white rounded-xl elevation-2 overflow-hidden">
                  <div className="py-5 px-6 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, var(--primary-dark), #1A3F6E)' }}>
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 bg-white/[0.12] rounded-[14px] flex items-center justify-center border border-white/10">
                        <Building2 size={24} className="text-white" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-white font-title">Acme Corporation</span><br />
                        <span className="text-xs text-white/50">NIF: 500 123 456 · Cliente desde jan/2023</span>
                      </div>
                    </div>
                    <Badge variant="active">Ativo</Badge>
                  </div>
                  <div className="py-5 px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-[var(--border)]">
                    {[
                      { value: '3', label: 'Contratos' },
                      { value: '5', label: 'Departamentos' },
                      { value: '124', label: 'Colaboradores' },
                      { value: '€ 18.4k', label: 'Consumo mensal' },
                    ].map((kpi) => (
                      <div key={kpi.label} className="text-center">
                        <div className="font-title text-[22px] font-bold text-[var(--primary)]">{kpi.value}</div>
                        <div className="text-[11px] text-[var(--text-muted)]">{kpi.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="py-4 px-6 flex gap-2 flex-wrap">
                    <Tag color="primary">Mobilidade Corporativa</Tag>
                    <Tag color="orange">Tramitacao Documental</Tag>
                    <Tag color="green">Aluguel de Veiculos</Tag>
                  </div>
                </div>
              </div>
            </section>

            {/* NAVEGACAO */}
            <section id="nav">
              <SectionTitle>Navegacao</SectionTitle>
              <div className="space-y-5">
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Sidebar Menu — clique na seta para expandir/recolher</span>
                  <Sidebar items={sidebarItems} />
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Tabs & Breadcrumbs</span>
                  <Breadcrumbs items={[
                    { label: 'CRM' },
                    { label: 'Clientes' },
                    { label: 'Acme Corporation', active: true },
                  ]} className="mb-5" />
                  <Tabs tabs={[
                    { label: 'Dados Gerais', active: true },
                    { label: 'Estrutura Org.' },
                    { label: 'Contratos' },
                    { label: 'Pessoas' },
                    { label: 'Historico' },
                  ]} />
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section id="timeline">
              <SectionTitle>Timeline & Audit Log</SectionTitle>
              <div className="bg-white rounded-xl elevation-1 p-6">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-5">Historico de Governanca — Cliente</span>
                <Timeline events={[
                  { title: 'Estado alterado para Ativo', description: 'Admin: Maria Oliveira · Justificativa: "Onboarding concluido, todos os documentos validados."', date: '19 mar 2026, 14:32', dotColor: 'var(--success)' },
                  { title: 'Contrato CTR-2025-00142 criado', description: 'Dominios: Mobilidade Corporativa, Tramitacao Documental', date: '18 mar 2026, 09:15', dotColor: 'var(--info)' },
                  { title: 'Estrutura organizacional configurada', description: '5 departamentos e 12 centros de custo criados', date: '17 mar 2026, 16:48', dotColor: 'var(--primary)' },
                  { title: 'Cliente criado — Em Configuracao', description: 'Admin: Pedro Santos', date: '15 mar 2026, 10:00', dotColor: 'var(--text-muted)' },
                ]} />
              </div>
            </section>

            {/* ALERTS */}
            <section id="alerts">
              <SectionTitle>Alertas & Toasts</SectionTitle>
              <div className="space-y-4">
                <Alert variant="success" title="Contrato ativado com sucesso">O contrato CTR-2025-00142 foi ativado e ja esta disponivel para consumo.</Alert>
                <Alert variant="warning" title="Aprovacao pendente">Existem 7 viagens aguardando aprovacao do gestor do Dept. Comercial.</Alert>
                <Alert variant="danger" title="SLA violado">A entrega DOC-2026-00891 ultrapassou o prazo em 2h15min.</Alert>
                <Alert variant="info" title="Nova versao do catalogo">A tabela de precos "Mobilidade PT - 2026" foi atualizada para a versao v4.</Alert>
              </div>
            </section>

            {/* MODAIS */}
            <section id="modais">
              <SectionTitle>Modais</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-6 bg-white rounded-xl elevation-1 flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">Confirmacao com justificativa</span>
                    <p className="text-[13px] text-[var(--text-muted)]">Usado para mudancas de estado, encerramento de contratos e acoes irreversiveis.</p>
                  </div>
                  <Button className="self-start" onClick={() => setJustifyModal(true)}>Abrir Modal</Button>
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1 flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">Exclusao / Encerramento</span>
                    <p className="text-[13px] text-[var(--text-muted)]">Modal destrutivo para acoes permanentes com aviso de impacto.</p>
                  </div>
                  <Button variant="danger" className="self-start" onClick={() => setDeleteModal(true)}>Abrir Modal</Button>
                </div>
              </div>
            </section>

            {/* ELEVACAO */}
            <section id="elevacao">
              <SectionTitle>Elevacao & Depth</SectionTitle>
              <div className="p-6 bg-white rounded-xl elevation-1">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-5">Niveis de Sombra</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="flex flex-col items-center gap-3">
                      <div className={`elevation-${n} w-20 h-20 bg-white rounded-xl flex items-center justify-center ${n === 1 ? 'border border-[var(--border)]' : ''}`}>
                        <span className="text-xs font-bold text-[var(--text-muted)]">{n}</span>
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)]">elevation-{n}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-white rounded-xl elevation-1 mt-5">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-5">Border Radius Scale</span>
                <div className="flex flex-wrap gap-6 items-end">
                  {[
                    { r: 'var(--radius-sm)', label: '8px' },
                    { r: 'var(--radius-md)', label: '12px' },
                    { r: 'var(--radius-lg)', label: '16px' },
                    { r: 'var(--radius-xl)', label: '20px' },
                    { r: 'var(--radius-2xl)', label: '24px' },
                    { r: 'var(--radius-3xl)', label: '32px' },
                    { r: 'var(--radius-pill)', label: 'pill' },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-[var(--primary-light)]" style={{ borderRadius: item.r }} />
                      <span className="text-[10px] text-[var(--text-muted)]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ICONOGRAFIA */}
            <section id="icones">
              <SectionTitle>Iconografia</SectionTitle>              <div className="p-6 bg-white rounded-xl elevation-1">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Lucide Icons — Utilizados na plataforma</span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                  {[
                    { icon: <Car size={20} />, name: 'car' },
                    { icon: <FileText size={20} />, name: 'file-text' },
                    { icon: <Truck size={20} />, name: 'truck' },
                    { icon: <Building2 size={20} />, name: 'building-2' },
                    { icon: <Users size={20} />, name: 'users' },
                    { icon: <Shield size={20} />, name: 'shield' },
                    { icon: <Receipt size={20} />, name: 'receipt' },
                    { icon: <MapPin size={20} />, name: 'map-pin' },
                    { icon: <Calendar size={20} />, name: 'calendar' },
                    { icon: <CheckCircle size={20} />, name: 'check-circle' },
                    { icon: <BarChart3 size={20} />, name: 'bar-chart' },
                    { icon: <ScrollText size={20} />, name: 'audit' },
                    { icon: <Clock size={20} />, name: 'clock' },
                    { icon: <Settings size={20} />, name: 'settings' },
                    { icon: <Navigation size={20} />, name: 'navigation' },
                    { icon: <Key size={20} />, name: 'key' },
                  ].map((item) => (
                    <div key={item.name} className="flex flex-col items-center gap-2">
                      <div className="w-11 h-11 bg-[var(--primary-lighter)] rounded-xl flex items-center justify-center text-[var(--primary)]">
                        {item.icon}
                      </div>
                      <span className="text-[9px] text-[var(--text-muted)]">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            {/* ESTADOS & LOADING */}
            <section id="estados">
              <SectionTitle>Estados & Loading</SectionTitle>
              <div className="space-y-5">

                {/* Toasts */}
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Toast Notifications</span>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="success" onClick={() => addToast({ variant: 'success', title: 'Sucesso!', message: 'Operação concluída com êxito.' })}>Toast Sucesso</Button>
                    <Button size="sm" variant="secondary" onClick={() => addToast({ variant: 'warning', title: 'Atenção', message: 'Verifique os dados antes de continuar.' })}>Toast Aviso</Button>
                    <Button size="sm" variant="danger" onClick={() => addToast({ variant: 'danger', title: 'Erro', message: 'Não foi possível completar a ação.' })}>Toast Erro</Button>
                    <Button size="sm" variant="outline" onClick={() => addToast({ variant: 'info', title: 'Informação', message: 'Nova versão disponível.' })}>Toast Info</Button>
                    <Button size="sm" variant="ghost" onClick={() => setSnackbar(true)}>Snackbar</Button>
                    <Button size="sm" variant="outline" onClick={() => setOffline((v) => !v)}>{offline ? 'Simular Online' : 'Simular Offline'}</Button>
                  </div>
                </div>

                {/* Error Pages */}
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Error Pages</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {([403, 404, 500] as const).map((code) => (
                      <div key={code} className="border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
                        <ErrorPage code={code} onBack={() => {}} onHome={() => {}} onRetry={code === 500 ? () => {} : undefined} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skeletons */}
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Skeleton / Shimmer Loading</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                    <KpiCardSkeleton />
                    <KpiCardSkeleton />
                    <KpiCardSkeleton />
                    <KpiCardSkeleton />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] font-semibold block mb-2">List Skeleton</span>
                      <ListItemSkeleton rows={3} />
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] font-semibold block mb-2">Card Skeleton (mobile)</span>
                      <CardSkeleton />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold block mb-2">Table Skeleton</span>
                    <div className="border border-[var(--border)] rounded-[var(--radius-md)] overflow-hidden">
                      <table className="w-full text-[13px]">
                        <tbody><TableRowSkeleton cols={5} rows={3} /></tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Empty States */}
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Empty States</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-[var(--border)] rounded-[var(--radius-lg)]">
                      <EmptyState context="search" />
                    </div>
                    <div className="border border-[var(--border)] rounded-[var(--radius-lg)]">
                      <EmptyState context="clients" action={{ label: 'Novo Cliente', onClick: () => {} }} />
                    </div>
                    <div className="border border-[var(--border)] rounded-[var(--radius-lg)]">
                      <EmptyState context="contracts" action={{ label: 'Criar Contrato', onClick: () => {} }} />
                    </div>
                    <div className="border border-[var(--border)] rounded-[var(--radius-lg)]">
                      <EmptyState context="reports" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* NOTIFICAÇÕES */}
            <section id="notificacoes">
              <SectionTitle>Sistema de Notificações</SectionTitle>
              <div className="space-y-5">
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Notification Bell + Panel</span>
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-[var(--text-muted)]">Bell com badge:</span>
                      <NotificationBell notifications={notifications} onMarkRead={markRead} onMarkAllRead={markAllRead} onDismiss={dismissNotif} />
                    </div>
                    <Button size="sm" variant="secondary" onClick={() => addNotif({ variant: 'success', title: 'Nova notificação', message: 'Teste de push notification.', time: 'Agora' })}>
                      + Adicionar notificação
                    </Button>
                  </div>
                  <div className="mt-5">
                    <NotificationPanel notifications={notifications} onMarkRead={markRead} onMarkAllRead={markAllRead} onDismiss={dismissNotif} />
                  </div>
                </div>
              </div>
            </section>

            {/* MOBILE NAV */}
            <section id="mobile">
              <SectionTitle>Mobile Navigation</SectionTitle>
              <div className="space-y-5">
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Bottom Tabs (mobile)</span>
                  <div className="relative border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden" style={{ height: 120 }}>
                    <BottomTabs
                      items={[
                        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Início' },
                        { id: 'viagens', icon: <Car size={20} />, label: 'Viagens', badge: 3 },
                        { id: 'docs', icon: <FileText size={20} />, label: 'Docs' },
                        { id: 'notifs', icon: <Bell size={20} />, label: 'Alertas', badge: 7 },
                        { id: 'perfil', icon: <User size={20} />, label: 'Perfil' },
                      ]}
                      activeId={activeTab}
                      onChange={setActiveTab}
                      className="!fixed-none !relative !bottom-auto"
                    />
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Drawer (mobile)</span>
                  <Button onClick={() => setDrawerOpen(true)}>Abrir Drawer</Button>
                  <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Menu">
                    <div className="p-4 flex flex-col gap-1">
                      {sidebarItems.map((item, i) => (
                        <button key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-[var(--radius-md)] text-[13px] font-medium text-[var(--text-secondary)] hover:bg-[var(--primary-lighter)] hover:text-[var(--primary)] bg-transparent border-none cursor-pointer text-left transition-colors">
                          {item.icon} {item.label}
                        </button>
                      ))}
                    </div>
                  </Drawer>
                </div>
              </div>
            </section>

            {/* FORMS AVANÇADOS */}
            <section id="forms-avancados">
              <SectionTitle>Formulários Avançados</SectionTitle>
              <div className="space-y-5">
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Inputs Especiais</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <PasswordInput label="Senha" placeholder="••••••••" />
                    <DatePicker label="Data de Início" />
                    <MaskedInput label="Telefone" mask="phone" placeholder="(11) 99999-9999" />
                    <MaskedInput label="CNPJ" mask="cnpj" placeholder="00.000.000/0001-00" />
                    <MaskedInput label="CPF" mask="cpf" placeholder="000.000.000-00" />
                    <MaskedInput label="Valor" mask="currency" placeholder="R$ 0,00" />
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Checkbox & Radio</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <Checkbox label="Aceito os termos de uso" checked={checkVal} onChange={setCheckVal} />
                      <Checkbox label="Receber notificações por e-mail" checked={true} onChange={() => {}} />
                      <Checkbox label="Opção desabilitada" checked={false} onChange={() => {}} disabled />
                    </div>
                    <RadioGroup
                      label="Tipo de Contrato"
                      value={radioVal}
                      onChange={setRadioVal}
                      options={[
                        { value: 'b2b', label: 'B2B — Empresa', description: 'Contrato corporativo com NIF/CNPJ' },
                        { value: 'b2c', label: 'B2C — Pessoa Física', description: 'Contrato individual com CPF' },
                        { value: 'holding', label: 'Holding', description: 'Grupo empresarial com múltiplas entidades' },
                      ]}
                    />
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">File Upload</span>
                  <FileUpload label="Documentos do Contrato" accept=".pdf, .docx, .png" multiple />
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Rating & Avaliação</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <span className="text-[13px] font-semibold text-[var(--text-primary)]">Avaliação simples</span>
                      <StarRating value={4} size={28} />
                      <StarRating value={2} size={20} readOnly />
                    </div>
                    <div>
                      <span className="text-[13px] font-semibold text-[var(--text-primary)] block mb-3">Com comentário</span>
                      <RatingWithComment onSubmit={(r, c) => addToast({ variant: 'success', title: `Avaliação ${r}★ enviada`, message: c || undefined })} />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Modal de Confirmação / Ação Destrutiva</span>
                  <div className="flex gap-3 flex-wrap">
                    <Button variant="secondary" onClick={() => setConfirmModal(true)}>Modal com Justificativa</Button>
                  </div>
                  <ConfirmModal
                    open={confirmModal}
                    onClose={() => setConfirmModal(false)}
                    onConfirm={(j) => { setConfirmModal(false); addToast({ variant: 'success', title: 'Ação confirmada', message: j }) }}
                    title="Suspender Cliente"
                    description="Esta ação bloqueará novos contratos e consumo de serviços."
                    confirmLabel="Confirmar Suspensão"
                    requireJustification
                    destructive={false}
                  />
                </div>
              </div>
            </section>

            {/* TREE VIEW */}
            <section id="tree">
              <SectionTitle>Tree View & State Badge</SectionTitle>
              <div className="space-y-5">
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Hierarquia Organizacional</span>
                  <TreeView
                    selectedId={selectedTree}
                    onSelect={(n) => setSelectedTree(n.id)}
                    nodes={[
                      {
                        id: '1', label: 'Acme Corporation', icon: <Building2 size={14} className="text-[var(--primary)]" />, badge: 3,
                        actions: [
                          { icon: <Plus size={12} />, label: 'Adicionar', onClick: () => {} },
                          { icon: <Pencil size={12} />, label: 'Editar', onClick: () => {} },
                        ],
                        children: [
                          {
                            id: '1-1', label: 'Departamento Comercial', icon: <FolderOpen size={14} className="text-[#F59E0B]" />, badge: 12,
                            children: [
                              { id: '1-1-1', label: 'Equipa Lisboa', icon: <Users size={13} className="text-[var(--text-muted)]" /> },
                              { id: '1-1-2', label: 'Equipa Porto', icon: <Users size={13} className="text-[var(--text-muted)]" /> },
                            ],
                          },
                          {
                            id: '1-2', label: 'Departamento Financeiro', icon: <FolderClosed size={14} className="text-[#6366F1]" />, badge: 8,
                            children: [
                              { id: '1-2-1', label: 'Contabilidade', icon: <Users size={13} className="text-[var(--text-muted)]" /> },
                            ],
                          },
                          { id: '1-3', label: 'TI & Sistemas', icon: <FolderClosed size={14} className="text-[#10B981]" /> },
                        ],
                      },
                      {
                        id: '2', label: 'Grupo Horizonte', icon: <Building2 size={14} className="text-[#059669]" />, badge: 7,
                        children: [
                          { id: '2-1', label: 'Brasil', icon: <FolderOpen size={14} className="text-[#F59E0B]" /> },
                          { id: '2-2', label: 'Portugal', icon: <FolderOpen size={14} className="text-[#F59E0B]" /> },
                        ],
                      },
                    ]}
                  />
                </div>
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">State Badge — Chips Semânticos</span>
                  <div className="flex flex-wrap gap-2">
                    <StateBadge color="green">Ativo</StateBadge>
                    <StateBadge color="yellow">Pendente</StateBadge>
                    <StateBadge color="red">Bloqueado</StateBadge>
                    <StateBadge color="blue">Em Revisão</StateBadge>
                    <StateBadge color="indigo">Em Configuração</StateBadge>
                    <StateBadge color="orange">Suspenso</StateBadge>
                    <StateBadge color="pink">Convidado</StateBadge>
                    <StateBadge color="gray">Inativo</StateBadge>
                    <StateBadge color="green" size="sm">sm</StateBadge>
                    <StateBadge color="red" dot={false}>Sem dot</StateBadge>
                  </div>
                </div>
              </div>
            </section>

            {/* MAPA & TRACKING */}
            <section id="mapa">
              <SectionTitle>Mapa Interativo & Tracking</SectionTitle>
              <div className="space-y-5">
                <div className="p-6 bg-white rounded-xl elevation-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Mapa com Pins, Clusters e Controles</span>
                  <MapView
                    height="400px"
                    showLegend
                    pins={[
                      { id: 'v1', lat: 38.7, lng: -9.1, label: 'Veículo #001', type: 'vehicle', status: 'active' },
                      { id: 'v2', lat: 41.1, lng: -8.6, label: 'Veículo #002', type: 'vehicle', status: 'idle' },
                      { id: 'd1', lat: 38.5, lng: -9.3, label: 'Destino', type: 'destination' },
                      { id: 'o1', lat: 39.0, lng: -8.8, label: 'Origem', type: 'origin' },
                      { id: 'a1', lat: 40.2, lng: -8.4, label: 'Alerta', type: 'alert' },
                    ]}
                    clusters={[
                      { id: 'c1', count: 12, x: 60, y: 40 },
                      { id: 'c2', count: 5, x: 80, y: 70 },
                    ]}
                  />
                </div>
              </div>
            </section>

            {/* POD CAPTURE */}
            <section id="pod">
              <SectionTitle>POD Capture</SectionTitle>
              <div className="p-6 bg-white rounded-xl elevation-1">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-4">Prova de Entrega — Foto + Assinatura + Observações</span>
                <div className="max-w-[480px]">
                  <PODCapture onSubmit={(data) => addToast({ variant: 'success', title: 'POD registado', message: `Foto: ${data.photo ? 'sim' : 'não'} · Assinatura: ${data.signature ? 'sim' : 'não'}` })} />
                </div>
              </div>
            </section>

          </main>
        </div>

        {/* FOOTER */}
        <footer className="mt-24 pt-8 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2.5 opacity-40">
            <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <XLinkLogo size={14} color="white" />
            </div>
            <span className="text-[13px] font-semibold text-[var(--text-muted)] font-title">xLink</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">© 2026 xLink — Design System v1.0</p>
        </footer>
      </div>

      {/* GLOBAL: Toasts, Snackbar, Offline */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <Snackbar open={snackbar} message="Alterações guardadas com sucesso." action={{ label: 'Desfazer', onClick: () => setSnackbar(false) }} onClose={() => setSnackbar(false)} />
      <OfflineBanner offline={offline} retryCount={3} onRetry={() => setOffline(false)} />

      {/* MODALS */}
      <Modal open={justifyModal} onClose={() => setJustifyModal(false)}>        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[var(--warning-bg)] rounded-xl flex items-center justify-center">
              <AlertTriangle size={22} className="text-[var(--warning)]" />
            </div>
            <div>
              <h3 className="font-title text-[17px] font-bold text-[var(--text-primary)]">Suspender Cliente</h3>
              <p className="text-xs text-[var(--text-muted)]">Esta acao bloqueia novos contratos e consumo de servicos.</p>
            </div>
          </div>
          <Textarea label="Justificativa obrigatoria" rows={3} placeholder="Descreva o motivo da suspensao..." />
          <div className="flex gap-2.5">
            <Button variant="outline" className="flex-1" onClick={() => setJustifyModal(false)}>Cancelar</Button>
            <button className="flex-1 py-2.5 px-5 rounded-[var(--radius-md)] font-semibold text-sm text-white cursor-pointer border-none" style={{ background: 'var(--warning)' }}>Confirmar Suspensao</button>
          </div>
        </div>
      </Modal>

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
        <div className="flex flex-col items-center text-center gap-5">
          <div className="w-14 h-14 bg-[var(--danger-bg)] rounded-xl flex items-center justify-center">
            <AlertTriangle size={26} className="text-[var(--danger)]" />
          </div>
          <div>
            <h3 className="font-title text-[17px] font-bold text-[var(--text-primary)]">Encerrar Contrato?</h3>
            <p className="text-[13px] text-[var(--text-muted)] mt-2 leading-relaxed">
              O contrato <strong>CTR-2025-00142</strong> sera <strong>permanentemente encerrado</strong>. Esta acao e irreversivel.
            </p>
          </div>
          <div className="w-full py-3.5 px-4 rounded-[var(--radius-md)] bg-[var(--danger-bg)] border border-[#FECACA] text-left">
            <p className="text-[11px] font-bold text-[#DC2626] mb-1.5 flex items-center gap-1"><AlertTriangle size={12} /> Impacto:</p>
            <ul className="text-[11px] text-[var(--danger)] pl-4 list-disc flex flex-col gap-[3px]">
              <li>Consumo de servicos sera bloqueado</li>
              <li>Associacoes a dominios serao encerradas</li>
              <li>Faturacao pendente sera consolidada</li>
            </ul>
          </div>
          <div className="w-full text-left">
            <Textarea label="Justificativa do encerramento" rows={2} placeholder="Motivo obrigatorio..." />
          </div>
          <div className="flex gap-2.5 w-full">
            <Button variant="outline" className="flex-1" onClick={() => setDeleteModal(false)}>Cancelar</Button>
            <Button variant="danger" className="flex-1">Encerrar Contrato</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default App
