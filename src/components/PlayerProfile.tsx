import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface PlayerStats {
  coins: number;
  level: number;
  experience: number;
  maxExperience: number;
  dailyStreak: number;
  totalSpins: number;
  lastLogin: string;
}

interface DailyBonus {
  day: number;
  reward: string;
  claimed: boolean;
  current: boolean;
}

const playerStats: PlayerStats = {
  coins: 1250,
  level: 5,
  experience: 750,
  maxExperience: 1000,
  dailyStreak: 7,
  totalSpins: 42,
  lastLogin: 'Сегодня'
};

const dailyBonuses: DailyBonus[] = [
  { day: 1, reward: '50', claimed: true, current: false },
  { day: 2, reward: '75', claimed: true, current: false },
  { day: 3, reward: '100', claimed: true, current: false },
  { day: 4, reward: '150', claimed: true, current: false },
  { day: 5, reward: '200', claimed: true, current: false },
  { day: 6, reward: '250', claimed: true, current: false },
  { day: 7, reward: '500', claimed: true, current: true },
];

export default function PlayerProfile() {
  const experiencePercent = (playerStats.experience / playerStats.maxExperience) * 100;

  return (
    <div className="space-y-6">
      {/* Player Stats Card */}
      <Card className="bg-gradient-to-br from-wheel-orange/5 to-wheel-blue/5 border-wheel-orange/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="User" size={24} className="text-wheel-orange" />
            <span className="gradient-text">Профиль игрока</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Coins */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-wheel-golden/10 to-wheel-orange/10 rounded-lg border border-wheel-golden/20">
            <div className="flex items-center space-x-3">
              <Icon name="Coins" size={32} className="text-wheel-golden" />
              <div>
                <p className="text-sm text-muted-foreground">Монеты</p>
                <p className="text-2xl font-bold text-wheel-golden">{playerStats.coins.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Level & Experience */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={20} className="text-wheel-blue" />
                <span className="font-semibold">Уровень {playerStats.level}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {playerStats.experience}/{playerStats.maxExperience} XP
              </span>
            </div>
            <Progress value={experiencePercent} className="h-3" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-wheel-green/10 rounded-lg border border-wheel-green/20">
              <Icon name="Calendar" size={24} className="text-wheel-green mx-auto mb-1" />
              <p className="text-sm text-muted-foreground">Серия дней</p>
              <p className="text-xl font-bold text-wheel-green">{playerStats.dailyStreak}</p>
            </div>
            <div className="text-center p-3 bg-wheel-magenta/10 rounded-lg border border-wheel-magenta/20">
              <Icon name="RotateCw" size={24} className="text-wheel-magenta mx-auto mb-1" />
              <p className="text-sm text-muted-foreground">Всего вращений</p>
              <p className="text-xl font-bold text-wheel-magenta">{playerStats.totalSpins}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Bonuses */}
      <Card className="bg-gradient-to-br from-wheel-green/5 to-wheel-blue/5 border-wheel-green/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Gift" size={24} className="text-wheel-green" />
            <span className="gradient-text">Ежедневные бонусы</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {dailyBonuses.map((bonus) => (
              <div
                key={bonus.day}
                className={`relative p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                  bonus.current
                    ? 'border-wheel-green bg-wheel-green/20 animate-pulse-glow'
                    : bonus.claimed
                    ? 'border-wheel-blue/30 bg-wheel-blue/10'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                {bonus.claimed && !bonus.current && (
                  <Icon name="Check" size={16} className="absolute top-1 right-1 text-wheel-green" />
                )}
                <p className="text-xs text-muted-foreground">День {bonus.day}</p>
                <div className="flex items-center justify-center my-1">
                  <Icon name="Coins" size={16} className="text-wheel-golden mr-1" />
                  <span className="text-sm font-bold">{bonus.reward}</span>
                </div>
                {bonus.current && (
                  <Badge variant="secondary" className="text-xs bg-wheel-green text-white">
                    Доступен
                  </Badge>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Заходите каждый день, чтобы получить бонус!
            </p>
            <Badge variant="outline" className="border-wheel-green text-wheel-green">
              <Icon name="Calendar" size={16} className="mr-1" />
              Серия: {playerStats.dailyStreak} дней
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}