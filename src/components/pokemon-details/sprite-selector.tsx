import {
  Select,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SpriteOption } from '@/types/sprites';

interface SpriteSelectorProps {
  availableGroups: [string, SpriteOption[]][];
  onSpriteChange: (value: string) => void;
}

export default function SpriteSelector({ availableGroups, onSpriteChange }: SpriteSelectorProps) {
  return (
    <div className="w-full max-w-xs mx-auto">
      <Select defaultValue="official-default" onValueChange={onSpriteChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select sprite version" />
        </SelectTrigger>
        <SelectContent>
          {availableGroups.map(([groupName, options]) => (
            <SelectGroup key={groupName}>
              <SelectLabel className="font-semibold">{groupName}</SelectLabel>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
