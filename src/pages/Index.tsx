import { useState } from "react";
import Icon from "@/components/ui/icon";

// ==================== ДАННЫЕ МЕНЮ ====================
const menuCategories = ["Шашлык", "Горячее", "Закуски", "Напитки"];

const menuItems = [
  { id: 1, category: "Шашлык", name: "Шашлык из баранины", desc: "Нежная баранина на углях, маринованная в специях и луке", price: 580, weight: "300г", image: "🥩", hot: true },
  { id: 2, category: "Шашлык", name: "Шашлык из свинины", desc: "Отборная свиная шейка, пропитанная горными травами", price: 450, weight: "300г", image: "🍖", hot: false },
  { id: 3, category: "Шашлык", name: "Шашлык из курицы", desc: "Куриное бедро в кефирном маринаде с паприкой", price: 380, weight: "350г", image: "🍗", hot: false },
  { id: 4, category: "Шашлык", name: "Люля-кебаб говяжий", desc: "Рубленая говядина с зеленью на широком шампуре", price: 520, weight: "300г", image: "🥩", hot: true },
  { id: 5, category: "Шашлык", name: "Шашлык из осетрины", desc: "Деликатесная рыба на виноградных листьях", price: 890, weight: "250г", image: "🐟", hot: false },
  { id: 6, category: "Горячее", name: "Чанахи", desc: "Томлёная баранина с овощами в глиняном горшочке", price: 490, weight: "400г", image: "🍲", hot: true },
  { id: 7, category: "Горячее", name: "Хашлама", desc: "Говядина варёная с овощами в собственном соку", price: 460, weight: "400г", image: "🥘", hot: false },
  { id: 8, category: "Горячее", name: "Оджахури", desc: "Жареная свинина с картофелем и томатами", price: 420, weight: "380г", image: "🍳", hot: false },
  { id: 9, category: "Закуски", name: "Пхали ассорти", desc: "Три вида пхали: из шпината, свёклы и зелёной фасоли", price: 320, weight: "250г", image: "🥗", hot: false },
  { id: 10, category: "Закуски", name: "Аджапсандали", desc: "Рагу из баклажанов, томатов и перца с кинзой", price: 280, weight: "300г", image: "🫑", hot: false },
  { id: 11, category: "Закуски", name: "Лаваш с сырами", desc: "Тонкий лаваш с сулугуни и зеленью", price: 240, weight: "200г", image: "🫓", hot: false },
  { id: 12, category: "Напитки", name: "Тархун", desc: "Освежающий напиток из эстрагона", price: 120, weight: "400мл", image: "🥤", hot: false },
  { id: 13, category: "Напитки", name: "Домашний лимонад", desc: "Грузинский лимонад из натуральных фруктов", price: 150, weight: "500мл", image: "🍋", hot: false },
  { id: 14, category: "Напитки", name: "Бозбаш", desc: "Насыщенный мясной бульон с нутом", price: 180, weight: "300мл", image: "☕", hot: true },
];

// ==================== КОМПОНЕНТ ОРНАМЕНТА ====================
const CaucasusOrnament = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="flex-1 gold-divider" />
    <span className="text-[hsl(var(--gold))] text-sm opacity-70">✦ ✦ ✦</span>
    <div className="flex-1 gold-divider" />
  </div>
);

// ==================== КОМПОНЕНТ ОТСЛЕЖИВАНИЯ ====================
const OrderTracker = ({ orderId, onClose }: { orderId: string; onClose: () => void }) => {
  const steps = [
    { id: 1, label: "Принят", icon: "CheckCircle", done: true },
    { id: 2, label: "Готовится", icon: "Flame", done: true },
    { id: 3, label: "В пути", icon: "Bike", done: false },
    { id: 4, label: "Доставлен", icon: "Home", done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-8 max-w-md w-full mx-4 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[hsl(var(--gold))]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Заказ #{orderId}
          </h3>
          <button onClick={onClose} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--cream))] transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        <CaucasusOrnament className="mb-6" />

        <div className="relative">
          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-[hsl(var(--border))]" />
          <div className="absolute left-5 top-5 w-0.5 bg-gradient-to-b from-[hsl(var(--gold))] to-[hsl(var(--copper))]" style={{ height: '40%' }} />

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={step.id} className={`flex items-center gap-4 ${step.done ? 'opacity-100' : 'opacity-40'}`}
                style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 relative
                  ${step.done
                    ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold)/0.15)] text-[hsl(var(--gold))]'
                    : 'border-[hsl(var(--border))] bg-[hsl(var(--dark))] text-[hsl(var(--muted-foreground))]'}`}>
                  <Icon name={step.icon} size={16} fallback="Circle" />
                </div>
                <div>
                  <div className={`font-medium ${step.done ? 'text-[hsl(var(--cream))]' : 'text-[hsl(var(--muted-foreground))]'}`}
                    style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '1px' }}>
                    {step.label}
                  </div>
                  {step.id === 2 && step.done && (
                    <div className="text-xs text-[hsl(var(--gold))] animate-ember">
                      Сейчас готовится на углях...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <CaucasusOrnament className="mt-6" />
        <p className="text-center text-sm text-[hsl(var(--muted-foreground))] mt-4">
          Ожидаемое время доставки: <span className="text-[hsl(var(--gold))]">~45 минут</span>
        </p>
      </div>
    </div>
  );
};

// ==================== ГЛАВНЫЙ КОМПОНЕНТ ====================
export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeCategory, setActiveCategory] = useState("Шашлык");
  const [cart, setCart] = useState<{ item: typeof menuItems[0]; qty: number }[]>([]);
  const [showTracker, setShowTracker] = useState(false);
  const [orderId] = useState(() => Math.floor(Math.random() * 9000 + 1000).toString());
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");
  const [paymentForm, setPaymentForm] = useState({ name: "", card: "", expiry: "", cvv: "", phone: "", address: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const addToCart = (item: typeof menuItems[0]) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(c => c.item.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(c => c.item.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c)
      .filter(c => c.qty > 0));
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);
  const filteredMenu = menuItems.filter(i => i.category === activeCategory);

  const handleOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => setShowTracker(true), 500);
  };

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "menu", label: "Меню" },
    { id: "cart", label: "Корзина" },
    { id: "payment", label: "Оплата" },
    { id: "delivery", label: "Доставка" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--dark))] caucasus-pattern">
      {showTracker && <OrderTracker orderId={orderId} onClose={() => setShowTracker(false)} />}

      {/* НАВИГАЦИЯ */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[hsl(var(--dark)/0.95)] backdrop-blur-md border-b border-[hsl(var(--border))]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection("home")}>
            <span className="text-2xl">🔥</span>
            <div>
              <div className="text-[hsl(var(--gold))] font-bold leading-none" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}>
                Шашлычный дворик
              </div>
              <div className="text-[hsl(var(--muted-foreground))] text-[10px] tracking-widest uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Кавказская кухня
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(n => (
              <span key={n.id} className={`nav-link ${activeSection === n.id ? 'active' : ''}`}
                onClick={() => setActiveSection(n.id)}>
                {n.label}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setActiveSection("cart")}
              className="relative flex items-center gap-2 px-4 py-2 btn-gold rounded text-sm">
              <Icon name="ShoppingCart" size={16} />
              {cartCount > 0 && <span className="font-bold">{cartCount}</span>}
            </button>
            <button className="md:hidden text-[hsl(var(--cream))]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[hsl(var(--card))] border-t border-[hsl(var(--border))] py-4 animate-fade-in">
            {navItems.map(n => (
              <button key={n.id} className="block w-full text-left px-6 py-3 nav-link"
                onClick={() => { setActiveSection(n.id); setMobileMenuOpen(false); }}>
                {n.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="pt-16">

        {/* ==================== ГЛАВНАЯ ==================== */}
        {activeSection === "home" && (
          <div>
            <div className="relative min-h-[92vh] flex items-center overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="https://cdn.poehali.dev/projects/73691a5a-9de8-4e9e-9683-413214383d02/files/65cfba2a-4bba-475f-b210-63197444169f.jpg"
                  alt="Шашлык"
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--dark))] via-[hsl(var(--dark)/0.7)] to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--dark))] via-transparent to-transparent" />
              </div>

              <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
                <div className="max-w-2xl">
                  <div className="opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-px bg-[hsl(var(--gold))]" />
                      <span className="text-[hsl(var(--gold))] text-xs tracking-widest uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
                        Доставка по городу
                      </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-[hsl(var(--cream))] leading-tight mb-4"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      Вкус<br />
                      <span className="text-[hsl(var(--gold))]">Кавказа</span><br />
                      на вашем столе
                    </h1>
                  </div>

                  <div className="opacity-0 animate-fade-in delay-200" style={{ animationFillMode: 'forwards' }}>
                    <CaucasusOrnament className="my-6 max-w-sm" />
                    <p className="text-[hsl(var(--cream)/0.7)] text-lg mb-8 leading-relaxed">
                      Настоящий шашлык на углях, горные специи, рецепты передаваемые из поколения в поколение.
                      Доставим горячим за 45 минут.
                    </p>
                  </div>

                  <div className="opacity-0 animate-fade-in delay-400 flex flex-wrap gap-4" style={{ animationFillMode: 'forwards' }}>
                    <button onClick={() => setActiveSection("menu")}
                      className="btn-gold px-8 py-4 rounded text-base font-medium">
                      Заказать сейчас
                    </button>
                    <button onClick={() => setShowTracker(true)}
                      className="px-8 py-4 border border-[hsl(var(--gold)/0.4)] text-[hsl(var(--gold))] rounded hover:border-[hsl(var(--gold))] transition-colors text-sm"
                      style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      Отследить заказ
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute right-8 top-1/3 hidden lg:flex flex-col gap-4 opacity-0 animate-slide-in-right delay-500"
                style={{ animationFillMode: 'forwards' }}>
                {[
                  { icon: "Flame", text: "На углях", sub: "живой огонь" },
                  { icon: "Clock", text: "45 минут", sub: "доставка" },
                  { icon: "Star", text: "4.9 / 5", sub: "рейтинг" },
                ].map((b, i) => (
                  <div key={i} className="bg-[hsl(var(--card)/0.9)] border border-[hsl(var(--border))] rounded-lg px-5 py-3 flex items-center gap-3 backdrop-blur-sm">
                    <div className="w-8 h-8 bg-[hsl(var(--gold)/0.15)] rounded-full flex items-center justify-center text-[hsl(var(--gold))]">
                      <Icon name={b.icon} size={15} fallback="Circle" />
                    </div>
                    <div>
                      <div className="text-[hsl(var(--cream))] text-sm font-medium" style={{ fontFamily: 'Oswald, sans-serif' }}>{b.text}</div>
                      <div className="text-[hsl(var(--muted-foreground))] text-xs">{b.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Хиты */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl text-[hsl(var(--cream))] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Хиты дворика
                </h2>
                <CaucasusOrnament />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {menuItems.filter(i => i.hot).slice(0, 3).map((item, idx) => (
                  <div key={item.id} className="dish-card rounded-lg overflow-hidden opacity-0 animate-fade-in"
                    style={{ animationDelay: `${idx * 0.15}s`, animationFillMode: 'forwards' }}>
                    <div className="h-48 bg-gradient-to-br from-[hsl(var(--dark))] to-[hsl(var(--secondary))] flex items-center justify-center text-6xl relative">
                      {item.image}
                      <div className="absolute top-3 right-3 bg-[hsl(var(--accent))] text-white text-xs px-2 py-1 rounded"
                        style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.5px' }}>
                        ХИТ
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl text-[hsl(var(--cream))] mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{item.name}</h3>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">{item.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[hsl(var(--gold))] font-bold text-lg">{item.price} ₽</span>
                        <button onClick={() => addToCart(item)} className="btn-gold px-4 py-2 rounded text-xs">
                          В корзину
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Преимущества */}
            <div className="bg-[hsl(var(--card))] border-y border-[hsl(var(--border))]">
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { icon: "🔥", title: "Живой огонь", sub: "Только угли, никаких газовых грилей" },
                    { icon: "🏔️", title: "Горные специи", sub: "Привезённые с Кавказа" },
                    { icon: "⚡", title: "Быстро", sub: "Доставка за 45 минут" },
                    { icon: "💳", title: "Онлайн оплата", sub: "Банковская карта или наличные" },
                  ].map((f, i) => (
                    <div key={i} className="opacity-0 animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}>
                      <div className="text-4xl mb-3">{f.icon}</div>
                      <div className="text-[hsl(var(--gold))] font-semibold mb-1" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '1px' }}>{f.title}</div>
                      <div className="text-[hsl(var(--muted-foreground))] text-sm">{f.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== МЕНЮ ==================== */}
        {activeSection === "menu" && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl text-[hsl(var(--cream))] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Наше меню
              </h2>
              <CaucasusOrnament />
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {menuCategories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded border text-sm transition-all ${
                    activeCategory === cat
                      ? 'btn-gold border-transparent'
                      : 'border-[hsl(var(--border))] text-[hsl(var(--cream)/0.7)] hover:border-[hsl(var(--gold)/0.5)] hover:text-[hsl(var(--cream))]'
                  }`}
                  style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenu.map((item, idx) => {
                const inCart = cart.find(c => c.item.id === item.id);
                return (
                  <div key={item.id} className="dish-card rounded-lg overflow-hidden opacity-0 animate-fade-in"
                    style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'forwards' }}>
                    <div className="h-44 bg-gradient-to-br from-[hsl(var(--dark))] to-[hsl(var(--secondary))] flex items-center justify-center text-5xl relative">
                      {item.image}
                      {item.hot && (
                        <div className="absolute top-3 right-3 bg-[hsl(var(--accent))] text-white text-xs px-2 py-1 rounded"
                          style={{ fontFamily: 'Oswald, sans-serif' }}>
                          🔥 ХИТ
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-xl text-[hsl(var(--cream))]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{item.name}</h3>
                        <span className="text-xs text-[hsl(var(--muted-foreground))] ml-2 mt-1 shrink-0">{item.weight}</span>
                      </div>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">{item.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[hsl(var(--gold))] font-bold text-xl">{item.price} ₽</span>
                        {inCart ? (
                          <div className="flex items-center gap-3">
                            <button onClick={() => updateQty(item.id, -1)}
                              className="w-7 h-7 border border-[hsl(var(--border))] rounded text-[hsl(var(--cream))] hover:border-[hsl(var(--gold))] flex items-center justify-center">
                              <Icon name="Minus" size={12} />
                            </button>
                            <span className="text-[hsl(var(--cream))] font-medium w-4 text-center">{inCart.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)}
                              className="w-7 h-7 btn-gold rounded flex items-center justify-center">
                              <Icon name="Plus" size={12} />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => addToCart(item)} className="btn-gold px-4 py-2 rounded text-xs">
                            В корзину
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== КОРЗИНА ==================== */}
        {activeSection === "cart" && (
          <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl text-[hsl(var(--cream))] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Ваш заказ
              </h2>
              <CaucasusOrnament />
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">🛒</div>
                <p className="text-[hsl(var(--muted-foreground))] text-lg mb-6">Корзина пуста</p>
                <button onClick={() => setActiveSection("menu")} className="btn-gold px-8 py-3 rounded">
                  Перейти к меню
                </button>
              </div>
            ) : (
              <div>
                <div className="space-y-3 mb-6">
                  {cart.map((c, idx) => (
                    <div key={c.item.id} className="dish-card rounded-lg p-4 flex items-center gap-4 opacity-0 animate-fade-in"
                      style={{ animationDelay: `${idx * 0.08}s`, animationFillMode: 'forwards' }}>
                      <div className="text-3xl">{c.item.image}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[hsl(var(--cream))] font-medium truncate" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '17px' }}>
                          {c.item.name}
                        </div>
                        <div className="text-[hsl(var(--gold))] text-sm">{c.item.price} ₽ × {c.qty}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(c.item.id, -1)}
                          className="w-7 h-7 border border-[hsl(var(--border))] rounded text-[hsl(var(--cream))] hover:border-[hsl(var(--gold))] flex items-center justify-center">
                          <Icon name="Minus" size={12} />
                        </button>
                        <span className="text-[hsl(var(--cream))] w-5 text-center font-medium">{c.qty}</span>
                        <button onClick={() => updateQty(c.item.id, 1)}
                          className="w-7 h-7 btn-gold rounded flex items-center justify-center">
                          <Icon name="Plus" size={12} />
                        </button>
                      </div>
                      <div className="text-[hsl(var(--cream))] font-bold w-20 text-right">{c.item.price * c.qty} ₽</div>
                      <button onClick={() => removeFromCart(c.item.id)}
                        className="text-[hsl(var(--muted-foreground))] hover:text-red-400 transition-colors">
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <CaucasusOrnament className="my-6" />

                <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[hsl(var(--muted-foreground))]">Итого:</span>
                    <span className="text-2xl font-bold text-[hsl(var(--gold))]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{cartTotal} ₽</span>
                  </div>
                  <div className="flex justify-between items-center mb-6 text-sm">
                    <span className="text-[hsl(var(--muted-foreground))]">Доставка:</span>
                    <span className="text-[hsl(var(--cream))]">{cartTotal >= 1000 ? 'Бесплатно' : '150 ₽'}</span>
                  </div>
                  {cartTotal < 1000 && (
                    <div className="text-xs text-[hsl(var(--gold)/0.7)] text-center mb-4 bg-[hsl(var(--gold)/0.08)] border border-[hsl(var(--gold)/0.2)] rounded px-4 py-2">
                      Добавьте ещё {1000 - cartTotal} ₽ для бесплатной доставки
                    </div>
                  )}
                  <button onClick={() => setActiveSection("payment")} className="btn-gold w-full py-4 rounded text-base">
                    Оформить заказ
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== ОПЛАТА ==================== */}
        {activeSection === "payment" && (
          <div className="max-w-2xl mx-auto px-4 md:px-8 py-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl text-[hsl(var(--cream))] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Оформление заказа
              </h2>
              <CaucasusOrnament />
            </div>

            {orderPlaced ? (
              <div className="text-center py-12 animate-scale-in">
                <div className="w-20 h-20 bg-[hsl(var(--gold)/0.15)] border border-[hsl(var(--gold)/0.4)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="CheckCircle" size={36} />
                </div>
                <h3 className="text-3xl text-[hsl(var(--gold))] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Заказ принят!
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-2">Номер заказа: <span className="text-[hsl(var(--cream))]">#{orderId}</span></p>
                <p className="text-[hsl(var(--muted-foreground))] mb-8">Ожидайте, наш повар уже разжигает угли 🔥</p>
                <button onClick={() => setShowTracker(true)} className="btn-gold px-8 py-3 rounded">
                  Отследить заказ
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-6">
                  <h3 className="text-xl text-[hsl(var(--gold))] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Данные доставки
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: "name", label: "Ваше имя", placeholder: "Иван Иванов", type: "text" },
                      { key: "phone", label: "Телефон", placeholder: "+7 (999) 123-45-67", type: "tel" },
                      { key: "address", label: "Адрес доставки", placeholder: "ул. Пушкина, д. 1, кв. 10", type: "text" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-2 block" style={{ fontFamily: 'Oswald, sans-serif' }}>
                          {f.label}
                        </label>
                        <input type={f.type} placeholder={f.placeholder}
                          value={paymentForm[f.key as keyof typeof paymentForm]}
                          onChange={e => setPaymentForm(p => ({ ...p, [f.key]: e.target.value }))}
                          className="w-full bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded px-4 py-3 text-[hsl(var(--cream))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--gold))] transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Способ оплаты */}
                <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-6">
                  <h3 className="text-xl text-[hsl(var(--gold))] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Способ оплаты
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "card" as const, icon: "CreditCard", label: "Картой онлайн", sub: "Visa, MC, МИР" },
                      { id: "cash" as const, icon: "Banknote", label: "Наличными", sub: "При получении" },
                    ].map(m => (
                      <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          paymentMethod === m.id
                            ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold)/0.08)]'
                            : 'border-[hsl(var(--border))] hover:border-[hsl(var(--gold)/0.4)]'
                        }`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          paymentMethod === m.id ? 'bg-[hsl(var(--gold)/0.2)] text-[hsl(var(--gold))]' : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'
                        }`}>
                          <Icon name={m.icon} size={18} fallback="Circle" />
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-medium ${paymentMethod === m.id ? 'text-[hsl(var(--gold))]' : 'text-[hsl(var(--cream))]'}`}
                            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.5px' }}>
                            {m.label}
                          </div>
                          <div className="text-xs text-[hsl(var(--muted-foreground))]">{m.sub}</div>
                        </div>
                        {paymentMethod === m.id && (
                          <div className="w-4 h-4 rounded-full bg-[hsl(var(--gold))] flex items-center justify-center">
                            <Icon name="Check" size={10} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Поля карты — только при оплате картой */}
                {paymentMethod === "card" && (
                  <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-6 animate-fade-in">
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">Введите данные банковской карты</p>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-2 block" style={{ fontFamily: 'Oswald, sans-serif' }}>
                          Номер карты
                        </label>
                        <input type="text" placeholder="0000 0000 0000 0000" maxLength={19}
                          value={paymentForm.card}
                          onChange={e => {
                            const v = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                            setPaymentForm(p => ({ ...p, card: v }));
                          }}
                          className="w-full bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded px-4 py-3 text-[hsl(var(--cream))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--gold))] transition-colors font-mono tracking-wider" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-2 block" style={{ fontFamily: 'Oswald, sans-serif' }}>
                            Срок действия
                          </label>
                          <input type="text" placeholder="MM/ГГ" maxLength={5}
                            value={paymentForm.expiry}
                            onChange={e => {
                              let v = e.target.value.replace(/\D/g, '');
                              if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                              setPaymentForm(p => ({ ...p, expiry: v }));
                            }}
                            className="w-full bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded px-4 py-3 text-[hsl(var(--cream))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--gold))] transition-colors font-mono" />
                        </div>
                        <div>
                          <label className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-2 block" style={{ fontFamily: 'Oswald, sans-serif' }}>
                            CVV
                          </label>
                          <input type="password" placeholder="•••" maxLength={3}
                            value={paymentForm.cvv}
                            onChange={e => setPaymentForm(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '') }))}
                            className="w-full bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded px-4 py-3 text-[hsl(var(--cream))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--gold))] transition-colors font-mono" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="bg-[hsl(var(--gold)/0.06)] border border-[hsl(var(--gold)/0.25)] rounded-lg p-5 animate-fade-in flex items-start gap-4">
                    <div className="w-10 h-10 bg-[hsl(var(--gold)/0.15)] rounded-full flex items-center justify-center text-[hsl(var(--gold))] shrink-0 mt-0.5">
                      <Icon name="Info" size={18} />
                    </div>
                    <div>
                      <div className="text-[hsl(var(--cream))] font-medium mb-1" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.5px' }}>
                        Оплата наличными курьеру
                      </div>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                        Приготовьте точную сумму или сообщите при оформлении, от какой купюры нужна сдача.
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-[hsl(var(--card))] border border-[hsl(var(--gold)/0.3)] rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[hsl(var(--muted-foreground))]">Сумма заказа:</span>
                    <span className="text-[hsl(var(--cream))] font-bold">{cartTotal} ₽</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[hsl(var(--muted-foreground))]">Доставка:</span>
                    <span className="text-[hsl(var(--cream))]">{cartTotal >= 1000 ? 'Бесплатно' : '150 ₽'}</span>
                  </div>
                  <div className="gold-divider mb-4" />
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[hsl(var(--cream))] font-medium">ИТОГО:</span>
                    <span className="text-2xl font-bold text-[hsl(var(--gold))]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {cartTotal + (cartTotal >= 1000 ? 0 : 150)} ₽
                    </span>
                  </div>
                  <button onClick={handleOrder} className="btn-gold w-full py-4 rounded text-base flex items-center justify-center gap-2">
                    <Icon name={paymentMethod === "card" ? "CreditCard" : "Banknote"} size={18} />
                    {paymentMethod === "card" ? "Оплатить картой" : "Заказать (оплата наличными)"}
                  </button>
                  {paymentMethod === "card" && (
                    <p className="text-center text-xs text-[hsl(var(--muted-foreground))] mt-3 flex items-center justify-center gap-1">
                      <Icon name="Lock" size={11} />
                      Защищённое соединение SSL
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== РАЙОНЫ ДОСТАВКИ ==================== */}
        {activeSection === "delivery" && (
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl text-[hsl(var(--cream))] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Районы доставки
              </h2>
              <CaucasusOrnament />
              <p className="text-[hsl(var(--muted-foreground))] mt-4">Доставляем горячим по всему городу — от 45 минут</p>
            </div>

            {/* Условия */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
              {[
                { icon: "Bike", title: "До 5 км", price: "Бесплатно", sub: "При заказе от 1000 ₽", color: "text-[hsl(var(--gold))]" },
                { icon: "MapPin", title: "5–10 км", price: "150 ₽", sub: "Любая сумма заказа", color: "text-[hsl(var(--cream))]" },
                { icon: "Clock", title: "Время", price: "45–60 мин", sub: "В часы пик до 75 мин", color: "text-[hsl(var(--cream))]" },
              ].map((c, i) => (
                <div key={i} className="dish-card rounded-lg p-6 text-center opacity-0 animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}>
                  <div className="w-12 h-12 bg-[hsl(var(--gold)/0.12)] border border-[hsl(var(--gold)/0.3)] rounded-full flex items-center justify-center mx-auto mb-4 text-[hsl(var(--gold))]">
                    <Icon name={c.icon} size={20} fallback="Circle" />
                  </div>
                  <div className="text-[hsl(var(--muted-foreground))] text-xs uppercase tracking-wider mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>{c.title}</div>
                  <div className={`text-2xl font-bold mb-1 ${c.color}`} style={{ fontFamily: 'Cormorant Garamond, serif' }}>{c.price}</div>
                  <div className="text-[hsl(var(--muted-foreground))] text-sm">{c.sub}</div>
                </div>
              ))}
            </div>

            <CaucasusOrnament className="mb-10" />

            {/* Таблица районов */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { zone: "Зона 1 — Центр", districts: ["Центральный район", "Старый город", "Площадь Ленина", "Набережная"], time: "30–45 мин", delivery: "Бесплатно от 1000 ₽", color: "border-[hsl(var(--gold)/0.5)]" },
                { zone: "Зона 1 — Запад", districts: ["Западный район", "Парковый", "Заречный", "Берёзовая роща"], time: "35–50 мин", delivery: "Бесплатно от 1000 ₽", color: "border-[hsl(var(--gold)/0.5)]" },
                { zone: "Зона 2 — Север", districts: ["Северный район", "Новостройки", "Промышленный", "Северная окраина"], time: "45–60 мин", delivery: "150 ₽", color: "border-[hsl(var(--border))]" },
                { zone: "Зона 2 — Юг", districts: ["Южный район", "Садовый", "Дачный массив", "Южная окраина"], time: "45–60 мин", delivery: "150 ₽", color: "border-[hsl(var(--border))]" },
              ].map((z, i) => (
                <div key={i} className={`bg-[hsl(var(--card))] border-2 ${z.color} rounded-lg p-5 opacity-0 animate-fade-in`}
                  style={{ animationDelay: `${i * 0.12}s`, animationFillMode: 'forwards' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[hsl(var(--gold))] font-semibold" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.5px' }}>
                      {z.zone}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${z.delivery === 'Бесплатно от 1000 ₽' ? 'bg-[hsl(var(--gold)/0.15)] text-[hsl(var(--gold))]' : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'}`}>
                      {z.delivery}
                    </span>
                  </div>
                  <ul className="space-y-1.5 mb-3">
                    {z.districts.map(d => (
                      <li key={d} className="flex items-center gap-2 text-[hsl(var(--cream)/0.8)] text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold)/0.6)] shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 pt-3 border-t border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] text-xs">
                    <Icon name="Clock" size={12} />
                    Время доставки: <span className="text-[hsl(var(--cream))]">{z.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Самовывоз */}
            <div className="mt-8 bg-[hsl(var(--gold)/0.06)] border border-[hsl(var(--gold)/0.25)] rounded-lg p-6 flex flex-col md:flex-row items-center gap-5">
              <div className="w-14 h-14 bg-[hsl(var(--gold)/0.15)] rounded-full flex items-center justify-center text-[hsl(var(--gold))] shrink-0">
                <Icon name="Store" size={24} fallback="MapPin" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-[hsl(var(--cream))] font-semibold mb-1" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '1px' }}>
                  САМОВЫВОЗ — БЕСПЛАТНО
                </div>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">
                  ул. Шашлычная, д. 1 · Готовим за 20–30 минут · Режим работы: 10:00–23:00
                </p>
              </div>
              <button onClick={() => setActiveSection("payment")} className="btn-gold px-6 py-3 rounded shrink-0">
                Заказать
              </button>
            </div>
          </div>
        )}

        {/* ==================== КОНТАКТЫ ==================== */}
        {activeSection === "contacts" && (
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl text-[hsl(var(--cream))] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Контакты
              </h2>
              <CaucasusOrnament />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  { icon: "Phone", title: "Телефон", text: "+7 (800) 555-35-35", sub: "Принимаем заказы 10:00–23:00" },
                  { icon: "MapPin", title: "Адрес", text: "ул. Шашлычная, д. 1", sub: "Возможен самовывоз" },
                  { icon: "Clock", title: "Часы работы", text: "10:00 – 23:00", sub: "Ежедневно, без выходных" },
                  { icon: "Bike", title: "Зона доставки", text: "В радиусе 10 км", sub: "Доставка за 45 минут" },
                ].map((c, i) => (
                  <div key={i} className="dish-card rounded-lg p-5 flex items-start gap-4 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}>
                    <div className="w-12 h-12 bg-[hsl(var(--gold)/0.12)] border border-[hsl(var(--gold)/0.3)] rounded-lg flex items-center justify-center shrink-0 text-[hsl(var(--gold))]">
                      <Icon name={c.icon} size={20} fallback="Info" />
                    </div>
                    <div>
                      <div className="text-[hsl(var(--gold))] text-sm mb-0.5" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>{c.title}</div>
                      <div className="text-[hsl(var(--cream))] font-medium">{c.text}</div>
                      <div className="text-[hsl(var(--muted-foreground))] text-sm">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-6 opacity-0 animate-fade-in delay-400" style={{ animationFillMode: 'forwards' }}>
                <h3 className="text-2xl text-[hsl(var(--gold))] mb-5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Написать нам
                </h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Ваше имя"
                    className="w-full bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded px-4 py-3 text-[hsl(var(--cream))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--gold))] transition-colors" />
                  <input type="tel" placeholder="Телефон"
                    className="w-full bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded px-4 py-3 text-[hsl(var(--cream))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--gold))] transition-colors" />
                  <textarea placeholder="Сообщение" rows={4}
                    className="w-full bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded px-4 py-3 text-[hsl(var(--cream))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--gold))] transition-colors resize-none" />
                  <button className="btn-gold w-full py-3 rounded">Отправить</button>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <CaucasusOrnament className="mb-6" />
              <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">Следите за нами</p>
              <div className="flex justify-center gap-4">
                {["📸 Instagram", "💬 VK", "📱 Telegram"].map(s => (
                  <button key={s} className="px-5 py-2 border border-[hsl(var(--border))] text-[hsl(var(--cream)/0.7)] rounded hover:border-[hsl(var(--gold)/0.5)] hover:text-[hsl(var(--gold))] transition-all text-sm">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-[hsl(var(--border))] mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <CaucasusOrnament className="mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[hsl(var(--muted-foreground))] text-sm">
            <div className="flex items-center gap-2">
              <span>🔥</span>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px' }} className="text-[hsl(var(--gold))]">Шашлычный дворик</span>
            </div>
            <span>© 2024 Все права защищены</span>
            <div className="flex items-center gap-2">
              <Icon name="CreditCard" size={14} />
              <span>Принимаем карты Visa, Mastercard, МИР</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}