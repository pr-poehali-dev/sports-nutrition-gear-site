import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export default function CartDrawer() {
  const { items, remove, update, clear, total, count, open, setOpen } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border flex flex-col animate-slide-in-right shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="font-display font-bold uppercase text-2xl">Корзина</h2>
            {count > 0 && (
              <span className="bg-primary text-primary-foreground font-display font-bold text-sm px-2.5 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clear}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors uppercase tracking-wide"
              >
                Очистить
              </button>
            )}
            <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
              <Icon name="X" size={22} />
            </Button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Icon name="ShoppingCart" size={36} className="text-muted-foreground" />
              </div>
              <p className="font-display font-bold uppercase text-xl mb-2">Корзина пуста</p>
              <p className="text-muted-foreground text-sm">Добавьте товары из каталога</p>
              <Button className="mt-6 font-display uppercase glow" onClick={() => setOpen(false)}>
                <Icon name="ArrowLeft" size={16} className="mr-2" />В каталог
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-background border border-border rounded-xl p-4 group">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.sub}</p>
                  <p className="font-display font-semibold text-sm leading-tight mt-0.5 truncate">{item.name}</p>
                  {(item.flavor || item.weight) && (
                    <p className="text-xs text-primary mt-1">
                      {[item.flavor, item.weight].filter(Boolean).join(' · ')}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    {/* Qty control */}
                    <div className="flex items-center border border-border rounded-lg overflow-hidden h-8">
                      <button
                        onClick={() => update(item.id, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors text-sm font-bold"
                      >−</button>
                      <span className="w-8 text-center font-display font-bold text-sm">{item.qty}</span>
                      <button
                        onClick={() => update(item.id, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors text-sm font-bold"
                      >+</button>
                    </div>
                    <span className="font-display font-bold text-base text-primary">
                      {(item.price * item.qty).toLocaleString()} ₽
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => remove(item.id)}
                  className="shrink-0 self-start text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 mt-0.5"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border space-y-4 shrink-0">
            {/* Promo */}
            <div className="flex gap-2">
              <input
                placeholder="Промокод"
                className="flex-1 h-10 px-4 rounded-lg bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
              <Button variant="outline" className="font-display uppercase h-10 px-4 border-foreground/20 text-sm">
                Применить
              </Button>
            </div>

            {/* Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Товары ({count} шт.)</span>
                <span>{total.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Доставка</span>
                <span className={total >= 3000 ? 'text-primary font-semibold' : ''}>
                  {total >= 3000 ? 'Бесплатно' : '350 ₽'}
                </span>
              </div>
              {total < 3000 && (
                <p className="text-xs text-muted-foreground">
                  До бесплатной доставки: <span className="text-primary font-semibold">{(3000 - total).toLocaleString()} ₽</span>
                </p>
              )}
              <div className="flex justify-between font-display font-bold text-xl pt-2 border-t border-border">
                <span className="uppercase">Итого</span>
                <span className="text-primary">{(total + (total >= 3000 ? 0 : 350)).toLocaleString()} ₽</span>
              </div>
            </div>

            <Button size="lg" onClick={() => { setOpen(false); navigate('/checkout'); }} className="w-full font-display uppercase tracking-wider h-13 text-base glow">
              Оформить заказ<Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}