import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PrizeItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'powerup' | 'cosmetic' | 'premium';
  icon: string;
  available: boolean;
  limited?: boolean;
}

const prizes: PrizeItem[] = [
  {
    id: '1',
    name: 'Двойные монеты',
    description: 'Удваивает награды от следующих 5 вращений',
    price: 500,
    category: 'powerup',
    icon: 'Zap',
    available: true
  },
  {
    id: '2',
    name: 'Гарантированный выигрыш',
    description: 'Следующее вращение точно принесет приз от 200 монет',
    price: 800,
    category: 'powerup',
    icon: 'Target',
    available: true,
    limited: true
  },
  {
    id: '3',
    name: 'Золотое колесо',
    description: 'Эксклюзивная тема оформления колеса',
    price: 1500,
    category: 'cosmetic',
    icon: 'Crown',
    available: true
  },
  {
    id: '4',
    name: 'Магический множитель',
    description: 'Увеличивает все награды в 3 раза на час',
    price: 1200,
    category: 'premium',
    icon: 'Sparkles',
    available: true,
    limited: true
  },
  {
    id: '5',
    name: 'Дополнительные вращения',
    description: 'Получите 10 дополнительных вращений',
    price: 300,
    category: 'powerup',
    icon: 'RotateCw',
    available: true
  },
  {
    id: '6',
    name: 'Радужная тема',
    description: 'Красочная анимированная тема колеса',
    price: 2000,
    category: 'cosmetic',
    icon: 'Palette',
    available: false
  }
];

const categories = [
  { id: 'all', name: 'Все', icon: 'Grid3X3' },
  { id: 'powerup', name: 'Усиления', icon: 'Zap' },
  { id: 'cosmetic', name: 'Внешний вид', icon: 'Palette' },
  { id: 'premium', name: 'Премиум', icon: 'Crown' }
];

export default function PrizeShop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const playerCoins = 1250; // This would come from player state

  const filteredPrizes = prizes.filter(prize => 
    selectedCategory === 'all' || prize.category === selectedCategory
  );

  const handlePurchase = (prizeId: string, price: number) => {
    if (playerCoins >= price) {
      setPurchasedItems([...purchasedItems, prizeId]);
      // Here you would update player coins and trigger purchase logic
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'powerup': return 'wheel-blue';
      case 'cosmetic': return 'wheel-magenta';
      case 'premium': return 'wheel-golden';
      default: return 'gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-wheel-magenta/5 to-wheel-pink/5 border-wheel-magenta/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="ShoppingBag" size={24} className="text-wheel-magenta" />
              <span className="gradient-text">Магазин призов</span>
            </div>
            <div className="flex items-center space-x-2 bg-wheel-golden/10 px-4 py-2 rounded-lg border border-wheel-golden/20">
              <Icon name="Coins" size={20} className="text-wheel-golden" />
              <span className="font-bold text-wheel-golden">{playerCoins.toLocaleString()}</span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-wheel-orange to-wheel-blue text-white'
                : 'border-wheel-orange/30 hover:bg-wheel-orange/10'
            }`}
          >
            <Icon name={category.icon as any} size={16} />
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Prize Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrizes.map((prize) => {
          const isAffordable = playerCoins >= prize.price;
          const isPurchased = purchasedItems.includes(prize.id);
          const categoryColor = getCategoryColor(prize.category);

          return (
            <Card 
              key={prize.id}
              className={`relative transition-all duration-200 hover:scale-105 ${
                !prize.available 
                  ? 'opacity-50 grayscale'
                  : `bg-gradient-to-br from-${categoryColor}/5 to-${categoryColor}/10 border-${categoryColor}/20 hover:shadow-lg`
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg bg-${categoryColor}/10 border border-${categoryColor}/20`}>
                    <Icon name={prize.icon as any} size={24} className={`text-${categoryColor}`} />
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {prize.limited && (
                      <Badge variant="destructive" className="text-xs">
                        Лимитированный
                      </Badge>
                    )}
                    <Badge variant="outline" className={`border-${categoryColor} text-${categoryColor}`}>
                      {prize.category === 'powerup' && 'Усиление'}
                      {prize.category === 'cosmetic' && 'Внешний вид'}
                      {prize.category === 'premium' && 'Премиум'}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{prize.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{prize.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Coins" size={20} className="text-wheel-golden" />
                    <span className="text-xl font-bold text-wheel-golden">
                      {prize.price.toLocaleString()}
                    </span>
                  </div>
                  
                  <Button
                    disabled={!prize.available || isPurchased || !isAffordable}
                    onClick={() => handlePurchase(prize.id, prize.price)}
                    className={`${
                      isPurchased
                        ? 'bg-wheel-green text-white'
                        : isAffordable
                        ? `bg-gradient-to-r from-${categoryColor} to-wheel-blue text-white hover:scale-105`
                        : 'bg-gray-300 text-gray-500'
                    }`}
                  >
                    {isPurchased ? (
                      <div className="flex items-center space-x-1">
                        <Icon name="Check" size={16} />
                        <span>Куплено</span>
                      </div>
                    ) : !prize.available ? (
                      'Недоступно'
                    ) : !isAffordable ? (
                      'Недостаточно монет'
                    ) : (
                      'Купить'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPrizes.length === 0 && (
        <Card className="p-8 text-center">
          <Icon name="Package" size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">В этой категории пока нет товаров</p>
        </Card>
      )}
    </div>
  );
}