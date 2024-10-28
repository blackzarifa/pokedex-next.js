import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PokemonImageProps {
  src: string;
  cry: string;
  alt: string;
  isAnimating: boolean;
  volume?: number;
}

export default function PokemonImage({ src, cry, alt, isAnimating, volume }: PokemonImageProps) {
  const [isAnimatingInternal, setIsAnimatingInternal] = useState(false);

  const handleHover = () => {
    setIsAnimatingInternal(true);

    const audio = new Audio(cry);
    audio.volume = volume || 0.1;
    audio.play();

    setTimeout(() => setIsAnimatingInternal(false), 600);
  };

  return (
    <div className="relative aspect-square">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
        priority={true}
        className={cn(
          'object-contain p-3 transition-transform',
          (isAnimating || isAnimatingInternal) && 'scale-up-down'
        )}
        onMouseEnter={handleHover}
      />
    </div>
  );
}
