import styles from './BrandLogo.module.css'

interface BrandLogoProps {
  size?: number
  showText?: boolean
  variant?: 'dark' | 'light'
}

export default function BrandLogo({ size = 44, showText = true, variant = 'dark' }: BrandLogoProps) {
  return (
    <div className={`${styles.brand} ${variant === 'light' ? styles.light : ''}`}>
      <img
        src="/sp-brand-logo.png"
        alt="Prof. Sanjeev Patil"
        className={styles.logoImage}
        style={{ height: size }}
        loading="eager"
      />
      {showText && (
        <div className={styles.logoText}>
          <strong>Prof. Sanjeev Patil</strong>
          <span>Training &amp; Placement Officer</span>
        </div>
      )}
    </div>
  )
}
