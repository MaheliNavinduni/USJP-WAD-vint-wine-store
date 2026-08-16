import {
  Award,
  Droplet,
  Gem,
  Grape,
  Hand,
  Heart,
  Sprout,
  Truck,
  Wind,
  Wine,
} from 'lucide-react';

/**
 * Maps the plain icon names stored in the data files to lucide components, so
 * `data/site.js` never has to import React.
 */
const ICONS = {
  award: Award,
  heart: Heart,
  glass: Wine,
  truck: Truck,
  droplet: Droplet,
  tractor: Sprout,
  grape: Grape,
  hand: Hand,
  wind: Wind,
  gem: Gem,
};

export default function Icon({ name, size = 22, className, strokeWidth = 1.5 }) {
  const Component = ICONS[name] ?? Wine;
  return (
    <Component
      size={size}
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
}
