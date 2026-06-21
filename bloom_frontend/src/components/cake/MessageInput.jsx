import { useCakeStore } from '../../store/cakeStore.js'

export default function MessageInput() {
  const { message, setMessage } = useCakeStore()
  const MAX = 80

  return (
    <div>
      <h3 className="label-caps text-roseGold mb-4">5. Personalised Message</h3>
      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX))}
          placeholder="E.g. Happy 30th Birthday, Sarah! 🎂"
          rows={3}
          className="w-full bg-white/50 border border-outline-variant rounded-xl px-4 py-3 text-sm font-inter
                     text-cocoa placeholder:text-cocoa/30 resize-none
                     focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10
                     transition-all duration-300"
        />
        <span className={`absolute bottom-3 right-3 text-[10px] font-inter ${
          message.length >= MAX ? 'text-roseGold' : 'text-cocoa/30'
        }`}>
          {message.length}/{MAX}
        </span>
      </div>
      <p className="text-xs text-cocoa/40 font-inter mt-2 italic">
        This message will be inscribed on your cake topper or board.
      </p>
    </div>
  )
}
