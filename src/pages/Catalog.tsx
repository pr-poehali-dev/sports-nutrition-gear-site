import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/context/CartContext';

const IMG = {
  nutrition: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/35b0c81e-52cb-403b-aeae-8e3db71889d4.jpg',
  gear: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/cd44d9b3-8299-43f9-952c-a7b97a5a1073.jpg',
};

type Product = { id: string; name: string; cat: 'Питание' | 'Снаряжение'; sub: string; price: number; old?: number; rating: number; reviews: number; tag?: string; img: string };

const PRODUCTS: Product[] = [
  { id: 'whey-protein-pro', name: 'Whey Protein PRO', cat: 'Питание', sub: 'Протеины', price: 2490, old: 3200, rating: 4.9, reviews: 312, tag: 'ХИТ', img: IMG.nutrition },
  { id: 'creatine-boost', name: 'Creatine Boost', cat: 'Питание', sub: 'Креатин', price: 1290, old: 1690, rating: 5.0, reviews: 421, tag: '-25%', img: IMG.nutrition },
  { id: 'mass-gainer-3000', name: 'Mass Gainer 3000', cat: 'Питание', sub: 'Гейнеры', price: 3490, rating: 4.7, reviews: 158, img: IMG.nutrition },
  { id: 'bcaa-energy', name: 'BCAA Energy', cat: 'Питание', sub: 'Аминокислоты', price: 1890, old: 2200, rating: 4.8, reviews: 203, tag: 'NEW', img: IMG.nutrition },
  { id: 'vitamin-complex', name: 'Vitamin Complex', cat: 'Питание', sub: 'Витамины', price: 990, rating: 4.6, reviews: 87, img: IMG.nutrition },
  { id: 'pre-workout-fire', name: 'Pre-Workout Fire', cat: 'Питание', sub: 'Предтреники', price: 1690, rating: 4.9, reviews: 276, tag: 'ХИТ', img: IMG.nutrition },
  { id: 'default', name: 'Power Set 20кг', cat: 'Снаряжение', sub: 'Гантели', price: 5990, rating: 4.8, reviews: 184, tag: 'NEW', img: IMG.gear },
  { id: 'resistance-bands', name: 'Resistance Bands X', cat: 'Снаряжение', sub: 'Эспандеры', price: 990, rating: 4.7, reviews: 96, img: IMG.gear },
  { id: 'yoga-mat-pro', name: 'Yoga Mat PRO', cat: 'Снаряжение', sub: 'Коврики', price: 1490, old: 1990, rating: 4.5, reviews: 64, tag: '-25%', img: IMG.gear },
  { id: 'lifting-belt', name: 'Lifting Belt', cat: 'Снаряжение', sub: 'Экипировка', price: 2290, rating: 4.9, reviews: 112, img: IMG.gear },
  { id: 'kettlebell-16', name: 'Kettlebell 16кг', cat: 'Снаряжение', sub: 'Гири', price: 3290, rating: 4.8, reviews: 145, img: IMG.gear },
  { name: 'Jump Rope Speed', cat: 'Снаряжение', sub: 'Кардио', price: 690, rating: 4.4, reviews: 53, img: IMG.gear },
];

const CATS = ['Питание', 'Снаряжение'] as const;
const SUBS = [...new Set(PRODUCTS.map((p) => p.sub))];
const MAX_PRICE = 6000;

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Icon key={i} name="Star" size={14} className={i <= Math.round(rating) ? 'text-primary fill-primary' : 'text-muted-foreground'} />
    ))}
  </div>
);

export default function Catalog() {
  const [cats, setCats] = useState<string[]>([]);
  const [subs, setSubs] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, MAX_PRICE]);
  const [sort, setSort] = useState<'pop' | 'cheap' | 'exp' | 'rating'>('pop');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { add, count, setOpen: openCart } = useCart();

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    const res = PRODUCTS.filter((p) =>
      (cats.length === 0 || cats.includes(p.cat)) &&
      (subs.length === 0 || subs.includes(p.sub)) &&
      p.price >= price[0] && p.price <= price[1]
    );
    const sorters: Record<string, (a: Product, b: Product) => number> = {
      pop: (a, b) => b.reviews - a.reviews,
      cheap: (a, b) => a.price - b.price,
      exp: (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...res].sort(sorters[sort]);
  }, [cats, subs, price, sort]);

  const reset = () => { setCats([]); setSubs([]); setPrice([0, MAX_PRICE]); };

  const FilterPanel = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold uppercase text-lg">Фильтры</h3>
        <button onClick={reset} className="text-xs text-primary hover:underline uppercase tracking-wide">Сбросить</button>
      </div>

      <div>
        <h4 className="font-display font-semibold uppercase text-sm mb-4">Категория</h4>
        <div className="space-y-3">
          {CATS.map((c) => (
            <label key={c} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox checked={cats.includes(c)} onCheckedChange={() => toggle(cats, setCats, c)} />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-semibold uppercase text-sm mb-4">Тип товара</h4>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {SUBS.map((s) => (
            <label key={s} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox checked={subs.includes(s)} onCheckedChange={() => toggle(subs, setSubs, s)} />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-semibold uppercase text-sm mb-5">Цена, ₽</h4>
        <Slider min={0} max={MAX_PRICE} step={100} value={price} onValueChange={setPrice} className="mb-4" />
        <div className="flex items-center justify-between text-sm">
          <span className="bg-secondary rounded-md px-3 py-1.5 font-medium">{price[0].toLocaleString()} ₽</span>
          <span className="text-muted-foreground">—</span>
          <span className="bg-secondary rounded-md px-3 py-1.5 font-medium">{price[1].toLocaleString()} ₽</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
            <span className="text-primary">⚡</span>BEAST<span className="text-primary">FUEL</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide flex items-center gap-2">
            <Icon name="ArrowLeft" size={16} />На главную
          </Link>
          <Button size="icon" variant="ghost" className="relative" onClick={() => openCart(true)}>
            <Icon name="ShoppingCart" size={20} />
            {count > 0 && <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{count}</span>}
          </Button>
        </div>
      </header>

      {/* TITLE */}
      <div className="bg-grid border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">Магазин</span>
          <h1 className="font-display font-bold uppercase text-5xl sm:text-6xl mt-2">Каталог товаров</h1>
          <p className="text-muted-foreground mt-3">Найдено {filtered.length} товаров</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex gap-10">
          {/* SIDEBAR DESKTOP */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6">
              <FilterPanel />
            </div>
          </aside>

          {/* MAIN */}
          <div className="flex-1">
            {/* TOOLBAR */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <Button variant="outline" className="lg:hidden font-display uppercase border-foreground/20" onClick={() => setFiltersOpen(true)}>
                <Icon name="SlidersHorizontal" size={16} className="mr-2" />Фильтры
              </Button>
              <div className="flex items-center gap-2 ml-auto flex-wrap">
                <span className="text-sm text-muted-foreground hidden sm:inline uppercase tracking-wide">Сортировка:</span>
                {([['pop', 'Популярные'], ['cheap', 'Дешевле'], ['exp', 'Дороже'], ['rating', 'Рейтинг']] as const).map(([k, label]) => (
                  <button key={k} onClick={() => setSort(k)} className={`text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-md transition-colors ${sort === k ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>{label}</button>
                ))}
              </div>
            </div>

            {/* GRID */}
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="font-display font-semibold text-xl uppercase">Ничего не найдено</p>
                <Button onClick={reset} className="mt-6 font-display uppercase">Сбросить фильтры</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <div key={p.name} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-all animate-float-up">
                    <Link to={`/product/${p.id}`} className="block">
                    <div className="relative aspect-square overflow-hidden bg-secondary">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      {p.tag && <span className="absolute top-3 left-3 bg-primary text-primary-foreground font-display font-bold text-xs uppercase px-3 py-1 rounded">{p.tag}</span>}
                      <Button size="icon" variant="secondary" className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.preventDefault()}><Icon name="Heart" size={16} /></Button>
                    </div>
                    <div className="p-5">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">{p.sub}</span>
                      <h3 className="font-display font-semibold text-lg mt-1">{p.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Stars rating={p.rating} />
                        <span className="text-xs text-muted-foreground">{p.rating} ({p.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display font-bold text-xl text-primary">{p.price.toLocaleString()} ₽</span>
                          {p.old && <span className="text-sm text-muted-foreground line-through">{p.old.toLocaleString()} ₽</span>}
                        </div>
                        <Button size="icon" className="rounded-lg" onClick={e => { e.preventDefault(); add({ id: p.id, name: p.name, sub: p.sub, price: p.price, img: p.img }); }}><Icon name="Plus" size={18} /></Button>
                      </div>
                    </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTERS DRAWER */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-card border-l border-border p-6 overflow-y-auto animate-slide-in-right">
            <div className="flex justify-end mb-4">
              <Button size="icon" variant="ghost" onClick={() => setFiltersOpen(false)}><Icon name="X" size={22} /></Button>
            </div>
            <FilterPanel />
            <Button className="w-full mt-8 font-display uppercase" onClick={() => setFiltersOpen(false)}>Показать {filtered.length} товаров</Button>
          </div>
        </div>
      )}
    </div>
  );
}