import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/context/CartContext';

const IMG = {
  n1: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/35b0c81e-52cb-403b-aeae-8e3db71889d4.jpg',
  n2: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/f5135d43-ddb2-4666-8d97-e59f755a5a40.jpg',
  n3: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/963d072a-d6b8-41dc-9c47-34c37e2a6447.jpg',
  gear: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/cd44d9b3-8299-43f9-952c-a7b97a5a1073.jpg',
  athlete: 'https://cdn.poehali.dev/projects/8de48591-a427-41a5-8897-cba27ae20a4f/files/156ec22f-4759-42df-9637-0b24bd15d1e6.jpg',
};

type ProductData = {
  id: string; name: string; sub: string; price: number; old?: number; rating: number; reviews: number; tag?: string;
  images: string[]; desc: string; flavors?: string[]; weights?: string[];
  facts: { label: string; value: string }[];
  reviewList: { name: string; rating: number; text: string; date: string; img?: string; verified: boolean }[];
};

const PRODUCTS: Record<string, ProductData> = {
  'whey-protein-pro': {
    id: 'whey-protein-pro', name: 'Whey Protein PRO', sub: 'Протеины', price: 2490, old: 3200, rating: 4.9, reviews: 312, tag: 'ХИТ',
    images: [IMG.n1, IMG.n2, IMG.n3, IMG.gear],
    desc: 'Whey Protein PRO — концентрат сывороточного протеина высшей степени очистки. 27 г чистого белка на порцию, минимум лактозы, без искусственных подсластителей. Идеален для набора мышечной массы и восстановления после тренировок.',
    flavors: ['Шоколад', 'Ваниль', 'Клубника', 'Солёная карамель'],
    weights: ['900 г', '1800 г', '2700 г'],
    facts: [
      { label: 'Белок на порцию', value: '27 г' },
      { label: 'Калорийность', value: '140 ккал' },
      { label: 'Углеводы', value: '4.5 г' },
      { label: 'Жиры', value: '2.3 г' },
      { label: 'Порций в банке', value: '30' },
      { label: 'Страна', value: 'Германия' },
    ],
    reviewList: [
      { name: 'Андрей К.', rating: 5, text: 'Протеин топ! Растворяется без комков, вкус шоколада реально шоколадный. Результат на лице уже через месяц — масса пошла вверх.', date: '15 июня 2026', img: IMG.athlete, verified: true },
      { name: 'Екатерина М.', rating: 5, text: 'Беру уже третью банку. Вкус ванили нежный, не приторный. Пью после тренировки — восстановление заметно лучше.', date: '8 июня 2026', img: IMG.n1, verified: true },
      { name: 'Максим Д.', rating: 4, text: 'Качество хорошее, цена адекватная. Единственное — шейкер надо мощный, иначе бывают небольшие комки. 4 звезды.', date: '1 июня 2026', verified: false },
      { name: 'Ольга В.', rating: 5, text: 'Отличный протеин для девушек! Не раздувает, хорошо усваивается. Клубничный вкус просто бомба 🍓', date: '22 мая 2026', img: IMG.gear, verified: true },
    ],
  },
  'default': {
    id: 'default', name: 'Power Set 20кг', sub: 'Гантели', price: 5990, rating: 4.8, reviews: 184, tag: 'NEW',
    images: [IMG.gear, IMG.n1, IMG.athlete, IMG.n2],
    desc: 'Набор разборных гантелей 20 кг — идеальный выбор для домашних тренировок. Прорезиненные диски не скользят и не царапают пол. Удобная фиксация дисков, эргономичная рукоять.',
    weights: ['10 кг', '20 кг', '30 кг'],
    facts: [
      { label: 'Максимальный вес', value: '20 кг' },
      { label: 'Материал дисков', value: 'Каучук' },
      { label: 'Рукоять', value: 'Хром' },
      { label: 'Длина грифа', value: '35 см' },
      { label: 'Гарантия', value: '2 года' },
      { label: 'Страна', value: 'Россия' },
    ],
    reviewList: [
      { name: 'Мария В.', rating: 5, text: 'Заказала набор — качество отличное, доставили за 2 дня. Покрытие приятное, не скользит, пол не царапает.', date: '10 июня 2026', img: IMG.gear, verified: true },
      { name: 'Игорь С.', rating: 5, text: 'Ждал неделю — пришло быстро. Фиксация дисков отличная, ничего не болтается. Берите смело!', date: '3 июня 2026', verified: true },
      { name: 'Павел Н.', rating: 4, text: 'Хорошее качество за свои деньги. Хотелось бы чехол в комплекте — без него неудобно хранить.', date: '28 мая 2026', img: IMG.athlete, verified: false },
    ],
  },
};

const Stars = ({ rating, size = 16 }: { rating: number; size?: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Icon key={i} name="Star" size={size} className={i <= Math.round(rating) ? 'text-primary fill-primary' : 'text-muted-foreground'} />
    ))}
  </div>
);

const RatingBar = ({ label, value, total }: { label: string; value: number; total: number }) => (
  <div className="flex items-center gap-3 text-sm">
    <span className="w-4 text-right text-muted-foreground">{label}</span>
    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full" style={{ width: `${(value / total) * 100}%` }} />
    </div>
    <span className="w-6 text-muted-foreground">{value}</span>
  </div>
);

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS[id ?? ''] ?? PRODUCTS['default'];

  const [activeImg, setActiveImg] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors?.[0] ?? '');
  const [selectedWeight, setSelectedWeight] = useState(product.weights?.[0] ?? '');
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const { add, count, setOpen: openCart } = useCart();

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      add({ id: product.id, name: product.name, sub: product.sub, price: product.price, img: product.images[0], flavor: selectedFlavor || undefined, weight: selectedWeight || undefined });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const ratingDist = [
    { label: '5', value: Math.round(product.reviews * 0.72) },
    { label: '4', value: Math.round(product.reviews * 0.18) },
    { label: '3', value: Math.round(product.reviews * 0.06) },
    { label: '2', value: Math.round(product.reviews * 0.02) },
    { label: '1', value: Math.round(product.reviews * 0.02) },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
            <span className="text-primary">⚡</span>BEAST<span className="text-primary">FUEL</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <Link to="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground truncate max-w-[140px] sm:max-w-xs">{product.name}</span>
          </div>
          <Button size="icon" variant="ghost" className="relative" onClick={() => openCart(true)}>
            <Icon name="ShoppingCart" size={20} />
            {count > 0 && <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{count}</span>}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        {/* PRODUCT MAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* GALLERY */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border group">
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover transition-all duration-500" />
              {product.tag && (
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground font-display font-bold text-sm uppercase px-4 py-1.5 rounded">
                  {product.tag}
                </span>
              )}
              <button onClick={() => setLiked(!liked)} className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-background/60 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                <Icon name="Heart" size={20} className={liked ? 'text-red-500 fill-red-500' : 'text-foreground'} />
              </button>
              {/* arrows */}
              {product.images.length > 1 && <>
                <button onClick={() => setActiveImg((activeImg - 1 + product.images.length) % product.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="ChevronLeft" size={18} />
                </button>
                <button onClick={() => setActiveImg((activeImg + 1) % product.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="ChevronRight" size={18} />
                </button>
              </>}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-primary' : 'border-border hover:border-muted-foreground'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="space-y-6">
            <div>
              <span className="text-primary font-semibold uppercase tracking-widest text-sm">{product.sub}</span>
              <h1 className="font-display font-bold uppercase text-4xl lg:text-5xl mt-2 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 mt-4">
                <Stars rating={product.rating} size={18} />
                <span className="font-display font-bold text-lg">{product.rating}</span>
                <span className="text-muted-foreground text-sm">{product.reviews} отзывов</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="font-display font-bold text-5xl text-primary">{product.price.toLocaleString()} ₽</span>
              {product.old && <span className="text-xl text-muted-foreground line-through">{product.old.toLocaleString()} ₽</span>}
              {product.old && <span className="text-sm font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">−{Math.round((1 - product.price / product.old) * 100)}%</span>}
            </div>

            {/* Flavors */}
            {product.flavors && (
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide mb-3">Вкус: <span className="text-primary">{selectedFlavor}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((f) => (
                    <button key={f} onClick={() => setSelectedFlavor(f)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${selectedFlavor === f ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-muted-foreground text-muted-foreground'}`}>{f}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Weights */}
            {product.weights && (
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide mb-3">Объём: <span className="text-primary">{selectedWeight}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.weights.map((w) => (
                    <button key={w} onClick={() => setSelectedWeight(w)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${selectedWeight === w ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-muted-foreground text-muted-foreground'}`}>{w}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors text-lg font-bold">−</button>
                <span className="w-12 text-center font-display font-bold text-lg">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors text-lg font-bold">+</button>
              </div>
              <Button size="lg" onClick={handleAdd} className={`flex-1 font-display uppercase tracking-wider h-12 glow text-base transition-all ${added ? 'bg-green-500 hover:bg-green-500' : ''}`}>
                <Icon name={added ? 'Check' : 'ShoppingCart'} size={18} className="mr-2" />
                {added ? 'Добавлено!' : 'В корзину'}
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-4 border-foreground/20">
                <Icon name="Bookmark" size={18} />
              </Button>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: 'Truck', label: 'Доставка за 2 дня' },
                { icon: 'ShieldCheck', label: 'Оригинал' },
                { icon: 'RotateCcw', label: 'Возврат 14 дней' },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-3 text-center">
                  <Icon name={b.icon} size={20} className="text-primary" />
                  <span className="text-xs text-muted-foreground leading-tight">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABS */}
        <Tabs defaultValue="desc" className="mb-16">
          <TabsList className="bg-card border border-border h-auto p-1 gap-1 flex-wrap">
            <TabsTrigger value="desc" className="font-display uppercase tracking-wide data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Описание</TabsTrigger>
            <TabsTrigger value="facts" className="font-display uppercase tracking-wide data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Состав и БЖУ</TabsTrigger>
            <TabsTrigger value="reviews" className="font-display uppercase tracking-wide data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Отзывы ({product.reviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="desc" className="mt-6">
            <div className="bg-card border border-border rounded-2xl p-8 max-w-3xl">
              <p className="text-muted-foreground leading-relaxed text-base">{product.desc}</p>
              <ul className="mt-6 space-y-3">
                {['Быстрое усвоение — идеально после тренировки', 'Без сахара и ГМО', 'Проверен в независимой лаборатории', 'Подходит для сушки и набора массы'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <Icon name="CheckCircle2" size={18} className="text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="facts" className="mt-6">
            <div className="bg-card border border-border rounded-2xl p-8 max-w-lg">
              <h3 className="font-display font-bold uppercase text-xl mb-6">Пищевая ценность на 1 порцию</h3>
              <div className="space-y-4">
                {product.facts.map((f) => (
                  <div key={f.label} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                    <span className="text-muted-foreground">{f.label}</span>
                    <span className="font-display font-bold text-primary">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Summary */}
              <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center">
                <div className="font-display font-bold text-7xl text-primary">{product.rating}</div>
                <Stars rating={product.rating} size={24} />
                <p className="text-muted-foreground text-sm mt-3">{product.reviews} отзывов</p>
                <div className="w-full mt-6 space-y-2">
                  {ratingDist.map((r) => (
                    <RatingBar key={r.label} label={r.label} value={r.value} total={product.reviews} />
                  ))}
                </div>
                <Button className="w-full mt-6 font-display uppercase" variant="outline">Написать отзыв</Button>
              </div>

              {/* Review list */}
              <div className="lg:col-span-2 space-y-5">
                {product.reviewList.map((r) => (
                  <div key={r.name} className="bg-card border border-border rounded-2xl overflow-hidden">
                    {r.img && (
                      <div className="aspect-[16/6] overflow-hidden">
                        <img src={r.img} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center font-display font-bold text-primary shrink-0">{r.name[0]}</div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-sm">{r.name}</span>
                              {r.verified && <span className="flex items-center gap-1 text-[10px] text-primary font-semibold uppercase tracking-wide"><Icon name="BadgeCheck" size={12} />Верифицирован</span>}
                            </div>
                            <span className="text-xs text-muted-foreground">{r.date}</span>
                          </div>
                        </div>
                        <Stars rating={r.rating} size={14} />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* BACK */}
        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg" className="font-display uppercase border-foreground/20">
            <Link to="/catalog"><Icon name="ArrowLeft" size={18} className="mr-2" />Вернуться в каталог</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}