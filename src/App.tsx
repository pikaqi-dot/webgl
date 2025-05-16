import { useState } from 'react'
import Scene from './components/Scene'
import { Settings } from 'lucide-react'

function App() {
  const [showControls, setShowControls] = useState(false)
  const [settings, setSettings] = useState({
    color1: '#00ffff',
    color2: '#ff00ff',
    speed: 0.5,
    intensity: 1.5,
    density: 5.0
  })

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Scene />
      
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => setShowControls(!showControls)}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        >
          <Settings size={24} />
        </button>
      </div>

      {showControls && (
        <div className="absolute top-16 right-4 z-10 bg-gray-800 bg-opacity-80 p-4 rounded-lg text-white w-64">
          <h3 className="text-lg font-bold mb-4">Energy Field Controls</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Primary Color</label>
              <input 
                type="color" 
                value={settings.color1}
                onChange={(e) => setSettings({...settings, color1: e.target.value})}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Secondary Color</label>
              <input 
                type="color" 
                value={settings.color2}
                onChange={(e) => setSettings({...settings, color2: e.target.value})}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Speed: {settings.speed.toFixed(1)}</label>
              <input 
                type="range" 
                min="0.1" 
                max="2" 
                step="0.1"
                value={settings.speed}
                onChange={(e) => setSettings({...settings, speed: parseFloat(e.target.value)})}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Intensity: {settings.intensity.toFixed(1)}</label>
              <input 
                type="range" 
                min="0.5" 
                max="3" 
                step="0.1"
                value={settings.intensity}
                onChange={(e) => setSettings({...settings, intensity: parseFloat(e.target.value)})}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Density: {settings.density.toFixed(1)}</label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                step="0.5"
                value={settings.density}
                onChange={(e) => setSettings({...settings, density: parseFloat(e.target.value)})}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
