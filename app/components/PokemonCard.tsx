/**
 * PokemonCard Component
 * 
 * This component displays detailed information about a single Pokémon in a card format.
 * It shows the Pokémon's image, stats, abilities, and moves with appropriate styling
 * based on the Pokémon's type.
 * 
 * Features:
 * - Type-based color coding for badges and UI elements
 * - Stat visualization with colored progress bars
 * - Tooltips for abilities and moves with detailed descriptions
 * - Responsive layout that adapts to different screen sizes
 * - Visual enhancements like hover effects and animations
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Pokemon} props.pokemon - The Pokémon data object to display
 */

'use client';

import { useState } from 'react';
import { Pokemon } from '../types/pokemon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { capitalize } from '../utils/helpers';

interface PokemonCardProps {
  pokemon: Pokemon;
}

/**
 * Color mapping for Pokémon types
 * Each type has a corresponding Tailwind CSS background color class
 */
const TYPE_COLORS = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

/**
 * Color mapping for Pokémon stats
 * Each stat has corresponding background and progress bar colors
 */
const STAT_COLORS = {
  'hp': {
    bg: 'bg-red-100 dark:bg-red-950/30',
    bar: 'bg-red-500'
  },
  'attack': {
    bg: 'bg-orange-100 dark:bg-orange-950/30',
    bar: 'bg-orange-500'
  },
  'defense': {
    bg: 'bg-yellow-100 dark:bg-yellow-950/30',
    bar: 'bg-yellow-500'
  },
  'special-attack': {
    bg: 'bg-blue-100 dark:bg-blue-950/30',
    bar: 'bg-blue-500'
  },
  'special-defense': {
    bg: 'bg-green-100 dark:bg-green-950/30',
    bar: 'bg-green-500'
  },
  'speed': {
    bg: 'bg-pink-100 dark:bg-pink-950/30',
    bar: 'bg-pink-500'
  }
} as const;

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <TooltipProvider>
      <Card className="w-full h-full hover:shadow-xl transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 dark:border-gray-700">
        {/* Card Header with Pokémon name, ID, and types */}
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              {capitalize(pokemon.name)} #{pokemon.id.toString().padStart(3, '0')}
            </CardTitle>
            <div className="flex gap-2">
              {/* Type badges with appropriate colors */}
              {pokemon.types.map(({ type }) => (
                <Badge
                  key={type.name}
                  className={`${TYPE_COLORS[type.name as keyof typeof TYPE_COLORS]} text-white font-medium px-3 py-1`}
                >
                  {capitalize(type.name)}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        
        {/* Card Content with Pokémon details */}
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pokémon image container */}
            <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-900 rounded-lg p-4 hover:scale-105 transition-transform duration-300">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-48 h-48 object-contain drop-shadow-xl"
              />
            </div>
            
            {/* Pokémon stats, abilities, and moves */}
            <div className="space-y-6">
              {/* Stats section with colored progress bars */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">Stats</h3>
                {pokemon.stats.map((stat) => {
                  const statName = stat.stat.name as keyof typeof STAT_COLORS;
                  const statColors = STAT_COLORS[statName] || { bg: 'bg-gray-100 dark:bg-gray-800', bar: 'bg-gray-500' };
                  return (
                    <div key={stat.stat.name} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{capitalize(stat.stat.name)}</span>
                        <span className="text-sm font-bold">{stat.base_stat}</span>
                      </div>
                      <div className={`h-2 rounded-full ${statColors.bg}`}>
                        <div
                          className={`h-full rounded-full ${statColors.bar} transition-all duration-500`}
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Abilities section with tooltips */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map(({ ability, is_hidden, description }) => (
                    <Tooltip key={ability.name}>
                      <TooltipTrigger>
                        <div className="inline-block">
                          <Badge
                            variant={is_hidden ? "outline" : "default"}
                            className="cursor-help hover:scale-105 transition-transform"
                          >
                            {capitalize(ability.name)}
                            {is_hidden && " ★"}
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[300px] p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border dark:border-gray-700 text-foreground">
                        <p className="text-sm">{description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
              
              {/* Moves section with tooltips and type-based colors */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">Moves</h3>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                  {/* Use index in the key to ensure uniqueness */}
                  {pokemon.moves.map(({ move, description, power, accuracy, type }, index) => {
                    const moveType = type as keyof typeof TYPE_COLORS;
                    const typeColor = TYPE_COLORS[moveType] || 'bg-gray-400';
                    return (
                      <Tooltip key={`${move.name}-${index}`}>
                        <TooltipTrigger>
                          <div className="inline-block">
                            <Badge 
                              variant="secondary" 
                              className={`cursor-help hover:scale-105 transition-transform text-white ${typeColor}`}
                            >
                              {capitalize(move.name)}
                            </Badge>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[300px] p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border dark:border-gray-700 text-foreground">
                          <p className="text-sm mb-2">{description}</p>
                          <div className="flex gap-3 text-xs font-medium text-gray-600 dark:text-gray-300">
                            {power !== null && <span>Power: {power}</span>}
                            {accuracy !== null && <span>Accuracy: {accuracy}%</span>}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}