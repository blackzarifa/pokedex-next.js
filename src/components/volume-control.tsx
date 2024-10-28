import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useVolume } from '@/context/volume-context';

const VolumeControl = () => {
  const { volume, setVolume } = useVolume();
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          {isMuted || volume === 0 ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row justify-between">
            <h4 className="font-medium">Volume</h4>
            <h4 className="font-medium">{Math.floor(volume * 100)}%</h4>
          </div>
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default VolumeControl;
