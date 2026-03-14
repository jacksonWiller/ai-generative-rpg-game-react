import { motion } from 'framer-motion';

export default function GameHUD() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      <div className="flex items-start justify-between p-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pixel-border bg-bubble/90 backdrop-blur-sm px-4 py-2 pointer-events-auto"
        >
          <h1 className="font-pixel text-2xl text-foreground tracking-wider">Echo Village</h1>
          <p className="font-system text-[10px] text-muted-foreground tracking-widest uppercase">
            Social AI Simulator
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pixel-border bg-bubble/90 backdrop-blur-sm px-3 py-2 pointer-events-auto"
        >
          <div className="font-system text-[10px] text-muted-foreground space-y-0.5 tracking-wider">
            <p><span className="text-primary font-medium">WASD</span> Mover</p>
            <p><span className="text-primary font-medium">E</span> Interagir</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
