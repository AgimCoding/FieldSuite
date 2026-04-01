export default function MotracLogo({ className = '', style = {} }) {
  return (
    <img
      src="/images/logo.webp"
      alt="Motrac"
      className={className}
      style={style}
      draggable={false}
    />
  )
}
