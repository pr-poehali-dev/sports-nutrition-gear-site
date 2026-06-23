import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

type DeliveryType = 'courier' | 'pickup' | 'post';
type PaymentType = 'card' | 'cash' | 'sbp';

const DELIVERY: { id: DeliveryType; label: string; desc: string; icon: string; price: number }[] = [
  { id: 'courier', label: 'Курьер', desc: 'Доставка до двери, 1-2 дня', icon: 'Truck', price: 350 },
  { id: 'pickup', label: 'Самовывоз', desc: 'Из пункта выдачи, бесплатно', icon: 'MapPin', price: 0 },
  { id: 'post', label: 'Почта России', desc: 'До отделения, 3-7 дней', icon: 'Mail', price: 200 },
];

const PAYMENT: { id: PaymentType; label: string; desc: string; icon: string }[] = [
  { id: 'card', label: 'Банковская карта', desc: 'Visa, Mastercard, Мир', icon: 'CreditCard' },
  { id: 'sbp', label: 'СБП', desc: 'Система быстрых платежей', icon: 'Smartphone' },
  { id: 'cash', label: 'Наличными', desc: 'При получении заказа', icon: 'Banknote' },
];

const Field = ({ label, placeholder, type = 'text', half = false }: { label: string; placeholder: string; type?: string; half?: boolean }) => (
  <div className={half ? 'col-span-1' : 'col-span-2'}>
    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-12 px-4 rounded-xl bg-card border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
    />
  </div>
);

export default function Checkout() {
  const { items, total, count, clear } = useCart();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<DeliveryType>('courier');
  const [payment, setPayment] = useState<PaymentType>('card');
  const [done, setDone] = useState(false);
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const deliveryCost = total >= 3000 ? 0 : DELIVERY.find(d => d.id === delivery)?.price ?? 0;
  const discount = promoApplied ? Math.round(total * 0.15) : 0;
  const finalTotal = total + deliveryCost - discount;

  const handleOrder = () => {
    setDone(true);
    clear();
  };

  const handlePromo = () => {
    if (promo.trim().toLowerCase() === 'beast15') setPromoApplied(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6 glow">
            <Icon name="CheckCircle2" size={48} className="text-primary" />
          </div>
          <h1 className="font-display font-bold uppercase text-4xl mb-4">Заказ принят!</h1>
          <p className="text-muted-foreground mb-2">Номер заказа: <span className="font-bold text-foreground">#BF-{Math.floor(Math.random() * 90000) + 10000}</span></p>
          <p className="text-muted-foreground text-sm mb-8">Мы свяжемся с вами для подтверждения в течение 30 минут. Спасибо за покупку!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="font-display uppercase glow">
              <Link to="/">На главную</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-display uppercase border-foreground/20">
              <Link to="/catalog">Продолжить покупки</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
            <span className="text-primary">⚡</span>BEAST<span className="text-primary">FUEL</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/catalog" className="hover:text-primary transition-colors hidden sm:inline">Каталог</Link>
            <Icon name="ChevronRight" size={14} className="hidden sm:inline" />
            <span className="text-foreground font-medium">Оформление заказа</span>
          </div>
          <Button asChild variant="ghost" size="sm" className="font-display uppercase text-xs">
            <Link to="/catalog"><Icon name="ArrowLeft" size={14} className="mr-1" />Назад</Link>
          </Button>
        </div>
      </header>

      {/* STEPS */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 text-sm">
            {[['1', 'Доставка'], ['2', 'Оплата'], ['3', 'Проверка']].map(([n, label], i) => (
              <div key={n} className="flex items-center gap-2">
                {i > 0 && <Icon name="ChevronRight" size={14} className="text-muted-foreground" />}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground font-display font-bold text-xs flex items-center justify-center">{n}</div>
                  <span className="font-medium hidden sm:inline">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — FORM */}
          <div className="lg:col-span-2 space-y-8">

            {/* CONTACT */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-display font-bold uppercase text-xl mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                Контактные данные
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Имя" placeholder="Иван" half />
                <Field label="Фамилия" placeholder="Иванов" half />
                <Field label="Телефон" placeholder="+7 (999) 000-00-00" type="tel" half />
                <Field label="Email" placeholder="ivan@mail.ru" type="email" half />
              </div>
            </section>

            {/* DELIVERY */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-display font-bold uppercase text-xl mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Icon name="Truck" size={16} className="text-primary" />
                </div>
                Способ доставки
              </h2>
              <div className="space-y-3 mb-6">
                {DELIVERY.map((d) => (
                  <button key={d.id} onClick={() => setDelivery(d.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${delivery === d.id ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${delivery === d.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                      <Icon name={d.icon} size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{d.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{d.desc}</div>
                    </div>
                    <div className="font-display font-bold text-sm shrink-0">
                      {total >= 3000 || d.price === 0 ? <span className="text-primary">Бесплатно</span> : `${d.price} ₽`}
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${delivery === d.id ? 'border-primary' : 'border-border'}`}>
                      {delivery === d.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                  </button>
                ))}
              </div>

              {delivery === 'courier' && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Город</label>
                    <input placeholder="Москва" className="w-full h-12 px-4 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Адрес</label>
                    <input placeholder="Ул. Пушкина, д. 10" className="w-full h-12 px-4 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Квартира</label>
                    <input placeholder="42" className="w-full h-12 px-4 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Подъезд / этаж</label>
                    <input placeholder="3 / 7" className="w-full h-12 px-4 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
              )}
              {delivery === 'pickup' && (
                <div className="pt-4 border-t border-border">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Выберите пункт выдачи</label>
                  <div className="space-y-2">
                    {['Москва, ул. Арбат, 12 — Пн-Вс 9:00-21:00', 'Москва, Ленинский пр., 55 — Пн-Сб 10:00-20:00', 'Москва, ул. Тверская, 8 — Круглосуточно'].map((p) => (
                      <button key={p} className="w-full text-left text-sm p-3 rounded-lg border border-border hover:border-primary transition-colors text-muted-foreground hover:text-foreground">{p}</button>
                    ))}
                  </div>
                </div>
              )}
              {delivery === 'post' && (
                <div className="pt-4 border-t border-border">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Индекс и адрес отделения</label>
                  <input placeholder="115230, Москва, ул. Варшавское ш., 79" className="w-full h-12 px-4 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                </div>
              )}
            </section>

            {/* PAYMENT */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-display font-bold uppercase text-xl mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Icon name="CreditCard" size={16} className="text-primary" />
                </div>
                Способ оплаты
              </h2>
              <div className="space-y-3">
                {PAYMENT.map((p) => (
                  <button key={p.id} onClick={() => setPayment(p.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${payment === p.id ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${payment === p.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                      <Icon name={p.icon} size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{p.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{p.desc}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${payment === p.id ? 'border-primary' : 'border-border'}`}>
                      {payment === p.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                  </button>
                ))}
              </div>

              {payment === 'card' && (
                <div className="mt-6 pt-6 border-t border-border space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Номер карты</label>
                    <input placeholder="0000 0000 0000 0000" className="w-full h-12 px-4 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Срок действия</label>
                      <input placeholder="MM / YY" className="w-full h-12 px-4 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">CVV</label>
                      <input placeholder="•••" type="password" maxLength={3} className="w-full h-12 px-4 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                </div>
              )}

              {payment === 'sbp' && (
                <div className="mt-6 pt-6 border-t border-border text-center">
                  <div className="w-36 h-36 mx-auto bg-white rounded-2xl flex items-center justify-center mb-3">
                    <Icon name="QrCode" size={90} className="text-background" />
                  </div>
                  <p className="text-sm text-muted-foreground">Отсканируйте QR-код в приложении вашего банка</p>
                </div>
              )}
            </section>

            {/* COMMENT */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-display font-bold uppercase text-xl mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Icon name="MessageSquare" size={16} className="text-primary" />
                </div>
                Комментарий к заказу
              </h2>
              <textarea
                placeholder="Уточните время доставки, пожелания к заказу..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
              />
            </section>
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <div>
            <div className="sticky top-24 space-y-4">
              {/* Items */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-display font-bold uppercase text-lg mb-5">
                  Ваш заказ <span className="text-muted-foreground font-normal text-base">({count} шт.)</span>
                </h2>
                {items.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground text-sm mb-4">Корзина пуста</p>
                    <Button asChild variant="outline" className="font-display uppercase border-foreground/20">
                      <Link to="/catalog">В каталог</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 items-center">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-secondary shrink-0">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-sm truncate">{item.name}</p>
                          {(item.flavor || item.weight) && (
                            <p className="text-xs text-primary">{[item.flavor, item.weight].filter(Boolean).join(' · ')}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-0.5">{item.qty} × {item.price.toLocaleString()} ₽</p>
                        </div>
                        <span className="font-display font-bold text-sm shrink-0">{(item.price * item.qty).toLocaleString()} ₽</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Promo */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Промокод</label>
                <div className="flex gap-2">
                  <input
                    value={promo}
                    onChange={e => setPromo(e.target.value)}
                    placeholder="BEAST15"
                    disabled={promoApplied}
                    className="flex-1 h-11 px-4 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors disabled:opacity-50"
                  />
                  <Button onClick={handlePromo} disabled={promoApplied || !promo} variant="outline" className="font-display uppercase h-11 px-4 border-foreground/20 text-sm shrink-0">
                    {promoApplied ? <Icon name="Check" size={16} className="text-primary" /> : 'OK'}
                  </Button>
                </div>
                {promoApplied && <p className="text-xs text-primary mt-2 flex items-center gap-1"><Icon name="Tag" size={12} />Скидка 15% применена</p>}
                {!promoApplied && <p className="text-xs text-muted-foreground mt-2">Попробуйте: BEAST15</p>}
              </div>

              {/* Total */}
              <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Товары</span>
                  <span>{total.toLocaleString()} ₽</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-primary">Скидка (промокод)</span>
                    <span className="text-primary">−{discount.toLocaleString()} ₽</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Доставка</span>
                  <span className={deliveryCost === 0 ? 'text-primary font-semibold' : ''}>
                    {deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}
                  </span>
                </div>
                <div className="flex justify-between font-display font-bold text-xl pt-3 border-t border-border">
                  <span className="uppercase">Итого</span>
                  <span className="text-primary">{finalTotal.toLocaleString()} ₽</span>
                </div>

                <Button
                  size="lg"
                  onClick={handleOrder}
                  disabled={items.length === 0}
                  className="w-full font-display uppercase tracking-wider h-13 text-base glow mt-2"
                >
                  Подтвердить заказ<Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с <span className="text-primary cursor-pointer">условиями оферты</span>
                </p>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: 'ShieldCheck', label: 'Оригинал' },
                  { icon: 'RotateCcw', label: '14 дней' },
                  { icon: 'Headphones', label: 'Поддержка' },
                ].map((b) => (
                  <div key={b.label} className="bg-card border border-border rounded-xl p-3 text-center">
                    <Icon name={b.icon} size={18} className="text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
