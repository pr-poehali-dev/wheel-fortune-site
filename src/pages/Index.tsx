import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FortuneWheel from '@/components/FortuneWheel';
import PlayerProfile from '@/components/PlayerProfile';
import PrizeShop from '@/components/PrizeShop';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('wheel');

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-wheel-orange to-wheel-blue flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Колесо Фортуны</h1>
                <p className="text-sm text-muted-foreground">Крути и выигрывай каждый день!</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-wheel-golden/10 px-3 py-2 rounded-lg border border-wheel-golden/20">
                <Icon name="Coins" size={20} className="text-wheel-golden" />
                <span className="font-bold text-wheel-golden">1,250</span>
              </div>
              <div className="flex items-center space-x-2 bg-wheel-green/10 px-3 py-2 rounded-lg border border-wheel-green/20">
                <Icon name="Calendar" size={20} className="text-wheel-green" />
                <span className="font-bold text-wheel-green">7 дней</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm p-1 h-auto">
            <TabsTrigger 
              value="wheel" 
              className="flex items-center space-x-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-wheel-orange data-[state=active]:to-wheel-blue data-[state=active]:text-white"
            >
              <Icon name="RotateCw" size={20} />
              <span className="hidden sm:inline">Колесо</span>
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="flex items-center space-x-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-wheel-green data-[state=active]:to-wheel-blue data-[state=active]:text-white"
            >
              <Icon name="User" size={20} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
            <TabsTrigger 
              value="shop"
              className="flex items-center space-x-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-wheel-magenta data-[state=active]:to-wheel-pink data-[state=active]:text-white"
            >
              <Icon name="ShoppingBag" size={20} />
              <span className="hidden sm:inline">Магазин</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="wheel" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold gradient-text">Испытай удачу!</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Крути колесо фортуны и получай монеты! Чем больше играешь, тем больше призов доступно в магазине.
              </p>
            </div>
            <div className="flex justify-center">
              <FortuneWheel />
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold gradient-text">Личный кабинет</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Отслеживай свой прогресс и получай ежедневные бонусы за активность!
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <PlayerProfile />
            </div>
          </TabsContent>

          <TabsContent value="shop" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold gradient-text">Магазин призов</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Трать заработанные монеты на усиления, новые темы и премиум функции!
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <PrizeShop />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-black/10 backdrop-blur-sm border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-wheel-orange to-wheel-blue flex items-center justify-center">
                <Icon name="Zap" size={16} className="text-white" />
              </div>
              <span className="text-white/80 font-medium">Колесо Фортуны</span>
            </div>
            
            <div className="flex items-center space-x-6 text-white/60 text-sm">
              <span>🎰 Играй честно</span>
              <span>🏆 Выигрывай призы</span>
              <span>⭐ Получай бонусы</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;