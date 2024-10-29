import React from 'react';
import { Card } from '@/components/ui/card';

export default function StatsColumn({
  children,
  typeColor,
}: {
  children: React.ReactNode;
  typeColor: string;
}) {
  return (
    <div className="relative">
      <div
        className={`absolute inset-0 opacity-5 blur-3xl -z-10 rounded-xl bg-gradient-to-br from-${typeColor} pointer-events-none`}
      />
      <div className="space-y-6">
        {React.Children.map(children, (child) => (
          <div className="group relative transform transition-all duration-300 hover:scale-[1.02]">
            <div
              className={`absolute -inset-0.5 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 rounded-xl bg-${typeColor} pointer-events-none`}
            />
            <div
              className={`absolute inset-0 rounded-xl opacity-10 bg-gradient-to-br from-${typeColor} pointer-events-none`}
            />

            <Card className="relative border-2 bg-card/95 backdrop-blur-sm overflow-hidden">
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-${typeColor} pointer-events-none`}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 -translate-x-full group-hover:translate-x-full duration-1000 transition-all transform bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
              {child}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
