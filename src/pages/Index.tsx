import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const NAV = ['Главная', 'Каталог', 'Питание', 'Снаряжение', 'О нас', 'Блог', 'Контакты'];

const PRODUCTS = [
  { name: 'Whey Protein PRO', cat: 'Питание', price: '2 490 ₽', old: '3 200 ₽', rating: 4.9, reviews: 312, tag: 'ХИТ', img: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/35b0c81e-52cb-403b-aeae-8e3db71889d4.jpg' },
  { name: 'Power Set 20кг', cat: 'Снаряжение', price: '5 990 ₽', old: '', rating: 4.8, reviews: 184, tag: 'NEW', img: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/cd44d9b3-8299-43f9-952c-a7b97a5a1073.jpg' },
  { name: 'Creatine Boost', cat: 'Питание', price: '1 290 ₽', old: '1 690 ₽', rating: 5.0, reviews: 421, tag: '-25%', img: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/35b0c81e-52cb-403b-aeae-8e3db71889d4.jpg' },
  { name: 'Resistance Bands X', cat: 'Снаряжение', price: '990 ₽', old: '', rating: 4.7, reviews: 96, tag: '', img: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/cd44d9b3-8299-43f9-952c-a7b97a5a1073.jpg' },
];

const CATEGORIES = [
  { name: 'Протеины', icon: 'Beef', count: 48 },
  { name: 'Креатин', icon: 'Zap', count: 23 },
  { name: 'Гантели', icon: 'Dumbbell', count: 67 },
  { name: 'Эспандеры', icon: 'Cable', count: 31 },
  { name: 'Витамины', icon: 'Pill', count: 54 },
  { name: 'Экипировка', icon: 'Shirt', count: 89 },
];

const REVIEWS = [
  { name: 'Андрей К.', text: 'Протеин топ! Растворяется без комков, вкус шоколада реально шоколадный. Результат на лице уже через месяц.', rating: 5, product: 'Whey Protein PRO', img: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/156ec22f-4759-42df-9637-0b24bd15d1e6.jpg' },
  { name: 'Мария В.', text: 'Заказала набор гантелей — качество отличное, доставили за 2 дня. Покрытие приятное, не скользит.', rating: 5, product: 'Power Set 20кг', img: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/cd44d9b3-8299-43f9-952c-a7b97a5a1073.jpg' },
  { name: 'Дмитрий П.', text: 'Креатин работает, силовые подросли. Беру уже третью банку. Цена-качество огонь!', rating: 5, product: 'Creatine Boost', img: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/35b0c81e-52cb-403b-aeae-8e3db71889d4.jpg' },
];

const BLOG = [
  { title: 'Как набрать массу: 5 правил питания', tag: 'Питание', date: '18 июня', img: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/35b0c81e-52cb-403b-aeae-8e3db71889d4.jpg' },
  { title: 'Программа тренировок для новичка', tag: 'Тренировки', date: '12 июня', img: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/156ec22f-4759-42df-9637-0b24bd15d1e6.jpg' },
  { title: 'Гид по экипировке для зала', tag: 'Снаряжение', date: '5 июня', img: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/cd44d9b3-8299-43f9-952c-a7b97a5a1073.jpg' },
];

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Icon key={i} name="Star" size={14} className={i <= Math.round(rating) ? 'text-primary fill-primary' : 'text-muted-foreground'} />
    ))}
  </div>
);

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <a href="#" className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
            <span className="text-primary">⚡</span>BEAST<span className="text-primary">FUEL</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" className="hidden sm:flex"><Icon name="Search" size={20} /></Button>
            <Button size="icon" variant="ghost" className="relative">
              <Icon name="ShoppingCart" size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </Button>
            <Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="lg:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3 animate-fade-in">
            {NAV.map((item) => (
              <a key={item} href="#" className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-primary">{item}</a>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-16 min-h-screen flex items-center bg-grid">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/60 to-transparent z-10" />
        <img src="https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/156ec22f-4759-42df-9637-0b24bd15d1e6.jpg" alt="" className="absolute right-0 top-0 h-full w-full lg:w-1/2 object-cover opacity-70" />
        <div className="container mx-auto px-4 relative z-20 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6 animate-float-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Новая коллекция 2026</span>
            </div>
            <h1 className="font-display font-bold uppercase leading-[0.9] text-6xl sm:text-7xl lg:text-8xl mb-6 animate-float-up" style={{ animationDelay: '0.1s' }}>
              Топливо<br />для <span className="text-primary">зверя</span><br /><span className="text-stroke">внутри тебя</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8 animate-float-up" style={{ animationDelay: '0.2s' }}>
              Спортивное питание и снаряжение для тех, кто не ищет оправданий. Только результат.
            </p>
            <div className="flex flex-wrap gap-4 animate-float-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="font-display uppercase tracking-wider text-base glow h-14 px-8">
                В каталог<Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="font-display uppercase tracking-wider text-base h-14 px-8 border-foreground/20">
                Подобрать питание
              </Button>
            </div>
            <div className="flex gap-8 mt-12 animate-float-up" style={{ animationDelay: '0.4s' }}>
              {[['12K+', 'клиентов'], ['450+', 'товаров'], ['4.9', 'рейтинг']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-3xl text-primary">{n}</div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-primary text-primary-foreground py-3 overflow-hidden border-y border-primary">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="flex items-center font-display font-bold uppercase text-lg tracking-wider">
              {['Бесплатная доставка от 3000 ₽', 'Оригинальная продукция', 'Кэшбэк 10%', 'Поддержка 24/7', 'Скидки до 40%'].map((t) => (
                <span key={t} className="flex items-center px-6">{t}<Icon name="Zap" size={16} className="ml-6" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">Категории</span>
            <h2 className="font-display font-bold uppercase text-4xl sm:text-5xl mt-2">Выбери своё</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((c) => (
            <button key={c.name} className="group bg-card border border-border rounded-xl p-6 text-center hover:border-primary hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary transition-colors">
                <Icon name={c.icon} size={26} className="text-primary group-hover:text-primary-foreground" />
              </div>
              <div className="font-display font-semibold uppercase text-sm">{c.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.count} товаров</div>
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">Каталог</span>
            <h2 className="font-display font-bold uppercase text-4xl sm:text-5xl mt-2">Хиты продаж</h2>
          </div>
          <Button variant="outline" className="font-display uppercase border-foreground/20 hidden sm:flex">Все товары<Icon name="ArrowRight" size={16} className="ml-2" /></Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-all">
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {p.tag && <span className="absolute top-3 left-3 bg-primary text-primary-foreground font-display font-bold text-xs uppercase px-3 py-1 rounded">{p.tag}</span>}
                <Button size="icon" variant="secondary" className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"><Icon name="Heart" size={16} /></Button>
              </div>
              <div className="p-5">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">{p.cat}</span>
                <h3 className="font-display font-semibold text-lg mt-1">{p.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Stars rating={p.rating} />
                  <span className="text-xs text-muted-foreground">{p.rating} ({p.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-xl text-primary">{p.price}</span>
                    {p.old && <span className="text-sm text-muted-foreground line-through">{p.old}</span>}
                  </div>
                  <Button size="icon" className="rounded-lg"><Icon name="Plus" size={18} /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative rounded-3xl overflow-hidden bg-card border border-border clip-slant">
          <img src="https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/cd44d9b3-8299-43f9-952c-a7b97a5a1073.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="relative z-10 p-10 lg:p-16 max-w-xl">
            <span className="text-accent font-bold uppercase tracking-widest text-sm">Снаряжение</span>
            <h2 className="font-display font-bold uppercase text-4xl lg:text-6xl mt-3 leading-tight">Экипируй себя как чемпион</h2>
            <p className="text-muted-foreground mt-4 mb-8">Гантели, эспандеры, коврики и аксессуары для дома и зала. Скидки до 40% на весь раздел.</p>
            <Button size="lg" className="font-display uppercase tracking-wider glow h-14 px-8">Смотреть снаряжение<Icon name="ArrowRight" size={18} className="ml-2" /></Button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">Отзывы</span>
          <h2 className="font-display font-bold uppercase text-4xl sm:text-5xl mt-2">Что говорят клиенты</h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Stars rating={5} />
            <span className="font-display font-bold text-xl">4.9 / 5</span>
            <span className="text-muted-foreground">— на основе 2840 отзывов</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-colors">
              <div className="aspect-video overflow-hidden bg-secondary">
                <img src={r.img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center font-display font-bold text-primary">{r.name[0]}</div>
                    <div>
                      <div className="font-semibold text-sm">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.product}</div>
                    </div>
                  </div>
                  <Stars rating={r.rating} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">Блог</span>
            <h2 className="font-display font-bold uppercase text-4xl sm:text-5xl mt-2">Тренировки и питание</h2>
          </div>
          <Button variant="outline" className="font-display uppercase border-foreground/20 hidden sm:flex">Все статьи<Icon name="ArrowRight" size={16} className="ml-2" /></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG.map((b) => (
            <article key={b.title} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary mb-4">
                <img src={b.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-wide mb-2">
                <span className="text-primary font-semibold">{b.tag}</span>
                <span className="text-muted-foreground">{b.date}</span>
              </div>
              <h3 className="font-display font-semibold text-xl group-hover:text-primary transition-colors">{b.title}</h3>
            </article>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-primary rounded-3xl p-10 lg:p-16 text-center text-primary-foreground">
          <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl">Получи скидку 15%</h2>
          <p className="mt-3 mb-8 opacity-80 max-w-md mx-auto">Подпишись на рассылку и забери промокод на первый заказ + гайд по питанию в подарок.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input placeholder="Твой email" className="flex-1 h-12 px-5 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 outline-none" />
            <Button size="lg" variant="secondary" className="font-display uppercase h-12">Получить</Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="font-display font-bold text-2xl flex items-center gap-2"><span className="text-primary">⚡</span>BEAST<span className="text-primary">FUEL</span></a>
              <p className="text-sm text-muted-foreground mt-4">Спортивное питание и снаряжение для настоящих чемпионов.</p>
              <div className="flex gap-3 mt-5">
                {['Send', 'Instagram', 'Youtube'].map((s) => (
                  <a key={s} href="#" className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"><Icon name={s} size={18} /></a>
                ))}
              </div>
            </div>
            {[
              ['Магазин', ['Питание', 'Снаряжение', 'Витамины', 'Аксессуары']],
              ['Компания', ['О нас', 'Блог', 'Доставка', 'Контакты']],
              ['Поддержка', ['FAQ', 'Возврат', 'Гарантия', 'Связаться']],
            ].map(([title, links]) => (
              <div key={title as string}>
                <h4 className="font-display font-semibold uppercase text-sm mb-4">{title as string}</h4>
                <ul className="space-y-2">
                  {(links as string[]).map((l) => (
                    <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted-foreground">
            <span>© 2026 BEASTFUEL. Все права защищены.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary">Оферта</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
