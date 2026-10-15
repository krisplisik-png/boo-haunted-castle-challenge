// Add key: './public/audio/file.mp3' here to replace any spoken line.
export const recordings={};
let active=null;
export function stopSpeech(){globalThis.speechSynthesis?.cancel();if(active){active.pause();active=null;}}
export function speak(text,muted=false,key=text){stopSpeech();if(muted)return;if(recordings[key]){active=new Audio(recordings[key]);active.play().catch(()=>{});return;}if(!globalThis.speechSynthesis)return;const line=new SpeechSynthesisUtterance(text);line.lang='en-US';line.rate=.85;line.pitch=1.15;line.voice=speechSynthesis.getVoices().find(v=>/^en[-_]/i.test(v.lang))||null;speechSynthesis.speak(line);}
