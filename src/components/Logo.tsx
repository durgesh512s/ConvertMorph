export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <svg 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        className="text-blue-600"
      >
        <path d="M3 6h18M3 12h12M3 18h6"/>
      </svg>
      <span className="font-bold text-lg">ConvertMorph</span>
    </div>
  )
}
