import { logos } from '../assets'

interface LogoProps {
  variant?: 'logo' | 'pakmotors' | 'transferLetter'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showText?: boolean
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
}

const textSizeClasses = {
  sm: 'h-4',
  md: 'h-6',
  lg: 'h-8',
  xl: 'h-10',
}

export default function Logo({ 
  variant = 'logo', 
  size = 'md', 
  className = '', 
  showText = false 
}: LogoProps) {
  const logoSize = sizeClasses[size]
  const textSize = textSizeClasses[size]
  
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img 
        src={logos.logo} 
        alt="Pak Motors Logo" 
        className={`${logoSize} object-contain`}
      />
      {showText && (
        <img 
          src={logos.pakmotors} 
          alt="Pak Motors" 
          className={`${textSize} object-contain`}
        />
      )}
    </div>
  )
}
