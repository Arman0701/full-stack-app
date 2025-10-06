import { colorsMap } from '@/_lib/baseIcon';
import { TColorName, TIcon } from '@/_lib/types/baseIcon';
import * as LucideIcons from 'lucide-react';
import { SVGProps } from 'react';

interface IProps {
  icon: TIcon;
  size?: number;
  color?: TColorName;
}
type BaseIconProps = IProps & SVGProps<SVGSVGElement>;

export const BaseIcon = ({ icon, size = 24, color, ...props }: BaseIconProps) => {
  const IconComponent = LucideIcons[icon] as React.ElementType;

  if (!IconComponent) {
    console.warn(`Lucide icon "${icon}" does not exist.`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      style={{ color: colorsMap[color || 'default'] ?? colorsMap.default }}
      {...props}
    />
  );
};
